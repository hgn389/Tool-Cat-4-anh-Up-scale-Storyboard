
import React from 'react';

export const SidebarRight: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Hướng dẫn & Tips
        </h2>
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800">
            <h3 className="text-orange-400 font-bold mb-1">1. Định dạng chuẩn</h3>
            <p className="text-zinc-400 leading-relaxed">
              Hãy upload ảnh Storyboard có bố cục 2x2 (4 khung hình đều nhau). Ứng dụng sẽ tự động chia nhỏ chính xác.
            </p>
          </div>
          
          <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800">
            <h3 className="text-orange-400 font-bold mb-1">2. Tăng độ phân giải</h3>
            <p className="text-zinc-400 leading-relaxed">
              Sử dụng mô hình Gemini 2.5 Flash để tái cấu trúc lại các đường nét, giúp ảnh rõ nét hơn mà không cần cấu hình phức tạp.
            </p>
          </div>

          <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800">
            <h3 className="text-orange-400 font-bold mb-1">3. Tính nhất quán</h3>
            <p className="text-zinc-400 leading-relaxed">
              AI sẽ cố gắng giữ nguyên bố cục và nhân vật, đồng thời làm sắc nét các chi tiết mờ trong ảnh gốc.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Thông tin hệ thống
        </h2>
        <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/10 text-xs text-zinc-400 leading-relaxed">
          <p className="mb-2">✅ Đang sử dụng <b>Gemini 2.5 Flash Image</b> (Miễn phí).</p>
          <p className="mb-2">🚀 Tốc độ xử lý nhanh, không yêu cầu người dùng nhập API Key thủ công.</p>
          <p>⚠️ Nếu ảnh quá mờ, AI có thể thay đổi nhẹ một số chi tiết nhỏ để đảm bảo độ sắc nét.</p>
        </div>
      </section>

      <section>
        <h2 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Gợi ý (Prompt AI)
        </h2>
        <div className="relative group">
          <textarea 
            readOnly
            className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-500 focus:outline-none focus:border-orange-500 transition-all font-mono"
            value="Recreate and enhance this storyboard panel. Maintain the exact character poses and style while improving clarity."
          />
          <button 
            onClick={() => navigator.clipboard.writeText("Recreate and enhance this storyboard panel. Maintain the exact character poses and style while improving clarity.")}
            className="absolute bottom-2 right-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-zinc-300 transition-colors border border-zinc-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};
