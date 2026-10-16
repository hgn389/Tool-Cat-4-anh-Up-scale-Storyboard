
export interface PanelData {
  id: number;
  originalBase64: string;
  enhancedBase64: string | null;
  status: 'idle' | 'processing' | 'done' | 'error';
  error?: string;
}

export interface AppState {
  originalImage: string | null;
  panels: PanelData[];
  isProcessing: boolean;
}
