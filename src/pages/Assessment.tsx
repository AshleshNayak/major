/* -------------  Assessment.tsx ------------- */
import React, { useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// ─── Chart.js setup ──────────────────────────
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Assessment: React.FC = () => {
  const [originalData, setOriginalData] = useState<number[]>([]);
  const samplingRate = 250; // ⚠️ Adjust if your device has a different fs

  // ─── CSV Upload Handler ─────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Record<string, string>>) => {
        const firstKey = results.meta.fields?.[0];

        if (!firstKey) {
          alert('Invalid file format: No valid column header found.');
          return;
        }

        const ecg = results.data
          .map((row) => parseFloat(row[firstKey!]))
          .filter((v) => !isNaN(v));

        setOriginalData(ecg);
      },
    });
  };

  const makeDataset = (label: string, data: number[], color: string) => ({
    label,
    data,
    borderColor: color,
    borderWidth: 1.3,
    pointRadius: 0,
    tension: 0,
    fill: false,
  });

  const timeLabels = originalData.map((_, i) => (i / samplingRate).toFixed(2));

  return (
    <div className="space-y-10 p-4 md:p-8">
      {/* ─── Header ─── */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Stress Assessment</h1>
        <p className="text-gray-600">
          Upload an ECG CSV file (with a single column). The app will show the original signal.
        </p>
      </div>

      {/* ─── File uploader ─── */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload ECG Data</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-6"
        />

        {originalData.length > 0 && (
          <Line
            data={{
              labels: timeLabels,
              datasets: [makeDataset('Original ECG', originalData, 'rgb(31, 78, 121)')],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Original ECG signal',
                  font: { size: 18 },
                },
                tooltip: { intersect: false, mode: 'index' },
              },
              scales: {
                x: { title: { display: true, text: 'Time (s)' } },
                y: { title: { display: true, text: 'Microvolts (μV)' } },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Assessment;
