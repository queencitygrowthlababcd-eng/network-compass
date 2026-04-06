import { useNetwork } from '@/context/NetworkContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, ShieldAlert, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const severityConfig = {
  critical: { icon: ShieldAlert, text: 'text-danger', bg: 'bg-danger-muted', border: 'border-danger/15' },
  warning: { icon: AlertTriangle, text: 'text-warning', bg: 'bg-warning-muted', border: 'border-warning/15' },
  info: { icon: Info, text: 'text-primary', bg: 'bg-primary-muted', border: 'border-primary/15' },
};

export default function AlertsPage() {
  const { alerts, markAlertRead, markAllAlertsRead, unreadAlerts } = useNetwork();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-foreground tracking-tight">Alerts</h1>
          <p className="text-[13px] text-muted-foreground mt-1">{unreadAlerts} unread alert{unreadAlerts !== 1 ? 's' : ''}</p>
        </div>
        {unreadAlerts > 0 && (
          <Button onClick={markAllAlertsRead} variant="outline" size="sm" className="gap-2 text-[13px] shadow-soft">
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
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.015 }}
                onClick={() => markAlertRead(alert.id)}
                className={`flex items-start gap-3.5 rounded-xl border p-4 cursor-pointer transition-all duration-150 ${
                  alert.read
                    ? 'border-border bg-card opacity-50 hover:opacity-70'
                    : `${config.border} bg-card shadow-card hover:shadow-card-hover`
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.text}`}>
                      {alert.severity}
                    </span>
                    {!alert.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="text-[13px] text-foreground mt-1">{alert.message}</p>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.tr>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
