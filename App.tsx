import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { DemandPlanning } from './pages/DemandPlanning';
import { InventoryOptimization } from './pages/InventoryOptimization';
import { SupplyPlanning } from './pages/SupplyPlanning';

enum View {
  DASHBOARD = 'dashboard',
  DEMAND = 'demand',
  INVENTORY = 'inventory',
  SUPPLY = 'supply',
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard onViewChange={setCurrentView} />;
      case View.DEMAND: return <DemandPlanning />;
      case View.INVENTORY: return <InventoryOptimization />;
      case View.SUPPLY: return <SupplyPlanning />;
      default: return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  const NavItem = ({ view, icon, label }: { view: View; icon: string; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        currentView === view
          ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className="material-symbols-rounded">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-rounded">psychology</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">A+I Planning</h1>
              <p className="text-xs text-slate-400">Sistema Avanzado</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem view={View.DASHBOARD} icon="dashboard" label="Dashboard General" />
          <NavItem view={View.DEMAND} icon="trending_up" label="Plan. de Demanda" />
          <NavItem view={View.INVENTORY} icon="inventory_2" label="Opt. Inventario" />
          <NavItem view={View.SUPPLY} icon="conveyor_belt" label="Suministro & Prod." />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
              AM
            </div>
            <div>
              <p className="text-sm font-medium text-white">Alex Manager</p>
              <p className="text-xs text-slate-400">Planificador Senior</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-dark-950 relative">
        <header className="sticky top-0 z-20 bg-dark-950/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {currentView === View.DASHBOARD && 'Visión General'}
              {currentView === View.DEMAND && 'Planificación de Demanda (AI)'}
              {currentView === View.INVENTORY && 'Optimización de Inventario'}
              {currentView === View.SUPPLY && 'Planificación de Suministro'}
            </h2>
            <p className="text-sm text-slate-400">Estado del sistema: 500 SKUs Activos</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white relative">
              <span className="material-symbols-rounded">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <span className="material-symbols-rounded">sync</span>
              Sincronizar ERP
            </button>
          </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
