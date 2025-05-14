import React, { useEffect, useRef } from 'react';
import { StressData } from '../types';

interface StressChartProps {
  data: StressData[];
}

const StressChart: React.FC<StressChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!data.length || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#CBD5E0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#4A5568';
    ctx.textAlign = 'center';
    
    const step = chartWidth / (data.length - 1 || 1);
    data.forEach((entry, i) => {
      const date = new Date(entry.timestamp);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      const x = padding + (i * step);
      ctx.fillText(formattedDate, x, height - (padding / 2));
    });
    
    ctx.textAlign = 'right';
    const levels = ['Low', 'Moderate', 'High', 'Severe'];
    const levelStep = chartHeight / (levels.length - 1);
    levels.forEach((level, i) => {
      const y = height - padding - (i * levelStep);
      ctx.fillText(level, padding - 10, y + 4);
    });
    
 
    if (data.length > 0) {
      ctx.beginPath();
      
      data.forEach((entry, i) => {
        const x = padding + (i * step);
        
        const scorePercentage = entry.score / 100;
        const y = height - padding - (scorePercentage * chartHeight);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
    
        ctx.fillStyle = getColorForStressLevel(entry.level);
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
      
 
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [data]);
  
  const getColorForStressLevel = (level: string): string => {
    switch (level) {
      case 'low': return '#10B981'; 
      case 'moderate': return '#FBBF24'; 
      case 'high': return '#F97316'; 
      case 'severe': return '#EF4444'; 
      default: return '#3B82F6'; 
    }
  };
  
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Stress Level History</h3>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        className="w-full h-64"
      ></canvas>
    </div>
  );
};

export default StressChart;