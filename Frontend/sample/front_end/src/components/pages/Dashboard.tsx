import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis
} from 'recharts';
import { 
  Activity, ShieldAlert, CheckCircle2, Globe, Zap, Terminal, 
  ExternalLink, ArrowUpRight, BarChart3, Fingerprint, RefreshCcw, Layers
} from 'lucide-react';

const COLORS = ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];

const LiveAITerminal = () => {
  const [logs, setLogs] = useState([
    "Initializing Neural Verifier v4.2...",
    "Scanning Global RSS Feeds (PIB, Reuters)...",
    "Pre-processing incoming misinformation stream...",
  ]);

  useEffect(() => {
    const activityMessages = [
      "AI detected high-similarity claim in Finance sector.",
      "Verification confidence: 94.2% (Status: FAKE).",
      "Cross-referencing database for evidence matches...",
      "New verification evidence cached for ID #8821.",
      "Syncing with news_articles.db master node..."
    ];
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), activityMessages[Math.floor(Math.random() * activityMessages.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '24px', marginBottom: '40px', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '12px' }}>
        <span style={{ color: '#3b82f6', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '11px' }}>
          <Terminal size={14} color="#60a5fa" /> AI Neural Processing Engine
        </span>
        <span style={{ color: '#10b981', fontWeight: '900', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }} /> SYSTEM_ONLINE
        </span>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.8' }}>
        {logs.map((log, i) => (
          <p key={i} style={{ color: '#94a3b8', margin: '4px 0' }}>
            <span style={{ color: '#3b82f6' }}>[{new Date().toLocaleTimeString([], { hour12: false })}]</span> › {log}
          </p>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard-stats`);
        const result = await response.json();
        setData(result);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading || !data) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <RefreshCcw style={{ animation: 'spin 2s linear infinite' }} size={32} color="#3b82f6" />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <Fingerprint size={32} color="#3b82f6" />
               <h1 style={{ fontSize: '32px', fontWeight: '900', margin: 0 }}>
                 CrisisTruth <span style={{ color: '#3b82f6' }}>AI</span>
               </h1>
            </div>
            <p style={{ color: '#475569', fontWeight: '700', fontSize: '11px', letterSpacing: '0.3em', marginTop: '8px' }}>SURVEILLANCE INTERFACE v4.2</p>
          </div>
          
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '12px 24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '10px', color: '#475569', margin: 0 }}>THREAT LEVEL</p>
              <p style={{ fontSize: '16px', fontWeight: '900', color: data?.stats?.threatLevel === 'High' ? '#ef4444' : '#10b981', margin: 0 }}>{data?.stats?.threatLevel?.toUpperCase() || 'NORMAL'}</p>
            </div>
          </div>
        </header>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {[
            { label: 'Scanned Nodes', val: data?.stats?.totalScraped || 0, icon: Globe, color: '#60a5fa' },
            { label: 'Deceptions', val: data?.stats?.fakeDetected || 0, icon: ShieldAlert, color: '#f87171' },
            { label: 'Verified Intel', val: data?.stats?.realVerified || 0, icon: CheckCircle2, color: '#34d399' }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
              <stat.icon size={24} color={stat.color} style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', margin: 0 }}>{stat.label}</p>
              <p style={{ fontSize: '36px', fontWeight: '900', margin: '8px 0 0 0' }}>{stat.val.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '24px' }}>CATEGORY DISTRIBUTION</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data?.categoryDistribution || []} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                    {data?.categoryDistribution?.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#020617', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#0f172a', padding: '32px', borderRadius: '32px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '24px' }}>RISK SURFACE</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data?.categoryDistribution || []}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <LiveAITerminal />

        {/* FEEDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          
          {/* FAKE NEWS */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '24px', color: '#ef4444' }}>🚨 THREAT STREAM</h2>
            {data?.trendingFake?.map((news: any) => (
              <div key={news.id} style={{ background: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', padding: '24px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 'bold' }}>FAKE SCORE</span>
                  <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{news.fakeScore}%</span>
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0' }}>{news.title || "Untitled Intelligence"}</h4>
                {/* SAFE SUBSTRING CHECK */}
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
                  {news.description ? `${news.description.substring(0, 110)}...` : "No description available for this intercept."}
                </p>
                <button 
                  onClick={() => news.url && window.open(news.url, '_blank')}
                  style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#1e293b', color: '#60a5fa', border: '1px solid #334155', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  AUDIT SOURCE
                </button>
              </div>
            ))}
          </div>

          {/* REAL NEWS */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '24px', color: '#10b981' }}>🛡️ VALIDATED INTEL</h2>
            {data?.trendingReal?.map((news: any) => (
              <div key={news.id} style={{ background: 'linear-gradient(180deg, #0f172a, #020617)', borderRadius: '24px', border: '1px solid #1e293b', padding: '24px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold' }}>STATUS</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>VERIFIED</span>
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0' }}>{news.title || "Untitled Intelligence"}</h4>
                {/* SAFE SUBSTRING CHECK */}
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
                  {news.description ? `${news.description.substring(0, 110)}...` : "No description available for this record."}
                </p>
                <button 
                  onClick={() => news.url && window.open(news.url, '_blank')}
                  style={{ width: '100%', marginTop: '20px', padding: '12px', background: 'linear-gradient(to right, #2563eb, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  VIEW FULL REPORT
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;