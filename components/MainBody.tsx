
import React from 'react';
import { PanelData } from '../types';

interface MainBodyProps {
  panels: PanelData[];
}

export const MainBody: React.FC<MainBodyProps> = ({ panels }) => {
  const downloadImage = (base64: string, id: number) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `storyboard-panel-${id}-enhanced.png`;
    link.click();
  };

  if (panels.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-700">
        <div className="w-24 h-24 mb-6 opacity-20">
          <svg fill="currentColor" viewBox="0 0 24 24">
             <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </div>
        <p className="text-xl font-medium">Chưa có dữ liệu xử lý</p>
        <p className="text-sm mt-2 max-w-xs text-center">Vui lòng tải lên storyboard ở cột bên trái để AI tiến hành cắt và nâng cấp ảnh.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-orange-500 font-bold text-2xl">Kết quả xử lý AI</h2>
         <div className="flex gap-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-zinc-700 rounded-full"></span> Chờ</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> Đang chạy</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Hoàn tất</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {panels.map((panel) => (
          <div key={panel.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all hover:border-zinc-700">
            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden">
              {panel.status === 'processing' && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-orange-500 font-bold animate-pulse">Đang tái tạo Panel {panel.id}...</p>
                </div>
              )}
              
              {panel.enhancedBase64 ? (
                <img src={panel.enhancedBase64} alt={`Panel ${panel.id}`} className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700" />
              ) : (
                <div className="flex flex-col items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                   <img src={panel.originalBase64} alt={`Original Panel ${panel.id}`} className="w-full h-full object-cover" />
                   {panel.status === 'idle' && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="bg-zinc-800/80 px-4 py-2 rounded-full text-xs font-bold border border-zinc-700">ẢNH GỐC</span>
                     </div>
                   )}
                </div>
              )}

              {panel.error && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/80 p-4 text-center">
                  <svg className="w-10 h-10 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-red-400 font-bold text-sm">{panel.error}</p>
                </div>
              )}

              <div className="absolute top-4 left-4 z-10">
                <span className="w-10 h-10 flex items-center justify-center bg-orange-600 text-white rounded-full font-black text-lg shadow-lg">
                  {panel.id}
                </span>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between bg-zinc-900 border-t border-zinc-800">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Khung hình {panel.id}</span>
                <span className="text-sm font-medium text-zinc-300">
                  {panel.enhancedBase64 ? 'Đã nâng cấp chi tiết' : 'Đang chờ xử lý'}
                </span>
              </div>
              
              <button
                disabled={!panel.enhancedBase64}
                onClick={() => downloadImage(panel.enhancedBase64!, panel.id)}
                className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
                  panel.enhancedBase64 
                  ? 'bg-zinc-800 hover:bg-orange-600 text-white' 
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-sm font-bold">Tải về</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
