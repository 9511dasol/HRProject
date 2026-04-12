"use client";

import React, { useState, useRef, useEffect } from "react";

interface PlaygroundProps {
  tone: string;
  techWeight: number;
}

interface Message {
  role: "system" | "user" | "agent";
  content: string;
}

export default function Playground({ tone, techWeight }: PlaygroundProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "설정된 페르소나와 가중치를 기반으로 모의 테스트를 시작합니다.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 하단 고정
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    // AI 응답 시뮬레이션 (설정값 기반 분기 처리)
    setTimeout(() => {
      let aiResponse = "";
      if (techWeight >= 70) {
        aiResponse =
          tone === "strict"
            ? "제시해주신 기술 스택 도입 과정에서 마주친 치명적인 오류와 이를 해결하기 위해 아키텍처 관점에서 내린 구체적인 결단은 무엇이었습니까?"
            : "해당 프로젝트에서 기술적 어려움은 없으셨나요? 구체적인 트러블슈팅 사례를 공유해주세요.";
      } else {
        aiResponse =
          "팀원들과의 협업 과정에서 의견 충돌이 발생했을 때, 본인만의 조율 방식이 있다면 사례와 함께 말씀해주시겠어요?";
      }

      setMessages((prev) => [...prev, { role: "agent", content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 rounded-[32px] shadow-2xl flex flex-col h-full overflow-hidden border border-slate-800 lg:sticky lg:top-28">
      {/* Playground Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center z-10">
        <h3 className="text-[16px] font-black text-white flex items-center gap-2">
          <i className="bx bx-terminal text-emerald-400"></i>
          프롬프트 사전 테스트
        </h3>
        <div className="flex gap-2">
          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-700 uppercase">
            {tone}
          </span>
          <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-700 uppercase">
            Tech {techWeight}%
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0B1120] styled-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            {msg.role === "system" && (
              <div className="w-full text-center my-2">
                <span className="bg-slate-800/50 text-slate-400 text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-700/50">
                  {msg.content}
                </span>
              </div>
            )}

            {msg.role === "agent" && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <i className="bx bx-bot text-lg"></i>
                </div>
                <div className="bg-slate-800 text-slate-200 p-4 rounded-[20px] rounded-tl-none border border-slate-700 text-[14px] leading-relaxed shadow-sm">
                  {msg.content}
                </div>
              </div>
            )}

            {msg.role === "user" && (
              <div className="bg-emerald-500 text-white p-4 rounded-[20px] rounded-tr-none text-[14px] leading-relaxed shadow-md max-w-[85%]">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%] animate-in fade-in">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md">
              <i className="bx bx-bot text-lg"></i>
            </div>
            <div className="bg-slate-800 p-4 rounded-[20px] rounded-tl-none border border-slate-700 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div
                className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="relative flex items-end gap-2 bg-slate-800 p-2 rounded-[20px] border border-slate-700 focus-within:border-emerald-500/50 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="가상의 지원자 이력이나 상황을 입력하여 테스트해보세요..."
            className="w-full bg-transparent text-slate-200 text-[13px] p-2 outline-none resize-none max-h-[100px] min-h-[44px] placeholder-slate-500"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-[14px] bg-emerald-500 text-white flex items-center justify-center shrink-0 hover:bg-emerald-400 disabled:opacity-50 transition-colors"
          >
            <i className="bx bx-send text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
