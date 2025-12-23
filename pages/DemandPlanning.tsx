import React, { useState } from 'react';
import { FORECAST_CHART_DATA } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const DemandPlanning: React.FC = () => {
  const [cleanOutliers, setCleanOutliers] = useState(true);
  const [showAI, setShowAI] = useState(true);

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h3 className="text-lg font-bold text-white">Forecasting Avanzado</h3>
          <p className="text-sm text-slate-400">Modelo Híbrido: Estadístico + Machine Learning</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={cleanOutliers} 
              onChange={(e) => setCleanOutliers(e.target.checked)}
              className="rounded bg-slate-700 border-slate-600 text-primary-600 focus:ring-primary-600"
            />
            <span className="text-sm text-slate-300">Limpieza Outliers</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showAI} 
              onChange={(e) => setShowAI(e.target.checked)}
              className="rounded bg-slate-700 border-slate-600 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm text-slate-300">Mostrar IA Forecast</span>
          </label>
          <div className="h-8 w-px bg-slate-700 mx-2"></div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <span className="material-symbols-rounded text-sm">copy_all</span>
            Mapear Look-alike
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-dark-900 border border-slate-800 rounded-xl p-6 h-[400px]">
        <h4 className="text-base font-semibold text-white mb-4">Proyección Agregada (Unidades)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={FORECAST_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
               contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
            />
            <Legend />
            {/* History Line */}
            <Line 
              type="monotone" 
              dataKey={cleanOutliers ? "cleanedHistory" : "history"} 
              name="Historia (Real)" 
              stroke="#94a3b8" 
              strokeWidth={2}
              dot={{ fill: '#94a3b8' }}
            />
            {/* Statistical Forecast */}
            <Line 
              type="monotone" 
              dataKey="forecastStat" 
              name="Forecast Estadístico" 
              stroke="#22c55e" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
            />
            {/* AI Forecast */}
            {showAI && (
              <Line 
                type="monotone" 
                dataKey="forecastAI" 
                name="AI Prediction (Tendencia + Estac.)" 
                stroke="#a855f7" 
                strokeWidth={3} 
                dot={{ r: 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Details Table */}
      <div className="bg-dark-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Detalle de Gestión de Ciclo de Vida</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-300 text-sm">
                <th className="p-4">SKU</th>
                <th className="p-4">Ciclo de Vida</th>
                <th className="p-4">Modelo Utilizado</th>
                <th className="p-4">Bias %</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="text-slate-400 text-sm divide-y divide-slate-800">
              <tr>
                <td className="p-4 text-white font-medium">SKU-1024</td>
                <td className="p-4"><span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">Maduro</span></td>
                <td className="p-4">Suavizamiento Exp.</td>
                <td className="p-4 text-green-400">2.4%</td>
                <td className="p-4 text-right"><button className="text-primary-500 hover:text-primary-400">Ver Detalles</button></td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">SKU-2099</td>
                <td className="p-4"><span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">Nuevo (NPI)</span></td>
                <td className="p-4 text-purple-400 font-medium">Look-alike (SKU-1024)</td>
                <td className="p-4">-</td>
                <td className="p-4 text-right"><button className="text-primary-500 hover:text-primary-400">Ajustar Ref</button></td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">SKU-3050</td>
                <td className="p-4"><span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs">Obsolescencia</span></td>
                <td className="p-4">Manual (Phase-out)</td>
                <td className="p-4 text-red-400">-15%</td>
                <td className="p-4 text-right"><button className="text-primary-500 hover:text-primary-400">Aprobar Baja</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
