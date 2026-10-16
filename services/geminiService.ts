
import { GoogleGenAI } from "@google/genai";

export const enhanceImage = async (base64Image: string): Promise<string> => {
  // Use the standard API Key from environment directly without forcing manual selection
  const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
  
  try {
    const prompt = `Recreate and enhance this storyboard panel. 
    Transform the image into a high-quality, sharp, and detailed version. 
    Maintain the exact character poses, background composition, and style. 
    Improve lighting, contrast, and overall clarity to make it look like a finished professional illustration.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: 'image/png',
            },
          },
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    let enhancedBase64 = "";
    // Iterate through parts to find the image data
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        enhancedBase64 = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!enhancedBase64) {
      throw new Error("AI không trả về hình ảnh. Vui lòng thử lại.");
    }

    return enhancedBase64;
  } catch (error: any) {
    console.error("Gemini Flash Error:", error);
    throw new Error("Lỗi kết nối AI: " + (error.message || "Không xác định"));
  }
};
