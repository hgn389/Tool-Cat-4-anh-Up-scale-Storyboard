
import React, { useRef } from 'react';
import { PanelData } from '../types';

interface SidebarLeftProps {
  onUpload: (file: File) => void;
  onRecreate: () => void;
  isProcessing: boolean;
  originalImage: string | null;
  panels: PanelData[];
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({ 
  onUpload, 
  onRecreate, 
  isProcessing, 
  originalImage,
  panels 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
          Tải lên Storyboard
        </h2>
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-700 hover:border-orange-500/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-zinc-800/30 group"
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/*"
          />
          <svg className="w-10 h-10 text-zinc-500 group-hover:text-orange-500 mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-zinc-400 text-center font-medium">Click để chọn file hoặc kéo thả</p>
          <p className="text-zinc-600 text-xs mt-1">Hỗ trợ JPG, PNG (Tỉ lệ 2x2)</p>
        </div>
      </section>

      {originalImage && (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="relative group rounded-lg overflow-hidden border border-zinc-800">
            <img src={originalImage} alt="Preview" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-widest bg-orange-500 px-2 py-1 rounded">Ảnh Gốc</span>
            </div>
          </div>

          <button
            onClick={onRecreate}
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
              isProcessing 
              ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed' 
              : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Đang xử lý...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Tái tạo & Nâng cấp ảnh
              </>
            )}
          </button>
        </section>
      )}

      {panels.length > 0 && !originalImage && (
        <p className="text-zinc-500 italic text-sm text-center">Tải ảnh lên để bắt đầu xử lý.</p>
      )}
    </div>
  );
};
