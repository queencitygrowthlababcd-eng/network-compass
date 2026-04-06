import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  index?: number;
}

const variantClasses = {
  default: 'bg-card border-border',
  success: 'bg-card border-success/20',
  warning: 'bg-card border-warning/20',
  danger: 'bg-card border-danger/20',
  primary: 'bg-card border-primary/20',
};

const iconClasses = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  primary: 'bg-primary/10 text-primary',
};

export function StatCard({ title, value, subtitle, icon: Icon, variant = 'default', index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`rounded-xl border p-4 md:p-5 ${variantClasses[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClasses[variant]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}
