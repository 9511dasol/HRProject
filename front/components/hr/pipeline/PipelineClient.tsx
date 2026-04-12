"use client";

import React, { useState } from "react";
import { Candidate } from "@/types/hr";
import KanbanColumn from "./KanbanColumn";

interface PipelineClientProps {
  initialCandidates: Candidate[];
}

export default function PipelineClient({
  initialCandidates,
}: PipelineClientProps) {
  const [candidates] = useState<Candidate[]>(initialCandidates);

  // 상태별로 지원자 분류
  const applied = candidates.filter((c) => c.status === "applied");
  const screening = candidates.filter((c) => c.status === "screening");
  const interview = candidates.filter((c) => c.status === "interview");
  const offered = candidates.filter((c) => c.status === "offered");

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-[0.98] duration-700 h-full flex flex-col">
      {/* 파이프라인 헤더 */}
      <header className="border-b border-slate-200/60 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 shrink-0">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-[10px] text-[11px] font-black uppercase tracking-[0.2em] border border-indigo-100/50 shadow-sm">
            <i className="bx bx-git-branch text-sm"></i> ATS Pipeline
          </div>
          <h2 className="text-[32px] md:text-[40px] font-black text-slate-900 tracking-tighter leading-tight">
            지원자 파이프라인
          </h2>
          <p className="text-slate-500 font-semibold text-[14px] md:text-[15px] max-w-2xl leading-relaxed">
            전체 채용 전형의 진행 상황을 한눈에 파악하고 드래그 앤 드롭으로
            관리하세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-5 py-3.5 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-[14px]">
            <i className="bx bx-filter-alt text-lg"></i> 상세 필터
          </button>
          <button className="flex-1 lg:flex-none px-5 py-3.5 bg-slate-900 text-white font-bold rounded-2xl shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-[14px]">
            <i className="bx bx-user-plus text-lg"></i> 지원자 추가
          </button>
        </div>
      </header>

      {/* 칸반 보드 컨테이너 
        모바일/태블릿: 가로 스크롤 (snap 적용)
        데스크탑: 4열 Flex 레이아웃
      */}
      <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar flex-1 min-h-0">
        <KanbanColumn
          title="신규 지원"
          count={applied.length}
          icon="bx-envelope"
          colorClass="bg-white text-slate-600"
          candidates={applied}
        />
        <KanbanColumn
          title="AI 서류 검토"
          count={screening.length}
          icon="bx-brain"
          colorClass="bg-blue-500 text-white"
          candidates={screening}
        />
        <KanbanColumn
          title="심층 면접"
          count={interview.length}
          icon="bx-conversation"
          colorClass="bg-indigo-500 text-white"
          candidates={interview}
        />
        <KanbanColumn
          title="최종 합격"
          count={offered.length}
          icon="bx-party"
          colorClass="bg-emerald-500 text-white"
          candidates={offered}
        />
      </div>
    </div>
  );
}
