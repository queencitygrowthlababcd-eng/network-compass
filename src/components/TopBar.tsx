import { SidebarTrigger } from '@/components/ui/sidebar';
import { useNetwork } from '@/context/NetworkContext';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/devices': 'Devices',
  '/alerts': 'Alerts',
  '/settings': 'Settings',
};

export function TopBar() {
  const { unreadAlerts } = useNetwork();
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] || 'NetWatch';

  return (
    <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
        <span className="text-[15px] font-semibold text-foreground hidden sm:block">{title}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-8 w-56 pl-8 text-[13px] bg-secondary/60 border-border rounded-lg focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>

        <button
          onClick={() => navigate('/alerts')}
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-danger-foreground">
              {unreadAlerts}
            </span>
          )}
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          JD
        </div>
      </div>
    </header>
  );
}
