"use client";

import Navbar from "@/components/shared/Navbar";
import {
  fetchGeminiCandidateInsights,
  fetchGeminiDeepAnalysis,
} from "@/lib/axios";
import {
  CandidateInsight,
  GeneratedQuestion,
  MainClientWrapperProps,
} from "@/types/hr";
import React, { useState } from "react";
import ResultsPanel from "../ResultsPanel";
import ControlPanel from "../ControlPanel";

const MainClientWrapper: React.FC<MainClientWrapperProps> = ({
  jobPostings,
  candidates,
}) => {
  const [activeTab, setActiveTab] = useState("generator");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<
    GeneratedQuestion[]
  >([]);
  const [candidateInsights, setCandidateInsights] =
    useState<CandidateInsight | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     const link = document.createElement("link");
//     link.href = "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//     return () => {
//       if (document.head.contains(link)) document.head.removeChild(link);
//     };
//   }, []);

  const handleGenerate = () => {
    if (!selectedJob || !selectedCandidate) return;
    setIsAI(false);
    setIsGenerating(true);
    setGeneratedQuestions([]);
    setErrorMessage(null);
    setTimeout(() => {
      setGeneratedQuestions([
        {
          id: 1,
          type: "기본 역량",
          question:
            "우리 회사의 핵심 기술 스택인 React와 관련하여 본인만의 강점은 무엇인가요?",
          intent: "기술 적합성 확인",
          ragContext: "공고 필수 기술: React",
        },
        {
          id: 2,
          type: "경험 검증",
          question:
            "이전 프로젝트에서 가장 기억에 남는 기술적 트러블슈팅 사례를 말씀해주세요.",
          intent: "문제 해결 능력",
          ragContext: "지원자 이력 요약 기반",
        },
      ]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleGenerateAI = async () => {
    const job = jobPostings.find((j) => j.id === selectedJob);
    const candidate = candidates.find((c) => c.id === selectedCandidate);
    if (!job || !candidate) return;
    setIsAI(true);
    setIsGenerating(true);
    setGeneratedQuestions([]);
    setErrorMessage(null);
    try {
      const aiQuestions = await fetchGeminiDeepAnalysis(job, candidate);
      setGeneratedQuestions(aiQuestions);
    } catch (e) {
      setErrorMessage("Gemini API 호출 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyzeInsight = async () => {
    const job = jobPostings.find((j) => j.id === selectedJob);
    const candidate = candidates.find((c) => c.id === selectedCandidate);
    if (!job || !candidate) return;
    setIsInsightLoading(true);
    setErrorMessage(null);
    try {
      const insights = await fetchGeminiCandidateInsights(job, candidate);
      setCandidateInsights(insights);
    } catch (e) {
      setErrorMessage("인사이트 분석 중 오류가 발생했습니다.");
    } finally {
      setIsInsightLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* <Navbar
        activeTab={activeTab}
        onNavigate={(id) => {
          setActiveTab(id);
          setIsMobileMenuOpen(false);
        }}
        onToggleMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      /> */}

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-6 shadow-xl z-40 relative animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 gap-3">
            {["generator", "pipeline", "settings"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setIsMobileMenuOpen(false);
                }}
                className="p-4 rounded-2xl bg-slate-50 font-bold text-slate-600 capitalize"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-400 mx-auto p-6 md:p-12 lg:p-16 w-full">
        {activeTab === "generator" ? (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200/60 pb-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100">
                  Intelligent Recruiting System
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                  지능형 면접 질문 생성기
                </h2>
                <p className="text-slate-500 text-lg font-bold max-w-2xl leading-relaxed">
                  Gemini 2.5 Flash를 활용한 실시간 지원자 맞춤형 인사이트 및
                  면접 가이드를 도출합니다.
                </p>
              </div>
              <button className="flex items-center gap-3 px-6 py-3.5 bg-white text-slate-600 text-[14px] font-black rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                <i className="bx bx-history text-xl"></i> 분석 이력
              </button>
            </header>

            {errorMessage && (
              <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
                <i className="bx bx-error-circle text-2xl"></i>
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <ControlPanel
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                selectedCandidate={selectedCandidate}
                setSelectedCandidate={setSelectedCandidate}
                isGenerating={isGenerating}
                isInsightLoading={isInsightLoading}
                onGenerate={handleGenerate}
                onGenerateAI={handleGenerateAI}
                onAnalyzeInsight={handleAnalyzeInsight}
                jobPostings={jobPostings}
                candidates={candidates}
              />
              <ResultsPanel
                isGenerating={isGenerating}
                generatedQuestions={generatedQuestions}
                isAI={isAI}
                insights={candidateInsights}
              />
            </div>
          </div>
        ) : (
          <div className="h-[500px] flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 shadow-inner">
            <i className="bx bx-cog text-5xl text-slate-200 mb-4"></i>
            <h3 className="text-2xl font-black text-slate-800 uppercase">
              {activeTab} 준비 중
            </h3>
          </div>
        )}
      </main>

      <footer className="max-w-[1600px] mx-auto px-10 py-16 text-center mt-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-10"></div>
        <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em]">
          Core Intelligence powered by Gemini 2.5 & A-RECRUIT Architecture
        </p>
      </footer>
    </div>
  );
};

export default MainClientWrapper;
