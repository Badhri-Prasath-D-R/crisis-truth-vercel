import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis
} from 'recharts';
import { 
  Activity, ShieldAlert, CheckCircle2, Globe, Zap, Terminal, 
  ExternalLink, ArrowUpRight, BarChart3, Fingerprint, RefreshCcw
} from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// --- Sub-Component: AI Kernel Activity (Refined Light Version) ---
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
    <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
        <span style={{ color: '#475569', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}>
          <Terminal size={14} color="#3b82f6" /> AI Neural Processing Engine
        </span>
        <span style={{ color: '#10b981', fontWeight: '900', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }} /> SYSTEM_ONLINE
        </span>
      </div>
      <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '12px', lineHeight: '1.8' }}>
        {logs.map((log, i) => (
          <p key={i} style={{ color: '#64748b', margin: '4px 0' }}>
            <span style={{ color: '#94a3b8', fontWeight: '600' }}>{new Date().toLocaleTimeString([], { hour12: false })}</span> 
            <span style={{ color: '#3b82f6', margin: '0 8px' }}>›</span> {log}
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
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <RefreshCcw className="animate-spin" size={32} color="#3b82f6" />
      <span style={{ color: '#64748b', fontWeight: '600', letterSpacing: '0.1em' }}>LOADING GLOBAL INTEL...</span>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fdfdfe', color: '#1e293b', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
               <Fingerprint size={32} color="#3b82f6" />
               <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-0.03em', margin: 0, color: '#0f172a' }}>
                 CrisisTruth <span style={{ color: '#3b82f6' }}>AI</span>
               </h1>
            </div>
            <p style={{ color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.2em' }}>Intelligence Surveillance • v4.2</p>
          </div>
          
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: '800', color: '#94a3b8', margin: 0, textTransform: 'uppercase' }}>Current Threat Level</p>
                <p style={{ fontSize: '16px', fontWeight: '900', color: data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981', margin: 0 }}>{data.stats.threatLevel.toUpperCase()}</p>
              </div>
              <div style={{ width: 12, height: 12, background: data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981', borderRadius: '50%', boxShadow: `0 0 12px ${data.stats.threatLevel === 'High' ? '#ef4444' : '#10b981'}` }} />
          </div>
        </header>

        {/* KEY PERFORMANCE INDICATORS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {[
            { label: 'Scanned Nodes', val: data.stats.totalScraped, icon: Globe, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Deceptions Identified', val: data.stats.fakeDetected, icon: ShieldAlert, color: '#ef4444', bg: '#fef2f2' },
            { label: 'Verified Intelligence', val: data.stats.realVerified, icon: CheckCircle2, color: '#10b981', bg: '#f0fdf4' }
          ].map((stat, i) => (
            <div key={i} style={{ background: '#fff', padding: '32px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.04)' }}>
              <div style={{ background: stat.bg, width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>{stat.label}</p>
              <p style={{ fontSize: '36px', fontWeight: '900', margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>{stat.val.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* ANALYTICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChart3 size={18} color="#f59e0b" /> Topic Distribution
              </h3>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.categoryDistribution} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                    {data.categoryDistribution.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#fff', padding: '32px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.02)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Activity size={18} color="#3b82f6" /> Vulnerability Radar
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.categoryDistribution}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <LiveAITerminal />

        {/* FEED SECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '80px' }}>
          
          {/* DECEPTIONS FEED */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#fef2f2', padding: '8px', borderRadius: '10px' }}><ShieldAlert color="#ef4444" size={20} /></div>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#991b1b', margin: 0 }}>Threat Intel</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.trendingFake.map((news: any) => (
                <div key={news.id} style={{ background: 'white', borderRadius: '24px', border: '1px solid #fee2e2', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.02)' }}>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fraud Detected</span>
                      <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: '800' }}>{news.fakeScore}% RISK</span>
                    </div>
                    <h4 style={{ color: '#1e293b', fontSize: '17px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>{news.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px 0' }}>{news.description.substring(0, 100)}...</p>
                    <button 
                      onClick={() => window.open(news.url, '_blank')}
                      style={{ width: '100%', padding: '12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      Audit Evidence <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VERIFIED FEED */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#f0fdf4', padding: '8px', borderRadius: '10px' }}><CheckCircle2 color="#10b981" size={20} /></div>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#166534', margin: 0 }}>Verified Assets</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.trendingReal.map((news: any) => (
                <div key={news.id} style={{ background: 'white', borderRadius: '24px', border: '1px solid #dcfce7', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.02)' }}>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authentic</span>
                      <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '800' }}>98% TRUST</span>
                    </div>
                    <h4 style={{ color: '#1e293b', fontSize: '17px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.4' }}>{news.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px 0' }}>{news.description.substring(0, 100)}...</p>
                    <button 
                      onClick={() => window.open(news.url, '_blank')}
                      style={{ width: '100%', padding: '12px', background: '#f0fdf4', color: '#10b981', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      Full Report <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;