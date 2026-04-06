import { Monitor, Smartphone, Cpu, Tablet, Laptop, HelpCircle } from 'lucide-react';
import { DeviceType } from '@/data/mockDevices';

const iconMap: Record<DeviceType, typeof Monitor> = {
  Desktop: Monitor,
  Laptop: Laptop,
  Mobile: Smartphone,
  Tablet: Tablet,
  IoT: Cpu,
  Unknown: HelpCircle,
};

export function DeviceIcon({ type, className = 'h-4 w-4' }: { type: DeviceType; className?: string }) {
  const Icon = iconMap[type] || HelpCircle;
  return <Icon className={className} />;
}
