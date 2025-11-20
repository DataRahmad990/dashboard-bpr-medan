import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, AlertTriangle, PieChart, Activity, ArrowUpDown, Building2 } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

// --- DATA REAL ---
const rawData = [
  { "id": 1, "nama": "PT BPR Duta Adiarta", "perikanan": 0.0, "dagang": 0.0, "rumahtangga": 0.0, "lainnya": 0.7043, "etnis": "Umum" },
  { "id": 2, "nama": "PT BPR Dana Mandiri", "perikanan": 0.006, "dagang": 0.2917, "rumahtangga": 0.0968, "lainnya": 0.3531, "etnis": "Etnis Tertentu" },
  { "id": 3, "nama": "PT BPR Logo Karo Asri", "perikanan": 0.0, "dagang": 0.1541, "rumahtangga": 0.4365, "lainnya": 0.0, "etnis": "Umum" },
  { "id": 4, "nama": "PT BPR MULTI TATAPERKASA", "perikanan": 0.0, "dagang": 0.0826, "rumahtangga": 0.1184, "lainnya": 0.0217, "etnis": "Etnis Tertentu" },
  { "id": 5, "nama": "PT BPR Solider", "perikanan": 0.0, "dagang": 0.3855, "rumahtangga": 0.0037, "lainnya": 0.0078, "etnis": "Etnis Tertentu" },
  { "id": 6, "nama": "PT BPR Bina Barumun", "perikanan": 0.0, "dagang": 0.1689, "rumahtangga": 0.0, "lainnya": 0.7522, "etnis": "Umum" },
  { "id": 7, "nama": "PT BPR Naribi Perkasa", "perikanan": 0.0, "dagang": 0.0517, "rumahtangga": 0.0, "lainnya": 0.8081, "etnis": "Umum" },
  { "id": 8, "nama": "PT BPR Pijer Podi Kekelengen", "perikanan": 0.0522, "dagang": 0.1809, "rumahtangga": 0.0, "lainnya": 0.1255, "etnis": "Umum" },
  { "id": 9, "nama": "PT BPR Prima Mulia Anugrah", "perikanan": 0.0, "dagang": 0.1644, "rumahtangga": 0.0334, "lainnya": 0.0025, "etnis": "Umum" },
  { "id": 10, "nama": "PT BPR Disa Santosa", "perikanan": 0.0, "dagang": 0.0, "rumahtangga": 0.0, "lainnya": 1.0, "etnis": "Umum" },
  { "id": 11, "nama": "PT BPR Talenta Raya", "perikanan": 0.0, "dagang": 0.2617, "rumahtangga": 0.0054, "lainnya": 0.6249, "etnis": "Umum" },
  { "id": 12, "nama": "PT BPR Bandar Jaya", "perikanan": 0.0, "dagang": 0.1579, "rumahtangga": 0.0284, "lainnya": 0.3788, "etnis": "Umum" },
  { "id": 13, "nama": "PT BPR Mitra Sumber Makmur", "perikanan": 0.0, "dagang": 0.1236, "rumahtangga": 0.0, "lainnya": 0.8422, "etnis": "Umum" },
  { "id": 14, "nama": "PT BPR Milala", "perikanan": 0.0, "dagang": 0.0494, "rumahtangga": 0.0068, "lainnya": 0.8973, "etnis": "Umum" },
  { "id": 15, "nama": "PT BPR Perbaungan Hombar Makmur", "perikanan": 0.0058, "dagang": 0.3704, "rumahtangga": 0.0, "lainnya": 0.5422, "etnis": "Umum" },
  { "id": 16, "nama": "PT BPR Nusantara Bona Pasogit 27", "perikanan": 0.0034, "dagang": 0.1384, "rumahtangga": 0.1436, "lainnya": 0.6241, "etnis": "Umum" },
  { "id": 17, "nama": "PT BPR Nusantara Bona Pasogit 5", "perikanan": 0.0019, "dagang": 0.2141, "rumahtangga": 0.0132, "lainnya": 0.6232, "etnis": "Umum" },
  { "id": 18, "nama": "PT BPR Nusantara Bona Pasogit 16", "perikanan": 0.005, "dagang": 0.1594, "rumahtangga": 0.0039, "lainnya": 0.751, "etnis": "Umum" },
  { "id": 19, "nama": "PT BPR Swadaya Pribumi", "perikanan": 0.0, "dagang": 0.0, "rumahtangga": 0.0, "lainnya": 1.0, "etnis": "Umum" },
  { "id": 20, "nama": "PT BPR Nusantara Bona Pasogit 18", "perikanan": 0.0045, "dagang": 0.2404, "rumahtangga": 0.0063, "lainnya": 0.6527, "etnis": "Umum" },
  { "id": 21, "nama": "PT BPR Nusantara Bona Pasogit 12", "perikanan": 0.0046, "dagang": 0.1869, "rumahtangga": 0.0024, "lainnya": 0.542, "etnis": "Umum" },
  { "id": 22, "nama": "PT BPR Nusantara Bona Pasogit 17", "perikanan": 0.001, "dagang": 0.1994, "rumahtangga": 0.0, "lainnya": 0.0, "etnis": "Umum" },
  { "id": 23, "nama": "PT BPR Nusantara Bona Pasogit 20", "perikanan": 0.0009, "dagang": 0.215, "rumahtangga": 0.0023, "lainnya": 0.5621, "etnis": "Umum" },
  { "id": 24, "nama": "PT BPR Duta Pematangsiantar", "perikanan": 0.0, "dagang": 0.0, "rumahtangga": 0.0, "lainnya": 1.0, "etnis": "Umum" },
  { "id": 25, "nama": "PT BPR Karyajatnika Sadaya", "perikanan": 0.0, "dagang": 0.1736, "rumahtangga": 0.0, "lainnya": 0.0296, "etnis": "Umum" },
  { "id": 26, "nama": "PT BPR Mitra Karyajatnika", "perikanan": 0.0, "dagang": 0.1121, "rumahtangga": 0.0, "lainnya": 0.0032, "etnis": "Umum" },
  { "id": 27, "nama": "PT BPR Nusantara Bona Pasogit 25", "perikanan": 0.0023, "dagang": 0.2216, "rumahtangga": 0.0247, "lainnya": 0.6833, "etnis": "Umum" },
  { "id": 28, "nama": "PT BPR Nusantara Bona Pasogit 28", "perikanan": 0.0078, "dagang": 0.3217, "rumahtangga": 0.0202, "lainnya": 0.5627, "etnis": "Umum" },
  { "id": 29, "nama": "PT BPR Tridana Percut", "perikanan": 0.0097, "dagang": 0.4804, "rumahtangga": 0.0, "lainnya": 0.1833, "etnis": "Etnis Tertentu" },
  { "id": 30, "nama": "PT BPR Duta Paramarta", "perikanan": 0.0, "dagang": 0.0, "rumahtangga": 0.0, "lainnya": 1.0, "etnis": "Umum" },
  { "id": 31, "nama": "PT BPR Nusantara Bona Pasogit 15", "perikanan": 0.0051, "dagang": 0.2565, "rumahtangga": 0.0072, "lainnya": 0.3515, "etnis": "Umum" },
  { "id": 32, "nama": "PT BPR Nusantara Bona Pasogit 22", "perikanan": 0.0022, "dagang": 0.1847, "rumahtangga": 0.0085, "lainnya": 0.5965, "etnis": "Umum" },
  { "id": 33, "nama": "PT BPR Nusantara Bona Pasogit 19", "perikanan": 0.0018, "dagang": 0.1554, "rumahtangga": 0.0194, "lainnya": 0.6995, "etnis": "Umum" },
  { "id": 34, "nama": "PT BPR Nusantara Bona Pasogit 11", "perikanan": 0.003, "dagang": 0.1828, "rumahtangga": 0.0027, "lainnya": 0.7195, "etnis": "Umum" },
  { "id": 35, "nama": "PT BPR Nusantara Bona Pasogit 26", "perikanan": 0.0055, "dagang": 0.2391, "rumahtangga": 0.0036, "lainnya": 0.6175, "etnis": "Umum" },
  { "id": 36, "nama": "PT BPR Nusantara Bona Pasogit 23", "perikanan": 0.0071, "dagang": 0.1441, "rumahtangga": 0.0, "lainnya": 0.0, "etnis": "Umum" },
  { "id": 37, "nama": "PT BPR Nusantara Bona Pasogit 34", "perikanan": 0.0029, "dagang": 0.2186, "rumahtangga": 0.0, "lainnya": 0.3765, "etnis": "Umum" },
  { "id": 38, "nama": "PT BPR Guna Rakyat", "perikanan": 0.0032, "dagang": 0.1656, "rumahtangga": 0.0232, "lainnya": 0.5307, "etnis": "Etnis Tertentu" },
  { "id": 39, "nama": "PT BPR Nusantara Bona Pasogit 4", "perikanan": 0.0036, "dagang": 0.3174, "rumahtangga": 0.0, "lainnya": 0.0, "etnis": "Umum" },
  { "id": 40, "nama": "PT BPR Laksana Abadi", "perikanan": 0.0, "dagang": 0.0729, "rumahtangga": 0.2773, "lainnya": 0.1763, "etnis": "Etnis Tertentu" },
  { "id": 41, "nama": "PT BPR Dana Makmur", "perikanan": 0.0, "dagang": 0.3424, "rumahtangga": 0.0, "lainnya": 0.4145, "etnis": "Etnis Tertentu" },
  { "id": 42, "nama": "PT BPR Buana Agribisnis", "perikanan": 0.0, "dagang": 0.075, "rumahtangga": 0.326, "lainnya": 0.05, "etnis": "Etnis Tertentu" },
  { "id": 43, "nama": "PT BPR Bumiasih NBP 31", "perikanan": 0.0027, "dagang": 0.1301, "rumahtangga": 0.007, "lainnya": 0.738, "etnis": "Umum" },
  { "id": 44, "nama": "PT BPR Bumiasih NBP 33", "perikanan": 0.0057, "dagang": 0.2039, "rumahtangga": 0.0049, "lainnya": 0.5989, "etnis": "Umum" }
];

// --- LOGIC BISNIS ---
const processedData = rawData.map((bpr) => {
  // Produktif vs Non-Produktif
  const nonProduktif = (bpr.rumahtangga || 0) + (bpr.lainnya || 0);
  const produktif = 1 - nonProduktif;

  // Cari Sektor Paling Dominan (Konsentrasi Risiko)
  const sectors = [
    { name: "Perikanan", val: bpr.perikanan || 0 },
    { name: "Perdagangan", val: bpr.dagang || 0 },
    { name: "Bukan LU - RT", val: bpr.rumahtangga || 0 },
    { name: "Bukan LU - Lain", val: bpr.lainnya || 0 },
    { name: "Sektor Lainnya", val: Math.max(0, produktif - (bpr.perikanan||0) - (bpr.dagang||0)) }
  ];
  const maxSectorObj = sectors.reduce((prev, current) => (prev.val > current.val) ? prev : current);

  // Status / Labeling Logic
  let status = "Campuran";
  let statusColor = "bg-gray-100 text-gray-600";
  
  if (produktif > 0.7) {
    status = "Sangat Produktif";
    statusColor = "bg-green-100 text-green-700 border border-green-200";
  } else if (produktif < 0.3) {
    status = "Perhatian Khusus";
    statusColor = "bg-red-100 text-red-700 border border-red-200";
  } else {
    status = "Cukup Produktif";
    statusColor = "bg-orange-100 text-orange-700 border border-orange-200";
  }

  // Flagging Risiko Konsentrasi
  const isHighRisk = maxSectorObj.val > 0.5 && maxSectorObj.name.includes("Bukan");

  return {
    ...bpr,
    produktifPct: produktif * 100,
    maxPct: maxSectorObj.val * 100,
    sektorDominan: maxSectorObj.name,
    status,
    statusColor,
    isHighRisk
  };
});

// --- UI COMPONENTS ---
const StatCard = ({ title, value, sub, icon, isWarning }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${isWarning ? 'border-l-red-500' : 'border-l-red-800'} border-y border-r border-gray-200`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        <p className="text-xs text-gray-400 mt-2">{sub}</p>
      </div>
      <div className={`p-2 rounded-lg ${isWarning ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
        {icon}
      </div>
    </div>
  </div>
);

const TableHeader = ({ label, sortKey, currentSort, onSort }) => (
  <th 
    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
    onClick={() => onSort(sortKey)}
  >
    <div className="flex items-center gap-2">
      {label}
      <ArrowUpDown className={`w-3 h-3 ${currentSort?.key === sortKey ? 'text-red-600' : 'text-gray-300'}`} />
    </div>
  </th>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'produktifPct', direction: 'desc' });

  const finalData = useMemo(() => {
    let data = processedData.filter((item) => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const avgProd = (finalData.reduce((acc, curr) => acc + curr.produktifPct, 0) / (finalData.length || 1)).toFixed(1);
  const highRiskCount = finalData.filter(d => d.isHighRisk).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-10">
      
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs shadow-md">OJK</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">Pengawasan BPR</h1>
              <p className="text-xs text-gray-500">Regional Medan & Sekitarnya</p>
            </div>
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari nama BPR..." 
              className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-red-500 w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Entitas" value={finalData.length} sub="BPR Aktif" icon={<Building2 className="w-5 h-5" />} />
          <StatCard title="Rata-rata Produktif" value={`${avgProd}%`} sub="Target Regional: > 60%" icon={<TrendingUp className="w-5 h-5" />} />
          <StatCard title="Risiko Konsentrasi" value={highRiskCount} sub="Entitas High Risk" isWarning={highRiskCount > 0} icon={<AlertTriangle className="w-5 h-5" />} />
          <StatCard title="Etnis Tertentu" value={finalData.filter(d => d.etnis === "Etnis Tertentu").length} sub="Segmentasi Khusus" icon={<PieChart className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-[500px]">
            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" /> Peta Risiko
            </h2>
            <p className="text-sm text-gray-500 mb-6">Korelasi antara Kredit Produktif (X) vs Konsentrasi Sektor Dominan (Y).</p>
            
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" dataKey="produktifPct" name="Produktif" domain={[0, 100]} tick={{fontSize: 10}} />
                  <YAxis type="number" dataKey="maxPct" name="Max Risk" domain={[0, 100]} tick={{fontSize: 10}} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <ReferenceLine x={50} stroke="#9ca3af" strokeDasharray="3 3" />
                  <ReferenceLine y={50} stroke="#9ca3af" strokeDasharray="3 3" />
                  <Scatter name="BPR" data={finalData} fill="#dc2626">
                    {finalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.produktifPct > 60 ? '#16a34a' : entry.isHighRisk ? '#dc2626' : '#ca8a04'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-center text-gray-400 bg-gray-50 p-2 rounded">
              Hijau: Sehat (>60%) | Kuning: Waspada | Merah: Konsentrasi Tinggi
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Detail Portofolio</h2>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <TableHeader label="Nama BPR" sortKey="nama" currentSort={sortConfig} onSort={handleSort} />
                    <TableHeader label="Produktifitas" sortKey="produktifPct" currentSort={sortConfig} onSort={handleSort} />
                    <TableHeader label="Sektor Dominan" sortKey="sektorDominan" currentSort={sortConfig} onSort={handleSort} />
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {finalData.map((bpr) => (
                    <tr key={bpr.id} className="hover:bg-red-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {bpr.nama.replace("PT Bank Perekonomian Rakyat", "BPR")}
                        <div className="text-xs text-gray-400 mt-0.5">{bpr.etnis}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold">{bpr.produktifPct.toFixed(1)}%</span>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${bpr.produktifPct > 60 ? 'bg-green-500' : 'bg-red-500'}`} 
                              style={{ width: `${bpr.produktifPct}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {bpr.sektorDominan} <span className="text-xs text-gray-400">({bpr.maxPct.toFixed(0)}%)</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${bpr.statusColor}`}>
                          {bpr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
