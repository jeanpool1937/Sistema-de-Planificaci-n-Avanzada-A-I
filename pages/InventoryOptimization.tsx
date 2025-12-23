import React, { useState } from 'react';
import { MOCK_SKUS } from '../constants';
import { ABCClass, XYZClass } from '../types';

export const InventoryOptimization: React.FC = () => {
  const [serviceLevel, setServiceLevel] = useState(95);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  // Matrix Logic
  const getSegmentCount = (abc: ABCClass, xyz: XYZClass) => {
    return MOCK_SKUS.filter(s => s.abc === abc && s.xyz === xyz).length;
  };

  const MatrixCell = ({ abc, xyz, color }: { abc: ABCClass, xyz: XYZClass, color: string }) => {
    const count = getSegmentCount(abc, xyz);
    const isSelected = selectedSegment === `${abc}${xyz}`;
    
    return (
      <div 
        onClick={() => setSelectedSegment(isSelected ? null : `${abc}${xyz}`)}
        className={`
          p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center h-32
          ${isSelected ? 'ring-2 ring-white border-transparent' : 'border-slate-800 hover:border-slate-600'}
          ${color} bg-opacity-10
        `}
      >
        <span className={`text-2xl font-bold ${color.replace('bg-', 'text-')}`}>{count}</span>
        <span className="text-xs text-slate-400 mt-1 font-medium">{abc}-{xyz}</span>
        <span className="text-[10px] text-slate-500 mt-1 text-center hidden xl:block">
          {xyz === XYZClass.X ? 'Predecible' : xyz === XYZClass.Y ? 'Variable' : 'Volátil'}
        </span>
      </div>
    );
  };

  const filteredSkus = selectedSegment 
    ? MOCK_SKUS.filter(s => `${s.abc}${s.xyz}` === selectedSegment)
    : MOCK_SKUS;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Matrix Visualization */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Matriz ABC/XYZ</h3>
            <p className="text-sm text-slate-400 mb-6">Clasificación por Valor (ABC) y Volatilidad (XYZ)</p>
            
            <div className="grid grid-cols-3 gap-3">
              {/* Row A */}
              <MatrixCell abc={ABCClass.A} xyz={XYZClass.X} color="bg-green-500" />
              <MatrixCell abc={ABCClass.A} xyz={XYZClass.Y} color="bg-yellow-500" />
              <MatrixCell abc={ABCClass.A} xyz={XYZClass.Z} color="bg-red-500" />
              
              {/* Row B */}
              <MatrixCell abc={ABCClass.B} xyz={XYZClass.X} color="bg-green-600" />
              <MatrixCell abc={ABCClass.B} xyz={XYZClass.Y} color="bg-yellow-600" />
              <MatrixCell abc={ABCClass.B} xyz={XYZClass.Z} color="bg-orange-600" />
              
              {/* Row C */}
              <MatrixCell abc={ABCClass.C} xyz={XYZClass.X} color="bg-blue-600" />
              <MatrixCell abc={ABCClass.C} xyz={XYZClass.Y} color="bg-blue-700" />
              <MatrixCell abc={ABCClass.C} xyz={XYZClass.Z} color="bg-slate-600" />
            </div>
            
            <div className="mt-4 flex justify-between text-xs text-slate-500 px-2">
              <span>Alta Rotación (A)</span>
              <span>Baja Rotación (C)</span>
            </div>
          </div>

          <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Simulador de Stock de Seguridad</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-slate-300">Nivel de Servicio Objetivo</label>
                  <span className="text-sm font-bold text-primary-500">{serviceLevel}%</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="99" 
                  value={serviceLevel}
                  onChange={(e) => setServiceLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                 <p className="text-xs text-slate-400 mb-1">Impacto Estimado en Inversión</p>
                 <p className="text-lg font-bold text-white">+$124,500 <span className="text-xs font-normal text-slate-400">vs Actual</span></p>
              </div>
              <button className="w-full bg-primary-600 hover:bg-primary-500 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Aplicar Nuevos Parámetros
              </button>
            </div>
          </div>
        </div>

        {/* SKU Table */}
        <div className="lg:col-span-7 bg-dark-900 border border-slate-800 rounded-xl flex flex-col h-[700px]">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">
              {selectedSegment ? `SKUs en Segmento ${selectedSegment}` : 'Todos los SKUs'} 
              <span className="ml-2 text-sm font-normal text-slate-400">({filteredSkus.length} items)</span>
            </h3>
            <button className="text-sm text-primary-500 font-medium">Exportar CSV</button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-dark-900 z-10 shadow-sm">
                <tr className="text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-800">SKU</th>
                  <th className="p-4 border-b border-slate-800">Clase</th>
                  <th className="p-4 border-b border-slate-800 text-right">Stock Actual</th>
                  <th className="p-4 border-b border-slate-800 text-right text-primary-500">Stock Seg. (Calc)</th>
                  <th className="p-4 border-b border-slate-800 text-right">Punto Reorden</th>
                  <th className="p-4 border-b border-slate-800">Estado</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-800">
                {filteredSkus.slice(0, 50).map((sku) => (
                  <tr key={sku.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{sku.id}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[120px]">{sku.name}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300">
                        {sku.abc}-{sku.xyz}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-300">{sku.stockLevel.toLocaleString()}</td>
                    <td className="p-4 text-right font-medium text-primary-400">
                      {/* Dynamic calculation visual effect based on slider */}
                      {Math.floor(sku.safetyStock * (serviceLevel / 95)).toLocaleString()}
                    </td>
                    <td className="p-4 text-right text-slate-300">{sku.rop.toLocaleString()}</td>
                    <td className="p-4">
                      {sku.stockLevel < sku.rop ? (
                         <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
                           <span className="material-symbols-rounded text-sm">warning</span>
                           Reponer
                         </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-400 text-xs font-medium">
                          <span className="material-symbols-rounded text-sm">check_circle</span>
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
