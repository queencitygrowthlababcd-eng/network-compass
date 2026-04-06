import { useNetwork } from '@/context/NetworkContext';
import { StatCard } from '@/components/StatCard';
import { TrafficChart } from '@/components/TrafficChart';
import { HealthPanel } from '@/components/HealthPanel';
import { DeviceIcon } from '@/components/DeviceIcon';
import { motion } from 'framer-motion';
import { Monitor, Wifi, WifiOff, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

export default function DashboardPage() {
  const { totalDevices, activeDevices, inactiveDevices, suspiciousDevices, totalUpload, totalDownload, health, devices } = useNetwork();

  const topDevices = devices
    .filter(d => d.status === 'Online')
    .sort((a, b) => b.downloadSpeed - a.downloadSpeed)
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Network overview and real-time monitoring</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Devices" value={totalDevices} icon={Monitor} variant="primary" index={0} />
        <StatCard title="Active" value={activeDevices} subtitle={`${inactiveDevices} offline`} icon={Wifi} variant="success" index={1} />
        <StatCard title="Download" value={`${totalDownload} Mbps`} icon={ArrowDown} variant="default" index={2} />
        <StatCard title="Upload" value={`${totalUpload} Mbps`} icon={ArrowUp} variant="default" index={3} />
      </div>

      {suspiciousDevices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 rounded-lg border border-danger/30 bg-danger/5 p-3"
        >
          <AlertTriangle className="h-4 w-4 text-danger shrink-0" />
          <p className="text-sm text-danger">
            {suspiciousDevices.length} suspicious device{suspiciousDevices.length > 1 ? 's' : ''} detected on network
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <HealthPanel />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-4 md:p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">Top Active Devices</h3>
        <div className="space-y-2">
          {topDevices.map(device => (
            <div key={device.id} className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <DeviceIcon type={device.type} className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{device.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{device.ip}</p>
              </div>
              <div className="text-right text-xs">
                <p className="text-foreground">↓ {device.downloadSpeed} Mbps</p>
                <p className="text-muted-foreground">↑ {device.uploadSpeed} Mbps</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
