import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [unknownDeviceAlerts, setUnknownDeviceAlerts] = useState(true);
  const [bandwidthAlerts, setBandwidthAlerts] = useState(true);
  const [refreshRate, setRefreshRate] = useState('3');

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Configure your monitoring preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
          <h3 className="text-[14px] font-semibold text-foreground">Notifications</h3>
          
          <div className="flex items-center justify-between py-1">
            <Label htmlFor="notifications" className="text-[13px] text-muted-foreground font-normal">Enable notifications</Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between py-1">
            <Label htmlFor="unknown" className="text-[13px] text-muted-foreground font-normal">Unknown device alerts</Label>
            <Switch id="unknown" checked={unknownDeviceAlerts} onCheckedChange={setUnknownDeviceAlerts} />
          </div>
          <div className="flex items-center justify-between py-1">
            <Label htmlFor="bandwidth" className="text-[13px] text-muted-foreground font-normal">Bandwidth spike alerts</Label>
            <Switch id="bandwidth" checked={bandwidthAlerts} onCheckedChange={setBandwidthAlerts} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
          <h3 className="text-[14px] font-semibold text-foreground">Monitoring</h3>
          <div className="space-y-2">
            <Label htmlFor="refresh" className="text-[13px] text-muted-foreground font-normal">Refresh interval (seconds)</Label>
            <Input
              id="refresh"
              type="number"
              value={refreshRate}
              onChange={e => setRefreshRate(e.target.value)}
              className="w-32 text-[13px] bg-card border-border shadow-soft"
              min="1"
              max="30"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
          <h3 className="text-[14px] font-semibold text-foreground">Network</h3>
          <div className="space-y-2">
            <Label className="text-[13px] text-muted-foreground font-normal">Network Name</Label>
            <Input defaultValue="Office-LAN-5G" className="text-[13px] bg-card border-border shadow-soft" />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-muted-foreground font-normal">Gateway IP</Label>
            <Input defaultValue="192.168.1.1" className="text-[13px] bg-card border-border shadow-soft font-mono" />
          </div>
        </div>

        <Button onClick={handleSave} size="sm" className="shadow-sm text-[13px]">
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}
