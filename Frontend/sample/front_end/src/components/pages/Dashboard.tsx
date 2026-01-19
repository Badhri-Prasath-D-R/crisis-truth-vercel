import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  Activity, ShieldAlert, CheckCircle2, Globe, Zap, Terminal, 
  ExternalLink, ArrowUpRight, BarChart3, Fingerprint, RefreshCcw, Layers,
  AlertTriangle, TrendingUp, Clock, Database, Shield, AlertCircle
} from 'lucide-react';

const COLORS = ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];
const COLORS_GRADIENT = ['#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4'];

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
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-blue-400" />
          <span className="terminal-title">AI Neural Processing Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-500 font-bold text-xs">SYSTEM_ONLINE</span>
          <div className="ml-4 px-2 py-1 bg-blue-900/30 rounded-md border border-blue-800/50">
            <span className="text-blue-300 text-xs font-mono">{logs.length} processes</span>
          </div>
        </div>
      </div>
      <div className="terminal-logs">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">
            <span className="log-time">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span className="log-divider">›</span>
            <span className="log-message">{log}</span>
            {i === logs.length - 1 && (
              <span className="ml-2 inline-block w-2 h-4 bg-blue-500 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('24h');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/dashboard-stats`);
        const result = await response.json();
        setData(result);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return (
    <div className="loading-screen">
      <div className="loading-content">
        <RefreshCcw className="animate-spin" size={32} color="#3b82f6" />
        <div className="mt-4">
          <p className="text-blue-300 font-medium">Initializing Surveillance Interface</p>
          <div className="mt-2 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse" style={{width: '70%'}} />
          </div>
        </div>
      </div>
    </div>
  );

  const threatLevel = data?.stats?.threatLevel || 'Normal';
  const threatColor = threatLevel === 'High' ? 'red' : threatLevel === 'Medium' ? 'yellow' : 'green';

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        
        {/* HEADER */}
        <header className="dashboard-header">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="header-icon">
                <Fingerprint size={28} />
              </div>
              <div>
                <h1 className="dashboard-title">
                  CrisisTruth <span className="gradient-text">AI</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="version-badge">v4.2</span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="header-controls">
            <div className="timeframe-selector">
              {['1h', '24h', '7d', '30d'].map((item) => (
                <button
                  key={item}
                  className={`timeframe-btn ${timeframe === item ? 'active' : ''}`}
                  onClick={() => setTimeframe(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="threat-indicator">
              <div className="threat-label">
                <AlertTriangle size={14} />
                <span>THREAT LEVEL</span>
              </div>
              <div className={`threat-level ${threatColor}`}>
                <div className="threat-dot" />
                {threatLevel.toUpperCase()}
              </div>
            </div>
            
            <button className="refresh-btn">
              <RefreshCcw size={16} />
            </button>
          </div>
        </header>

        {/* STATS CARDS */}
        <div className="stats-grid">
          {[
            { 
              label: 'Total Scanned', 
              value: data?.stats?.totalScraped || 0, 
              icon: Database, 
              color: 'blue',
              trend: '+12%',
              description: 'Network nodes'
            },
            { 
              label: 'Deceptions Detected', 
              value: data?.stats?.fakeDetected || 0, 
              icon: ShieldAlert, 
              color: 'red',
              trend: '+24%',
              description: 'High confidence'
            },
            { 
              label: 'Verified Intel', 
              value: data?.stats?.realVerified || 0, 
              icon: CheckCircle2, 
              color: 'green',
              trend: '+8%',
              description: 'Validated sources'
            },
            { 
              label: 'Active Monitors', 
              value: data?.stats?.activeMonitors || 42, 
              icon: Globe, 
              color: 'purple',
              trend: 'Live',
              description: 'Global coverage'
            }
          ].map((stat, i) => (
            <div key={i} className={`stat-card stat-${stat.color}`}>
              <div className="stat-header">
                <div className="stat-icon">
                  <stat.icon size={20} />
                </div>
                <span className="stat-trend">{stat.trend}</span>
              </div>
              <div className="stat-content">
                <p className="stat-value">{stat.value.toLocaleString()}</p>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-description">{stat.description}</p>
              </div>
              <div className="stat-footer">
                <TrendingUp size={12} />
                <span className="text-xs">Real-time tracking</span>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS SECTION */}
        <div className="charts-section">
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Category Distribution</h3>
              <div className="chart-legend">
                {data?.categoryDistribution?.slice(0, 3).map((cat: any, i: number) => (
                  <div key={i} className="legend-item">
                    <div className="legend-color" style={{backgroundColor: COLORS_GRADIENT[i]}} />
                    <span className="legend-text">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={data?.categoryDistribution || []} 
                    innerRadius={60} 
                    outerRadius={90} 
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {data?.categoryDistribution?.map((_: any, i: number) => (
                      <Cell 
                        key={i} 
                        fill={COLORS_GRADIENT[i % COLORS_GRADIENT.length]} 
                        stroke="#0f172a"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.95)', 
                      border: '1px solid #1e293b', 
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }}
                    formatter={(value) => [`${value} items`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-center-label">
                <span className="center-label-text">Total</span>
                <span className="center-label-value">
                  {data?.categoryDistribution?.reduce((acc: number, curr: any) => acc + curr.value, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Risk Assessment</h3>
              <div className="risk-score">
                <Shield size={16} className="text-blue-400" />
                <span>Confidence: 94%</span>
              </div>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data?.categoryDistribution || []}>
                  <PolarGrid 
                    stroke="#1e293b" 
                    strokeWidth={1}
                    radialLines={false}
                  />
                  <PolarAngleAxis 
                    dataKey="name" 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar 
                    name="Risk Level" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fill="url(#gradientFill)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.95)', 
                      border: '1px solid #1e293b', 
                      borderRadius: '8px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI TERMINAL */}
        <div className="terminal-section">
          <div className="section-header">
            <h2 className="section-title">
              <Activity size={20} className="text-blue-400" />
              AI Processing Log
            </h2>
            <div className="section-actions">
              <button className="action-btn">
                <Layers size={14} />
                View Details
              </button>
            </div>
          </div>
          <LiveAITerminal />
        </div>

        {/* NEWS FEEDS */}
        <div className="feeds-section">
          <div className="feed-column">
            <div className="feed-header feed-header-red">
              <AlertCircle size={20} className="text-red-400" />
              <div>
                <h2 className="feed-title">Threat Stream</h2>
                <p className="feed-subtitle">Potential misinformation detected</p>
              </div>
              <span className="feed-count">{data?.trendingFake?.length || 0} alerts</span>
            </div>
            
            <div className="feed-content">
              {data?.trendingFake?.map((news: any) => (
                <div key={news.id} className="news-card news-card-threat">
                  <div className="news-card-header">
                    <div className="news-meta">
                      <span className="news-badge news-badge-red">FAKE SCORE: {news.fakeScore}%</span>
                      <span className="news-source">{news.source || 'Unknown Source'}</span>
                    </div>
                    <div className="news-priority">
                      <div className={`priority-dot ${news.fakeScore > 80 ? 'high' : 'medium'}`} />
                    </div>
                  </div>
                  <h4 className="news-title">{news.title || "Untitled Intelligence"}</h4>
                  <p className="news-description">
                    {news.description ? `${news.description.substring(0, 120)}...` : "No description available."}
                  </p>
                  <div className="news-footer">
                    <div className="news-tags">
                      {news.category && <span className="news-tag">{news.category}</span>}
                      <span className="news-time">2h ago</span>
                    </div>
                    <button 
                      onClick={() => news.url && window.open(news.url, '_blank')}
                      className="news-btn news-btn-red"
                    >
                      <ExternalLink size={14} />
                      Audit Source
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="feed-column">
            <div className="feed-header feed-header-green">
              <Shield size={20} className="text-green-400" />
              <div>
                <h2 className="feed-title">Validated Intel</h2>
                <p className="feed-subtitle">Verified reliable information</p>
              </div>
              <span className="feed-count">{data?.trendingReal?.length || 0} verified</span>
            </div>
            
            <div className="feed-content">
              {data?.trendingReal?.map((news: any) => (
                <div key={news.id} className="news-card news-card-verified">
                  <div className="news-card-header">
                    <div className="news-meta">
                      <span className="news-badge news-badge-green">VERIFIED</span>
                      <span className="news-source news-source-verified">{news.source || 'Trusted Source'}</span>
                    </div>
                    <div className="verification-badge">
                      <CheckCircle2 size={16} className="text-green-400" />
                    </div>
                  </div>
                  <h4 className="news-title">{news.title || "Untitled Intelligence"}</h4>
                  <p className="news-description">
                    {news.description ? `${news.description.substring(0, 120)}...` : "No description available."}
                  </p>
                  <div className="news-footer">
                    <div className="news-tags">
                      {news.category && <span className="news-tag news-tag-verified">{news.category}</span>}
                      <span className="news-time news-time-verified">4h ago</span>
                    </div>
                    <button 
                      onClick={() => news.url && window.open(news.url, '_blank')}
                      className="news-btn news-btn-green"
                    >
                      <ExternalLink size={14} />
                      View Report
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

// Add these CSS styles (or use with Tailwind CSS classes)
const styles = `
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  color: #f1f5f9;
  padding: 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
}

.header-icon {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  padding: 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  background: linear-gradient(135deg, #60a5fa, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.version-badge {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.timeframe-selector {
  display: flex;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
}

.timeframe-btn {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.timeframe-btn.active {
  background: #1e293b;
  color: #60a5fa;
}

.threat-indicator {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #1e293b;
  padding: 8px 16px;
  border-radius: 12px;
  min-width: 140px;
  backdrop-filter: blur(10px);
}

.threat-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 4px;
}

.threat-level {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
}

.threat-level.red { color: #ef4444; }
.threat-level.yellow { color: #f59e0b; }
.threat-level.green { color: #10b981; }

.threat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.threat-level.red .threat-dot { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
.threat-level.yellow .threat-dot { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
.threat-level.green .threat-dot { background: #10b981; box-shadow: 0 0 8px #10b981; }

.refresh-btn {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: rotate(45deg);
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #1e293b;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
}

.stat-card.stat-blue::before { background: linear-gradient(90deg, #3b82f6, #0ea5e9); }
.stat-card.stat-red::before { background: linear-gradient(90deg, #ef4444, #f97316); }
.stat-card.stat-green::before { background: linear-gradient(90deg, #10b981, #22c55e); }
.stat-card.stat-purple::before { background: linear-gradient(90deg, #8b5cf6, #a855f7); }

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stat-icon {
  background: rgba(59, 130, 246, 0.1);
  padding: 8px;
  border-radius: 10px;
}

.stat-card.stat-blue .stat-icon { color: #60a5fa; background: rgba(59, 130, 246, 0.1); }
.stat-card.stat-red .stat-icon { color: #f87171; background: rgba(239, 68, 68, 0.1); }
.stat-card.stat-green .stat-icon { color: #34d399; background: rgba(16, 185, 129, 0.1); }
.stat-card.stat-purple .stat-icon { color: #a78bfa; background: rgba(139, 92, 246, 0.1); }

.stat-trend {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.stat-card.stat-blue .stat-trend { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
.stat-card.stat-red .stat-trend { background: rgba(239, 68, 68, 0.15); color: #f87171; }
.stat-card.stat-green .stat-trend { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.stat-card.stat-purple .stat-trend { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }

.stat-value {
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #f8fafc, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 14px;
  color: #94a3b8;
  margin: 8px 0 4px 0;
}

.stat-description {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.stat-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(30, 41, 59, 0.5);
  color: #64748b;
  font-size: 11px;
}

/* Charts */
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.chart-container {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 20px;
  border: 1px solid #1e293b;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: #f8fafc;
}

.chart-legend {
  display: flex;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-color {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.legend-text {
  font-size: 11px;
  color: #94a3b8;
}

.chart-content {
  height: 300px;
  position: relative;
}

.chart-center-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-label-text {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
}

.center-label-value {
  font-size: 24px;
  font-weight: 800;
  color: #f8fafc;
}

.risk-score {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  background: rgba(59, 130, 246, 0.1);
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* Terminal */
.terminal-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(59, 130, 246, 0.2);
}

.terminal-container {
  background: rgba(15, 23, 42, 0.7);
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #1e293b;
  backdrop-filter: blur(10px);
  position: relative;
}

.terminal-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(30, 41, 59, 0.5);
}

.terminal-title {
  color: #60a5fa;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.terminal-logs {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
}

.log-entry {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  color: #94a3b8;
}

.log-time {
  color: #60a5fa;
  min-width: 85px;
}

.log-divider {
  color: #475569;
}

.log-message {
  flex: 1;
  color: #cbd5e1;
}

/* News Feeds */
.feeds-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.feed-column {
  display: flex;
  flex-direction: column;
}

.feed-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 16px 16px 0 0;
  margin-bottom: 16px;
}

.feed-header-red {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.feed-header-green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.feed-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0;
}

.feed-header-red .feed-title { color: #f87171; }
.feed-header-green .feed-title { color: #34d399; }

.feed-subtitle {
  font-size: 12px;
  color: #94a3b8;
  margin: 2px 0 0 0;
}

.feed-count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.feed-header-red .feed-count { 
  background: rgba(239, 68, 68, 0.15); 
  color: #fca5a5; 
}

.feed-header-green .feed-count { 
  background: rgba(16, 185, 129, 0.15); 
  color: #86efac; 
}

.feed-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-card {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #1e293b;
  transition: all 0.3s;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.news-card-threat:hover { border-color: rgba(239, 68, 68, 0.4); }
.news-card-verified:hover { border-color: rgba(16, 185, 129, 0.4); }

.news-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.news-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.news-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
}

.news-badge-red {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.news-badge-green {
  background: rgba(16, 185, 129, 0.15);
  color: #86efac;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.news-source {
  font-size: 11px;
  color: #94a3b8;
}

.news-source-verified {
  color: #34d399;
}

.news-priority {
  display: flex;
  align-items: center;
  gap: 4px;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.priority-dot.high { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
.priority-dot.medium { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }

.verification-badge {
  background: rgba(16, 185, 129, 0.1);
  padding: 6px;
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.news-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #f8fafc;
  line-height: 1.4;
}

.news-description {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.news-tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.5);
  color: #94a3b8;
}

.news-tag-verified {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
}

.news-time {
  font-size: 11px;
  color: #64748b;
}

.news-time-verified {
  color: #34d399;
}

.news-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.news-btn-red {
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.news-btn-red:hover {
  background: rgba(239, 68, 68, 0.2);
}

.news-btn-green {
  background: rgba(16, 185, 129, 0.1);
  color: #86efac;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.news-btn-green:hover {
  background: rgba(16, 185, 129, 0.2);
}

/* Loading Screen */
.loading-screen {
  min-height: 100vh;
  background: #020617;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.animate-spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1100px) {
  .charts-section,
  .feeds-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-controls {
    flex-wrap: wrap;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    min-width: 100%;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .feeds-section {
    grid-template-columns: 1fr;
  }
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Dashboard;