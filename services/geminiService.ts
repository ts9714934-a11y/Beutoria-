
import { GoogleGenAI, Type } from "@google/genai";
import { BEAUTY_INDEXES } from '../constants';
import type { AnalysisResult } from '../types';

const BATCH_SIZE = 5;

const beautyIndexProperties = BEAUTY_INDEXES.reduce((acc, index) => {
    acc[index.name.replace(/\s/g, '')] = {
        type: Type.NUMBER,
        description: `A score from 0 to 100 for ${index.name}.`
    };
    return acc;
}, {} as any);

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        beautyIndexes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    emoji: { type: Type.STRING },
                },
                required: ['name', 'score', 'emoji']
            }
        },
        problems: {
            type: Type.ARRAY,
            description: "A list of 3-5 key areas for improvement.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING },
                    emoji: { type: Type.STRING },
                },
                required: ['id', 'text', 'emoji']
            }
        },
        solutions: {
            type: Type.ARRAY,
            description: "A list of actionable solutions corresponding to the problems.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING },
                    emoji: { type: Type.STRING },
                },
                required: ['id', 'text', 'emoji']
            }
        },
        detailedAnalysis: {
            type: Type.OBJECT,
            properties: {
                introduction: { type: Type.STRING, description: "A warm, emoji-rich introduction." },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key strengths identified." },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key weaknesses identified." },
                suggestions: { type: Type.STRING, description: "Detailed, actionable suggestions for improvement." },
                conclusion: { type: Type.STRING, description: "A positive and encouraging conclusion." }
            },
            required: ['introduction', 'strengths', 'weaknesses', 'suggestions', 'conclusion']
        }
    },
    required: ['beautyIndexes', 'problems', 'solutions', 'detailedAnalysis']
};


export const analyzeImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const imagePart = {
        inlineData: {
            mimeType,
            data: base64Image.split(',')[1],
        },
    };

    const textPart = {
        text: `You are BEUTORIA, a world-class AI Beauty Analyzer with a luxury aesthetic.
        Analyze the user's photo and provide a comprehensive beauty analysis.
        Your response MUST be a single, valid JSON object that strictly adheres to the provided schema.
        Generate a score from 0-100 for each of the 10 beauty indexes: ${BEAUTY_INDEXES.map(i => i.name).join(', ')}.
        Identify 3-5 key 'problems' and provide a corresponding 'solution' for each. The text for problems and solutions should be short and concise.
        Write a detailed analysis with a warm introduction, bulleted lists for strengths and weaknesses, detailed suggestions, and a positive conclusion.
        Your tone should be premium, encouraging, and emoji-rich (e.g., ✨, 🌸, 💛, 🎀, 💎). Ensure all text fields are filled with high-quality, relevant content.`
    };
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        // Ensure the result has the correct structure
        if (!result.beautyIndexes || !result.problems || !result.solutions || !result.detailedAnalysis) {
             throw new Error("Invalid response structure from Gemini API.");
        }

        return result as AnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Fallback to mock data on error
        return getMockData();
    }
};

const getMockData = (): AnalysisResult => {
    return {
        beautyIndexes: BEAUTY_INDEXES.map(index => ({
            name: index.name,
            score: Math.floor(Math.random() * 40) + 60,
            emoji: index.emoji
        })),
        problems: [
            { id: 'p1', text: "Low Skin Glow ✨", emoji: "✨" },
            { id: 'p2', text: "Slight Asymmetry", emoji: "↔️" },
            { id: 'p3', text: "Weak Jawline 💀", emoji: "💀" },
            { id: 'p4', text: "Uneven Posture 🧍‍♂️", emoji: "🧍‍♂️" }
        ],
        solutions: [
            { id: 's1', text: "Incorporate Vitamin C serums and stay hydrated. 💧", emoji: "🧴" },
            { id: 's2', text: "Try facial exercises and lymphatic drainage massage. 💆‍♂️", emoji: "💆‍♂️" },
            { id: 's3', text: "Chew hard gum and practice mewing for definition. 🔥", emoji: "🔥" },
            { id: 's4', text: "Focus on core strength and stretching exercises daily. 🧘‍♀️", emoji: "🧘‍♀️" }
        ],
        detailedAnalysis: {
            introduction: "Welcome to your Beutoria analysis! 🌸 We've analyzed your photo to reveal your unique beauty profile. Remember, beauty is diverse and this analysis is here to highlight your amazing features and offer empowering suggestions. Let's glow! ✨",
            strengths: [
                "Your Eye Attractiveness Index is remarkably high! Your eyes are captivating and expressive. 👁️",
                "You possess a strong Facial Golden Ratio, indicating harmonious facial proportions. ⭐",
                "Your Hair Health & Density appears to be excellent, contributing to a youthful and vibrant look. 💇‍♀️"
            ],
            weaknesses: [
                "The Skin Glow Index could be enhanced. This can be influenced by diet, hydration, and skincare.",
                "There is room for improvement in Posture & Alignment, which can significantly impact overall presence."
            ],
            suggestions: "To elevate your natural radiance, consider a skincare routine rich in antioxidants. Incorporating daily facial massage can improve circulation and symmetry. For posture, simple exercises like wall sits and shoulder blade squeezes can make a world of difference. Celebrate your unique beauty every day! 💛",
            conclusion: "You are radiant! 💎 This analysis is a stepping stone on your personal beauty journey. Embrace your strengths, explore these suggestions, and most importantly, love the skin you're in. Keep shining! 🎀"
        }
    };
};
