import React, { useState } from 'react';
import { Shield, Activity, TrendingUp, DollarSign, Lock, Plus, Minus, BarChart3 } from 'lucide-react';

export default function ABCHealthTechERM() {
  const [data, setData] = useState({
    hospitalsActual: 38, hospitalsTarget: 50,
    activeUsers: 1240, growthRate: 12,
    runway: 14, burnRate: 45000,
    incidents: 2, uptime: 99.9,
    compliance: 'Amber', auditRate: 85,
    riskHeat: 'Medium'
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 p-8 font-sans">
      <header className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">ABC HealthTech LLP</h1>
          <p className="text-indigo-400 text-sm">KPI & KRI Monitoring Dashboard – SaaS Expansion ERM</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Risk Heat Indicator</p>
            <div className={`px-4 py-1 rounded-full border text-xs font-bold ${data.riskHeat === 'High' ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-orange-500/10 border-orange-500 text-orange-500'}`}>
              {data.riskHeat} Risk
            </div>
          </div>
          <button onClick={() => setIsAdminOpen(!isAdminOpen)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
            <Activity size={18} className="text-indigo-400" />
          </button>
        </div>
      </header>

      {isAdminOpen && (
        <div className="mb-8 p-6 bg-indigo-950/20 border border-indigo-500/30 rounded-xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2 font-mono text-sm tracking-tighter uppercase"><Lock size={14}/> Executive Override Panel</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <UpdateField label="Hospitals" val={data.hospitalsActual} change={(v) => setData({...data, hospitalsActual: data.hospitalsActual + v})} />
            <UpdateField label="Incidents" val={data.incidents} change={(v) => setData({...data, incidents: data.incidents + v})} />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold">Compliance Status</span>
              <select className="bg-slate-900 border border-slate-700 text-xs p-1 rounded text-white" onChange={(e) => setData({...data, compliance: e.target.value})}>
                <option value="Amber">Amber</option><option value="Green">Green</option><option value="Red">Red</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="SaaS Adoption & Growth" icon={<TrendingUp className="text-blue-400" />}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2 text-slate-400">
                <span>Hospitals Onboarded (Target: {data.hospitalsTarget})</span>
                <span className="font-bold text-white">{data.hospitalsActual}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(data.hospitalsActual/data.hospitalsTarget)*100}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Stat mini label="Active Users" val={data.activeUsers.toLocaleString()} />
              <Stat mini label="Conv. Rate" val="14.2%" />
            </div>
          </div>
        </Card>

        <Card title="Financial Risk Status" icon={<DollarSign className="text-emerald-400" />}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
              <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Cash Runway</p>
              <p className="text-2xl font-bold text-white">{data.runway} <span className="text-xs font-normal text-slate-500">Months</span></p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
              <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Burn Rate</p>
              <p className="text-2xl font-bold text-white">${(data.burnRate/1000).toFixed(0)}k</p>
            </div>
          </div>
        </Card>

        <Card title="Cyber & Compliance KRIs" icon={<Shield className="text-purple-400" />}>
          <div className="space-y-3">
            <Row label="Security Incidents" val={data.incidents} color={data.incidents > 0 ? 'text-red-500' : 'text-emerald-500'} />
            <Row label="Cloud Uptime" val={`${data.uptime}%`} color="text-blue-400" />
            <Row label="ABDM Status" val={data.compliance} color={data.compliance === 'Amber' ? 'text-orange-500' : 'text-emerald-500'} />
          </div>
        </Card>

        <div className="lg:col-span-3 bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={16} className="text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">CEO Risk Review – Monthly Snapshot</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            "SaaS expansion is pacing at 76% of target. Financial runway is stable at 14 months. ABDM compliance remains at {data.compliance} status."
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-300">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, val }) {
  return (
    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
      <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">{label}</p>
      <p className="text-lg font-bold text-white">{val}</p>
    </div>
  );
}

function Row({ label, val, color }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-800/50 last:border-0">
      <span className="text-xs text-slate-400">{label}</span>
      <span className={`text-xs font-bold ${color}`}>{val}</span>
    </div>
  );
}

function UpdateField({ label, val, change }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase text-slate-500 font-bold">{label}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => change(-1)} className="bg-slate-800 p-1 rounded hover:bg-red-900/30 text-white border border-slate-700"><Minus size={12}/></button>
        <span className="text-xs font-bold text-white w-6 text-center">{val}</span>
        <button onClick={() => change(1)} className="bg-slate-800 p-1 rounded hover:bg-green-900/30 text-white border border-slate-700"><Plus size={12}/></button>
      </div>
    </div>
  );
}
