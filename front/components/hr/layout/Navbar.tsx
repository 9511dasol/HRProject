"use client"; // usePathname과 useRouter를 사용하기 위해 클라이언트 컴포넌트로 선언

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // 현재 URL 경로 가져오기
  const router = useRouter(); // 페이지 이동을 위한 라우터
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: "generator",
      label: "AI 질문 생성기",
      icon: "bx-wand",
      path: "/hr/agent",
    },
    {
      id: "pipeline",
      label: "지원자 관리",
      icon: "bx-group",
      path: "/hr/pipeline",
    },
    {
      id: "settings",
      label: "시스템 설정",
      icon: "bx-cog",
      path: "/hr/settings",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div
            className="flex items-center gap-3.5 group cursor-pointer active:scale-95 transition-transform"
            onClick={() => handleNavigate("/hr/agent")}
          >
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[14px] flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-all duration-300">
              <i className="bx bx-brain text-white text-[24px]"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[20px] font-black text-slate-900 tracking-tighter leading-none">
                A-RECRUIT
              </h1>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.25em] mt-1 opacity-80">
                HR Intelligence
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.path);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[16px] text-[14px] font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100/50 translate-y-[-1px]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
                  }`}
                >
                  <i
                    className={`bx ${item.icon} text-[20px] ${isActive ? "text-blue-500" : "text-slate-400"}`}
                  ></i>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-[14px] hover:bg-slate-50 text-slate-400 hover:text-blue-500 transition-all border border-transparent hover:border-slate-200">
            <i className="bx bx-bell text-[22px]"></i>
          </button>

          <div className="flex items-center gap-4 pl-6 border-l border-slate-200/80 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-[14px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                김인사 매니저
              </p>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Senior Recruiter
              </p>
            </div>
            <div className="w-11 h-11 rounded-[16px] bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-white shadow-sm ring-1 ring-slate-200 group-hover:ring-blue-300 transition-all overflow-hidden">
              <i className="bx bxs-user text-[24px] mt-1"></i>
            </div>
          </div>

          <button
            className="lg:hidden text-slate-600 p-2 bg-slate-50 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i
              className={`bx ${isMobileMenuOpen ? "bx-x" : "bx-menu-alt-right"} text-[24px]`}
            ></i>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 shadow-2xl absolute w-full left-0 top-[80px] animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`p-4 rounded-[16px] font-bold text-left flex items-center gap-4 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                      : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <i className={`bx ${item.icon} text-[24px]`}></i>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
