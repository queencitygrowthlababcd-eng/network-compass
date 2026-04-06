import { motion } from 'framer-motion';
import { useNetwork } from '@/context/NetworkContext';
import { Activity, Zap, Wifi } from 'lucide-react';

export function HealthPanel() {
  const { health } = useNetwork();

  const metrics = [
    {
      label: 'Latency',
      value: `${health.latency}ms`,
      icon: Activity,
      pct: Math.min(health.latency, 100),
      color: health.latency < 30 ? 'success' : health.latency < 80 ? 'warning' : 'danger',
    },
    {
      label: 'Packet Loss',
      value: `${health.packetLoss}%`,
      icon: Zap,
      pct: Math.min(health.packetLoss * 20, 100),
      color: health.packetLoss < 1 ? 'success' : health.packetLoss < 3 ? 'warning' : 'danger',
    },
    {
      label: 'Signal Strength',
      value: `${health.signalStrength}%`,
      icon: Wifi,
      pct: health.signalStrength,
      color: health.signalStrength > 70 ? 'success' : health.signalStrength > 50 ? 'warning' : 'danger',
    },
  ] as const;

  const barColor = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };

  const textColor = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  };

  const bgColor = {
    success: 'bg-success-muted',
    warning: 'bg-warning-muted',
    danger: 'bg-danger-muted',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <h3 className="text-[14px] font-semibold text-foreground mb-5">Network Health</h3>
      <div className="space-y-5">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-7 w-7 items-center justify-center rounded-md ${bgColor[m.color]}`}>
                  <m.icon className={`h-3.5 w-3.5 ${textColor[m.color]}`} />
                </div>
                <span className="text-[13px] font-medium text-foreground">{m.label}</span>
              </div>
              <span className={`text-[13px] font-semibold ${textColor[m.color]}`}>{m.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColor[m.color]}`}
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
