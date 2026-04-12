import React, { useState } from "react";

export default function PersonaConfig() {
  const [tone, setTone] = useState("analytical");

  const tones = [
    {
      id: "friendly",
      label: "친화적인 (Ice Breaking)",
      icon: "bx-smile",
      desc: "부드럽고 편안한 분위기를 유도하여 지원자의 긴장을 풉니다.",
    },
    {
      id: "analytical",
      label: "분석적인 (Logical)",
      icon: "bx-search-alt",
      desc: "객관적이고 데이터 기반의 꼬리 질문으로 역량을 검증합니다.",
    },
    {
      id: "strict",
      label: "엄격한 (Stress Test)",
      icon: "bx-target-lock",
      desc: "논리적 허점을 파고들어 위기 대처 능력을 평가합니다.",
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-[32px] sm:rounded-[40px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full">
      <div className="mb-8">
        <h3 className="text-[20px] sm:text-[22px] font-black text-slate-900 flex items-center gap-3">
          <div className="w-12 h-12 rounded-[16px] bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/50 shadow-sm shrink-0">
            <i className="bx bx-mask text-[26px]"></i>
          </div>
          에이전트 페르소나 설정
        </h3>
        <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium mt-3 leading-relaxed">
          질문을 생성하는 AI 면접관의 성향과 톤앤매너, 핵심 평가 기준을
          디테일하게 조율합니다.
        </p>
      </div>

      <div className="flex-1 flex flex-col space-y-8">
        {/* 톤앤매너 선택 */}
        <div>
          <label className="block text-[13px] font-black text-slate-700 mb-4 uppercase tracking-widest flex items-center gap-2">
            <i className="bx bx-message-rounded-dots text-lg text-purple-400"></i>{" "}
            면접관 톤앤매너
          </label>
          <div className="grid grid-cols-1 gap-4">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`flex items-center gap-4 p-4 rounded-[24px] border-2 transition-all duration-300 text-left group ${
                  tone === t.id
                    ? "border-purple-500 bg-purple-50/50 shadow-md shadow-purple-100"
                    : "border-slate-100 hover:border-purple-200 bg-white hover:bg-purple-50/30"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-[16px] flex items-center justify-center text-[28px] shrink-0 transition-all duration-300 ${tone === t.id ? "bg-purple-500 text-white shadow-lg shadow-purple-300 scale-105" : "bg-slate-100 text-slate-400 group-hover:text-purple-400"}`}
                >
                  <i className={`bx ${t.icon}`}></i>
                </div>
                <div>
                  <h4
                    className={`font-black text-[15px] ${tone === t.id ? "text-purple-900" : "text-slate-800"}`}
                  >
                    {t.label}
                  </h4>
                  <p
                    className={`text-[12px] mt-1 font-semibold leading-relaxed ${tone === t.id ? "text-purple-600/80" : "text-slate-400"}`}
                  >
                    {t.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 커스텀 프롬프트 */}
        <div className="pt-8 border-t border-slate-100 flex-1 flex flex-col">
          <label className="block text-[13px] font-black text-slate-700 mb-4 uppercase tracking-widest flex items-center gap-2">
            <i className="bx bx-code-block text-lg text-purple-400"></i> 시스템
            프롬프트 (Custom)
          </label>
          <textarea
            className="w-full flex-1 p-5 bg-slate-50 border border-slate-200 rounded-[24px] text-[14px] font-medium text-slate-700 focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none resize-none min-h-[150px] leading-relaxed shadow-inner"
            placeholder="예: 우리 회사는 '주도성'을 가장 중요하게 생각합니다. 질문 생성 시 주도성을 검증할 수 있는 문항을 반드시 포함하세요."
            defaultValue="우리 회사는 '주도성'과 '데이터 기반 의사결정'을 가장 중요하게 생각합니다. 답변의 진위를 파악할 수 있도록 수치화된 결과를 요구하는 꼬리 질문을 최우선으로 생성하세요."
          ></textarea>
        </div>

        {/* 저장 버튼 */}
        <button className="w-full py-4.5 bg-slate-900 text-white rounded-[20px] font-black text-[15px] hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md flex items-center justify-center gap-2 mt-auto">
          <i className="bx bx-save text-[20px]"></i> 에이전트 설정 배포하기
        </button>
      </div>
    </div>
  );
}
