import { useState, useMemo } from 'react';
import { useNetwork } from '@/context/NetworkContext';
import { DeviceIcon } from '@/components/DeviceIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DeviceType } from '@/data/mockDevices';

export default function DevicesPage() {
  const { devices } = useNetwork();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<DeviceType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Online' | 'Offline'>('All');

  const filtered = useMemo(() => {
    return devices.filter(d => {
      const matchSearch = search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.ip.includes(search) ||
        d.mac.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'All' || d.type === filterType;
      const matchStatus = filterStatus === 'All' || d.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [devices, search, filterType, filterStatus]);

  const exportCSV = () => {
    const headers = ['Name', 'IP', 'MAC', 'Type', 'Status', 'Download (Mbps)', 'Upload (Mbps)', 'Data Usage (MB)'];
    const rows = filtered.map(d => [d.name, d.ip, d.mac, d.type, d.status, d.downloadSpeed, d.uploadSpeed, d.dataUsage]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devices.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const types: (DeviceType | 'All')[] = ['All', 'Laptop', 'Desktop', 'Mobile', 'Tablet', 'IoT', 'Unknown'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-foreground tracking-tight">Devices</h1>
          <p className="text-[13px] text-muted-foreground mt-1">{filtered.length} of {devices.length} devices shown</p>
        </div>
        <Button onClick={exportCSV} variant="outline" size="sm" className="gap-2 text-[13px] shadow-soft">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search by name, IP, or MAC..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9 text-[13px] bg-card border-border shadow-soft"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                filterType === t
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {(['All', 'Online', 'Offline'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                filterStatus === s
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Device</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">IP Address</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">MAC Address</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Traffic</th>
                <th className="text-right px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Data Usage</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((device, i) => (
                  <motion.tr
                    key={device.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.015 }}
                    className={`border-b border-border/60 transition-colors hover:bg-secondary/40 ${
                      i % 2 === 1 ? 'bg-secondary/20' : ''
                    } ${device.isSuspicious ? 'bg-warning-muted/50' : ''}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          device.isSuspicious ? 'bg-warning-muted' : 'bg-primary-muted'
                        }`}>
                          <DeviceIcon type={device.type} className={`h-4 w-4 ${
                            device.isSuspicious ? 'text-warning' : 'text-primary'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{device.name}</p>
                          <p className="text-[11px] text-muted-foreground">{device.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-muted-foreground hidden md:table-cell">{device.ip}</td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-muted-foreground hidden lg:table-cell">{device.mac}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        device.status === 'Online'
                          ? 'bg-success-muted text-success'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          device.status === 'Online' ? 'bg-success' : 'bg-muted-foreground/50'
                        }`} />
                        {device.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right hidden sm:table-cell">
                      <p className="text-[12px] font-medium text-foreground">↓ {device.downloadSpeed}</p>
                      <p className="text-[11px] text-muted-foreground">↑ {device.uploadSpeed}</p>
                    </td>
                    <td className="px-5 py-3.5 text-right text-[12px] text-muted-foreground hidden md:table-cell">
                      {device.dataUsage.toLocaleString()} MB
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
