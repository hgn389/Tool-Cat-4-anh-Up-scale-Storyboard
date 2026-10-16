
import React, { useState, useCallback, useRef } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { MainBody } from './components/MainBody';
import { SidebarRight } from './components/SidebarRight';
import { PanelData } from './types';
import { enhanceImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Resizable column widths
  const [leftWidth, setLeftWidth] = useState(35);
  const [rightWidth, setRightWidth] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResizeLeft = useCallback((e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftWidth;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = ((moveEvent.clientX - startX) / window.innerWidth) * 100;
      setLeftWidth(Math.max(15, Math.min(50, startWidth + delta)));
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [leftWidth]);

  const handleResizeRight = useCallback((e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = rightWidth;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = ((startX - moveEvent.clientX) / window.innerWidth) * 100;
      setRightWidth(Math.max(10, Math.min(40, startWidth + delta)));
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [rightWidth]);

  const splitImage = (dataUrl: string): Promise<PanelData[]> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = img.width;
        const h = img.height;
        const halfW = w / 2;
        const halfH = h / 2;

        const quadrants = [
          { x: 0, y: 0 },
          { x: halfW, y: 0 },
          { x: 0, y: halfH },
          { x: halfW, y: halfH }
        ];

        const newPanels: PanelData[] = quadrants.map((q, index) => {
          canvas.width = halfW;
          canvas.height = halfH;
          ctx.clearRect(0, 0, halfW, halfH);
          ctx.drawImage(img, q.x, q.y, halfW, halfH, 0, 0, halfW, halfH);
          return {
            id: index + 1,
            originalBase64: canvas.toDataURL('image/png'),
            enhancedBase64: null,
            status: 'idle'
          };
        });

        resolve(newPanels);
      };
      img.src = dataUrl;
    });
  };

  const handleUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalImage(dataUrl);
      const initialPanels = await splitImage(dataUrl);
      setPanels(initialPanels);
    };
    reader.readAsDataURL(file);
  };

  const handleRecreate = async () => {
    if (panels.length === 0) return;
    setIsProcessing(true);

    const updatedPanels = [...panels];

    for (let i = 0; i < updatedPanels.length; i++) {
      try {
        updatedPanels[i] = { ...updatedPanels[i], status: 'processing' };
        setPanels([...updatedPanels]);

        const result = await enhanceImage(updatedPanels[i].originalBase64);
        
        updatedPanels[i] = {
          ...updatedPanels[i],
          enhancedBase64: result,
          status: 'done'
        };
        setPanels([...updatedPanels]);
      } catch (err: any) {
        updatedPanels[i] = {
          ...updatedPanels[i],
          status: 'error',
          error: err.message
        };
        setPanels([...updatedPanels]);
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center px-6 bg-zinc-950 flex-shrink-0">
        <h1 className="text-orange-500 font-bold text-xl tracking-tight uppercase">
          Tool tạo Prompt Video
        </h1>
      </header>

      {/* Main Container */}
      <main ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Sidebar Left */}
        <div style={{ width: `${leftWidth}%` }} className="h-full overflow-y-auto border-r border-zinc-800 bg-zinc-900/50">
          <SidebarLeft 
            onUpload={handleUpload} 
            onRecreate={handleRecreate}
            isProcessing={isProcessing}
            originalImage={originalImage}
            panels={panels}
          />
        </div>

        {/* Resizer Left */}
        <div className="resizer" onMouseDown={handleResizeLeft}></div>

        {/* Body */}
        <div className="flex-1 h-full overflow-y-auto bg-zinc-950 px-8 py-6">
          <MainBody panels={panels} />
        </div>

        {/* Resizer Right */}
        <div className="resizer" onMouseDown={handleResizeRight}></div>

        {/* Sidebar Right */}
        <div style={{ width: `${rightWidth}%` }} className="h-full overflow-y-auto border-l border-zinc-800 bg-zinc-900/50">
          <SidebarRight />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 border-t border-zinc-800 flex items-center justify-center px-6 bg-zinc-950 text-zinc-500 text-sm flex-shrink-0">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          © Nam Hoàng - v1.0
        </span>
      </footer>
    </div>
  );
};

export default App;
