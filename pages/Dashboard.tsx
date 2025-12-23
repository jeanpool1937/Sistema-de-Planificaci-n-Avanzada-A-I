import React from 'react';
import { StatCard } from '../components/StatCard';
import { MOCK_SKUS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onViewChange: (view: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const criticalStock = MOCK_SKUS.filter(s => s.stockLevel < s.safetyStock).length;
  const excessStock = MOCK_SKUS.filter(s => s.stockLevel > s.rop * 1.5).length;
  const totalValue = MOCK_SKUS.reduce((acc, s) => acc + (s.stockLevel * s.cost), 0);

  const warningStock = MOCK_SKUS.filter(s => s.stockLevel >= s.safetyStock && s.stockLevel < s.rop).length;
  const healthyStock = MOCK_SKUS.length - criticalStock - excessStock - warningStock;

  // Mock data for chart
  const inventoryHealth = [
    { name: 'Crítico', value: criticalStock, fill: '#ef4444' },
    { name: 'Advertencia', value: warningStock, fill: '#f59e0b' },
    { name: 'Saludable', value: healthyStock, fill: '#22c55e' },
    { name: 'Exceso', value: excessStock, fill: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Nivel de Servicio Global"
          value="94.2%"
          trend="+1.2%"
          trendUp={true}
          icon="verified"
          color="bg-indigo-600"
        />
        <StatCard
          title="Valor Inventario"
          value={`$${(totalValue / 1000000).toFixed(2)}M`}
          trend="-0.5%"
          trendUp={true}
          icon="payments"
          color="bg-emerald-600"
        />
        <StatCard
          title="SKUs Críticos"
          value={criticalStock.toString()}
          trend="+5"
          trendUp={false}
          icon="warning"
          color="bg-red-600"
        />
        <StatCard
          title="Precisión Pronóstico"
          value="88.5%"
          trend="+2.1%"
          trendUp={true}
          icon="insights"
          color="bg-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-dark-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Salud del Inventario (500 SKUs)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryHealth} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones Requeridas</h3>
          <div className="space-y-3">
            {MOCK_SKUS.filter(s => s.stockLevel < s.safetyStock).slice(0, 5).map(sku => (
              <div key={sku.id} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-red-500">priority_high</span>
                  <div>
                    <p className="text-sm font-medium text-white">{sku.id}</p>
                    <p className="text-xs text-red-300">Quiebre Inminente</p>
                  </div>
                </div>
                <button className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded transition-colors">
                  Revisar
                </button>
              </div>
            ))}
            <button
              onClick={() => onViewChange('inventory')}
              className="w-full text-center text-sm text-slate-400 hover:text-white mt-4"
            >
              Ver todos los SKUs críticos &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
