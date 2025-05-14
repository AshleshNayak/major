import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';

interface FacialAnalysisSimulatorProps {
  onImageCapture: (imageData: string | null) => void;
  isProcessing: boolean;
}

const FacialAnalysisSimulator: React.FC<FacialAnalysisSimulatorProps> = ({ 
  onImageCapture,
  isProcessing 
}) => {
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('camera');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleModeChange = (mode: 'camera' | 'upload') => {
    setCaptureMode(mode);
    setPreviewUrl(null);
    
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      setPreviewUrl(imageData);
      onImageCapture(imageData);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setPreviewUrl(imageData);
      onImageCapture(imageData);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (captureMode === 'camera') {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [captureMode]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Facial Analysis</h3>
        <p className="text-gray-600 text-sm">
          Capture or upload a photo for stress analysis through facial expressions.
        </p>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleModeChange('camera')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            captureMode === 'camera' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Camera className="h-5 w-5 mx-auto mb-1" />
          <span className="text-sm">Camera</span>
        </button>
        
        <button
          onClick={() => handleModeChange('upload')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            captureMode === 'upload' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Upload className="h-5 w-5 mx-auto mb-1" />
          <span className="text-sm">Upload</span>
        </button>
      </div>
      
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
        {captureMode === 'camera' && !previewUrl && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          ></video>
        )}
        
        {captureMode === 'upload' && !previewUrl && (
          <label className="flex flex-col items-center justify-center h-64 cursor-pointer">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-gray-500">Click to upload an image</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload} 
            />
          </label>
        )}
        
        {previewUrl && (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-64 object-cover"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {captureMode === 'camera' && !previewUrl && (
        <button
          onClick={captureImage}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Capture
        </button>
      )}
      
      {previewUrl && !isProcessing && (
        <button
          onClick={() => {
            setPreviewUrl(null);
            onImageCapture(null);
          }}
          className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Retake
        </button>
      )}
      
      <div className="mt-4 text-sm text-gray-500 flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" />
        <p>
          Note: This is a simulation for demonstration purposes. In a real application, facial data would be analyzed by a trained ML model.
        </p>
      </div>
    </div>
  );
};

export default FacialAnalysisSimulator;