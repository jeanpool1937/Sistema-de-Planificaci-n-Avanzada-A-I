import React from 'react';

export const SupplyPlanning: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-dark-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h3 className="text-lg font-bold text-white">Planificación de Requerimientos de Material (MRP)</h3>
          <p className="text-sm text-slate-400">Horizonte: Próximas 4 Semanas</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-primary-900/20">
          Ejecutar Motor MRP
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Capacity Visualization */}
        <div className="lg:col-span-1 bg-dark-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-4">Utilización de Capacidad (Planta A)</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Línea de Ensamble 1</span>
                <span className="text-red-400 font-bold">98%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <p className="text-xs text-red-400 mt-1">Cuello de botella detectado semana 42</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Línea de Ensamble 2</span>
                <span className="text-green-400 font-bold">75%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Empaque</span>
                <span className="text-yellow-400 font-bold">85%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-sm font-bold text-white mb-2">Recomendación AI</h4>
            <p className="text-xs text-slate-400">
              Se sugiere mover la producción de SKU-1024 a Línea 2 para balancear carga y evitar retrasos en entregas críticas.
            </p>
            <button className="mt-3 text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded transition-colors">
              Aplicar Balanceo
            </button>
          </div>
        </div>

        {/* MRP Schedule / Gantt-ish view */}
        <div className="lg:col-span-2 bg-dark-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-base font-semibold text-white">Calendario de Producción & Compras</h3>
          </div>

          <div className="p-4 overflow-x-auto">
            <div className="min-w-[600px] space-y-4">
              {/* Timeline Header */}
              <div className="flex ml-32 text-xs text-slate-500 uppercase font-bold">
                <div className="flex-1 text-center">Semana 1</div>
                <div className="flex-1 text-center">Semana 2</div>
                <div className="flex-1 text-center">Semana 3</div>
                <div className="flex-1 text-center">Semana 4</div>
              </div>

              {/* Rows */}
              <div className="relative pt-2">
                {/* Vertical grid lines */}
                <div className="absolute inset-0 ml-32 flex pointer-events-none">
                  <div className="flex-1 border-l border-slate-800 border-dashed"></div>
                  <div className="flex-1 border-l border-slate-800 border-dashed"></div>
                  <div className="flex-1 border-l border-slate-800 border-dashed"></div>
                  <div className="flex-1 border-l border-slate-800 border-dashed"></div>
                </div>

                {/* Item Row 1 */}
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-32 pr-4 text-right">
                    <p className="text-sm font-medium text-white">SKU-1024</p>
                    <p className="text-xs text-slate-500">Prod. Orden</p>
                  </div>
                  <div className="flex-1 bg-slate-800/30 h-8 rounded-r-lg relative">
                    {/* Gantt Bar */}
                    <div className="absolute left-[10%] w-[40%] h-6 top-1 bg-blue-600 rounded flex items-center px-2 text-xs text-white shadow-lg">
                      WO-5520 (1500u)
                    </div>
                  </div>
                </div>

                {/* Item Row 2 */}
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-32 pr-4 text-right">
                    <p className="text-sm font-medium text-white">Mat-Steel-01</p>
                    <p className="text-xs text-slate-500">Orden Compra</p>
                  </div>
                  <div className="flex-1 bg-slate-800/30 h-8 rounded-r-lg relative">
                    {/* Gantt Bar */}
                    <div className="absolute left-[5%] w-[20%] h-6 top-1 bg-emerald-600 rounded flex items-center px-2 text-xs text-white shadow-lg">
                      PO-991 (Llegada)
                    </div>
                  </div>
                </div>

                {/* Item Row 3 (Alert) */}
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-32 pr-4 text-right">
                    <p className="text-sm font-medium text-white">Pack-Box-L</p>
                    <p className="text-xs text-slate-500">Orden Compra</p>
                  </div>
                  <div className="flex-1 bg-slate-800/30 h-8 rounded-r-lg relative">
                    {/* Gantt Bar */}
                    <div className="absolute left-[60%] w-[20%] h-6 top-1 bg-slate-700 border border-red-500 rounded flex items-center px-2 text-xs text-red-400 shadow-lg">
                      <span className="material-symbols-rounded text-sm mr-1">warning</span>
                      Retraso Prov.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
