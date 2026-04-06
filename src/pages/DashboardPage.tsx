import { useNetwork } from '@/context/NetworkContext';
import { StatCard } from '@/components/StatCard';
import { TrafficChart } from '@/components/TrafficChart';
import { HealthPanel } from '@/components/HealthPanel';
import { DeviceIcon } from '@/components/DeviceIcon';
import { motion } from 'framer-motion';
import { Monitor, Wifi, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { totalDevices, activeDevices, inactiveDevices, suspiciousDevices, totalUpload, totalDownload, devices } = useNetwork();

  const topDevices = devices
    .filter(d => d.status === 'Online')
    .sort((a, b) => b.downloadSpeed - a.downloadSpeed)
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Network overview and real-time monitoring</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Devices" value={totalDevices} icon={Monitor} variant="primary" index={0} />
        <StatCard title="Active Devices" value={activeDevices} subtitle={`${inactiveDevices} offline`} icon={Wifi} variant="success" index={1} />
        <StatCard title="Download" value={`${totalDownload} Mbps`} icon={ArrowDown} variant="default" index={2} />
        <StatCard title="Upload" value={`${totalUpload} Mbps`} icon={ArrowUp} variant="default" index={3} />
      </div>

      {suspiciousDevices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 rounded-xl bg-warning-muted border border-warning/20 px-4 py-3"
        >
          <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
          <p className="text-[13px] font-medium text-warning-foreground">
            {suspiciousDevices.length} suspicious device{suspiciousDevices.length > 1 ? 's' : ''} detected on your network
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <HealthPanel />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl border border-border bg-card p-5 shadow-card"
      >
        <h3 className="text-[14px] font-semibold text-foreground mb-4">Top Active Devices</h3>
        <div className="space-y-1.5">
          {topDevices.map((device, i) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="flex items-center gap-3.5 rounded-lg px-3.5 py-3 transition-colors hover:bg-secondary/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted">
                <DeviceIcon type={device.type} className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">{device.name}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{device.ip}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-medium text-foreground">↓ {device.downloadSpeed} Mbps</p>
                <p className="text-[11px] text-muted-foreground">↑ {device.uploadSpeed} Mbps</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
