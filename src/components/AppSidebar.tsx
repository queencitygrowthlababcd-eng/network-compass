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
  SidebarFooter,
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
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Wifi className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-[15px] font-semibold tracking-tight text-foreground">NetWatch</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
                      activeClassName="bg-primary-muted text-primary"
                    >
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      {!collapsed && item.title === 'Alerts' && unreadAlerts > 0 && (
                        <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-danger-foreground">
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
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="px-4 py-4">
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className={`h-2 w-2 rounded-full ${
                health.status === 'Good' ? 'bg-success' :
                health.status === 'Moderate' ? 'bg-warning' : 'bg-danger'
              }`} />
              <span className="text-xs font-medium text-foreground">Network {health.status}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {health.latency}ms latency · {health.packetLoss}% loss
            </p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
