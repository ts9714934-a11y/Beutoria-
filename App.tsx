
import React, { useState, useCallback } from 'react';
import type { AppState, AnalysisResult } from './types';
import FrontPage from './components/FrontPage';
import LoadingScreen from './components/LoadingScreen';
import ResultsPage from './components/ResultsPage';
import CameraCapture from './components/CameraCapture';
import { analyzeImage } from './services/geminiService';
import { fileToBase64 } from './utils/helpers';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('home');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageAnalysis = useCallback(async (imageData: string, mimeType: string) => {
        setAppState('loading');
        setError(null);
        try {
            const result = await analyzeImage(imageData, mimeType);
            setAnalysisResult(result);
            setAppState('results');
        } catch (err) {
            setError('An error occurred during analysis. Please try again.');
            console.error(err);
            setAppState('home');
        }
    }, []);

    const handleFileUpload = useCallback(async (file: File) => {
        const base64Image = await fileToBase64(file);
        handleImageAnalysis(base64Image, file.type);
    }, [handleImageAnalysis]);

    const handleSelfieCapture = useCallback((dataUri: string) => {
        handleImageAnalysis(dataUri, 'image/jpeg');
    }, [handleImageAnalysis]);

    const handleBackToHome = () => {
        setAppState('home');
        setAnalysisResult(null);
        setError(null);
    };

    const renderContent = () => {
        switch (appState) {
            case 'home':
                return <FrontPage onFileUpload={handleFileUpload} onTakeSelfie={() => setAppState('camera')} error={error} />;
            case 'camera':
                return <CameraCapture onCapture={handleSelfieCapture} onBack={() => setAppState('home')} />;
            case 'loading':
                return <LoadingScreen />;
            case 'results':
                return analysisResult ? <ResultsPage result={analysisResult} onBack={handleBackToHome} /> : <LoadingScreen />;
            default:
                return <FrontPage onFileUpload={handleFileUpload} onTakeSelfie={() => setAppState('camera')} error={error} />;
        }
    };

    return (
        <div className="bg-white min-h-screen w-full font-sans text-gray-900 antialiased">
            {renderContent()}
        </div>
    );
};

export default App;
