import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  index?: number;
}

const iconVariants = {
  default: 'bg-secondary text-muted-foreground',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
  primary: 'bg-primary-muted text-primary',
};

export function StatCard({ title, value, subtitle, icon: Icon, variant = 'default', index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card card-hover"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
          {subtitle && <p className="text-[12px] text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconVariants[variant]}`}>
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
    </motion.div>
  );
}
