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
      color: health.latency < 30 ? 'success' : health.latency < 80 ? 'warning' : 'danger',
    },
    {
      label: 'Packet Loss',
      value: `${health.packetLoss}%`,
      icon: Zap,
      color: health.packetLoss < 1 ? 'success' : health.packetLoss < 3 ? 'warning' : 'danger',
    },
    {
      label: 'Signal Strength',
      value: `${health.signalStrength}%`,
      icon: Wifi,
      color: health.signalStrength > 70 ? 'success' : health.signalStrength > 50 ? 'warning' : 'danger',
    },
  ] as const;

  const colorMap = {
    success: { dot: 'bg-success', text: 'text-success', bg: 'bg-success/10' },
    warning: { dot: 'bg-warning', text: 'text-warning', bg: 'bg-warning/10' },
    danger: { dot: 'bg-danger', text: 'text-danger', bg: 'bg-danger/10' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-xl border border-border bg-card p-4 md:p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Network Health</h3>
      <div className="space-y-4">
        {metrics.map((m) => {
          const c = colorMap[m.color];
          return (
            <div key={m.label} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>
                <m.icon className={`h-4 w-4 ${c.text}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <span className={`text-sm font-semibold ${c.text}`}>{m.value}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-secondary">
                  <motion.div
                    className={`h-full rounded-full ${c.dot}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: m.label === 'Signal Strength'
                        ? `${health.signalStrength}%`
                        : m.label === 'Latency'
                        ? `${Math.min(health.latency, 100)}%`
                        : `${Math.min(health.packetLoss * 20, 100)}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
