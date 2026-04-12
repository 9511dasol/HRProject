"use client";

import React from "react";
import KnowledgeBase from "./KnowledgeBase";
import PersonaConfig from "./PersonaConfig";

export default function SettingsClient() {
  return (
    <div className="space-y-8 lg:space-y-12 animate-in fade-in zoom-in-[0.98] duration-700 h-full flex flex-col">
      <header className="border-b border-slate-200/60 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-[10px] text-[11px] font-black uppercase tracking-[0.2em] border border-slate-200 shadow-sm">
            <i className="bx bx-slider-alt text-sm"></i> System Configuration
          </div>
          <h2 className="text-[32px] md:text-[40px] font-black text-slate-900 tracking-tighter leading-tight">
            에이전트 환경 설정
          </h2>
          <p className="text-slate-500 font-semibold text-[14px] md:text-[15px] max-w-2xl leading-relaxed">
            AI 면접관의 지식 범위(RAG)를 확장하고, 질문 성향(Persona)을 튜닝하여
            우리 기업에 딱 맞는 채용 에이전트를 구축하세요.
          </p>
        </div>
      </header>

      {/* 반응형 Grid: 모바일 1열 -> 데스크탑 2열 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 flex-1 min-h-0 pb-8">
        <KnowledgeBase />
        <PersonaConfig />
      </div>
    </div>
  );
}
