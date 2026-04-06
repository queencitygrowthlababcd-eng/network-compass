import { useNetwork } from '@/context/NetworkContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, ShieldAlert, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const severityConfig = {
  critical: { icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
};

export default function AlertsPage() {
  const { alerts, markAlertRead, markAllAlertsRead, unreadAlerts } = useNetwork();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Alerts</h2>
          <p className="text-sm text-muted-foreground">{unreadAlerts} unread alert{unreadAlerts !== 1 ? 's' : ''}</p>
        </div>
        {unreadAlerts > 0 && (
          <Button onClick={markAllAlertsRead} variant="outline" size="sm" className="gap-2">
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {alerts.map((alert, i) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => markAlertRead(alert.id)}
                className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  alert.read
                    ? 'border-border bg-card/50 opacity-60'
                    : `${config.border} bg-card hover:bg-secondary/50`
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${config.color}`}>
                      {alert.severity}
                    </span>
                    {!alert.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
