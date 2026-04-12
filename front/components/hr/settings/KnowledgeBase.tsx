export default function KnowledgeBase() {
  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-4xl sm:rounded-[40px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h3 className="text-[20px] sm:text-[22px] font-black text-slate-900 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50 shadow-sm shrink-0">
              <i className="bx bx-data text-[26px]"></i>
            </div>
            RAG 지식 베이스
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium mt-3 leading-relaxed">
            에이전트가 참고할 사내 규정, 인재상, 직무 기술서(JD)를 업로드하여
            AI의 지식 범위를 확장하세요.
          </p>
        </div>
      </div>

      {/* 업로드 영역 */}
      <div className="border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-[28px] p-8 sm:p-12 flex flex-col items-center justify-center text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer group mb-8">
        <div className="w-20 h-20 bg-white border border-slate-100 shadow-md rounded-[20px] flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
          <i className="bx bx-cloud-upload text-[40px] text-blue-500"></i>
        </div>
        <h4 className="font-black text-slate-800 text-[16px] sm:text-[18px]">
          클릭하거나 파일을 여기로 드래그하세요
        </h4>
        <p className="text-[13px] text-slate-400 mt-2 font-bold bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
          지원 형식: PDF, DOCX, TXT (최대 50MB)
        </p>
      </div>

      {/* 파일 리스트 영역 */}
      <div className="flex-1 space-y-4">
        <h4 className="font-black text-slate-700 text-[12px] uppercase tracking-widest flex items-center gap-2 mb-4">
          <i className="bx bx-folder text-lg text-slate-400"></i> 임베딩 완료
          문서 (2)
        </h4>

        <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/50 transition-colors rounded-[20px] border border-slate-200/60 shadow-sm group">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 bg-white rounded-[14px] border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
              <i className="bx bxs-file-pdf text-red-500 text-[24px]"></i>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 text-[14px] truncate">
                2024_마이다스아이티_핵심가치.pdf
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Vectorized • 1.2 MB
                </p>
              </div>
            </div>
          </div>
          <button className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-colors shrink-0">
            <i className="bx bx-trash text-[20px]"></i>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/50 transition-colors rounded-[20px] border border-slate-200/60 shadow-sm group">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 bg-white rounded-[14px] border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
              <i className="bx bxs-file-pdf text-red-500 text-[24px]"></i>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 text-[14px] truncate">
                프론트엔드_시니어_직무기술서.pdf
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Vectorized • 0.8 MB
                </p>
              </div>
            </div>
          </div>
          <button className="text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-colors shrink-0">
            <i className="bx bx-trash text-[20px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
