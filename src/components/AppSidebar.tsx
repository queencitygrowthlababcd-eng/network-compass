import { LayoutDashboard, Monitor, Bell, Settings, Wifi } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useNetwork } from '@/context/NetworkContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Devices', url: '/devices', icon: Monitor },
  { title: 'Alerts', url: '/alerts', icon: Bell },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { unreadAlerts, health } = useNetwork();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Wifi className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-foreground">NetWatch</h1>
              <p className="text-xs text-muted-foreground">LAN Monitor</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      {!collapsed && item.title === 'Alerts' && unreadAlerts > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-bold text-danger-foreground">
                          {unreadAlerts}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`h-2 w-2 rounded-full ${
                  health.status === 'Good' ? 'bg-success status-pulse' :
                  health.status === 'Moderate' ? 'bg-warning status-pulse' :
                  'bg-danger status-pulse'
                }`} />
                <span className="text-xs font-medium text-foreground">Network {health.status}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Latency: {health.latency}ms · Loss: {health.packetLoss}%
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
