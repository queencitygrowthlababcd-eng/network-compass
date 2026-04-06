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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure monitoring preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm text-muted-foreground">Enable notifications</Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="unknown" className="text-sm text-muted-foreground">Unknown device alerts</Label>
            <Switch id="unknown" checked={unknownDeviceAlerts} onCheckedChange={setUnknownDeviceAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bandwidth" className="text-sm text-muted-foreground">Bandwidth spike alerts</Label>
            <Switch id="bandwidth" checked={bandwidthAlerts} onCheckedChange={setBandwidthAlerts} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Monitoring</h3>
          <div className="space-y-2">
            <Label htmlFor="refresh" className="text-sm text-muted-foreground">Refresh interval (seconds)</Label>
            <Input
              id="refresh"
              type="number"
              value={refreshRate}
              onChange={e => setRefreshRate(e.target.value)}
              className="w-32 bg-secondary border-border"
              min="1"
              max="30"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Network</h3>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Network Name</Label>
            <Input defaultValue="Office-LAN-5G" className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Gateway IP</Label>
            <Input defaultValue="192.168.1.1" className="bg-secondary border-border font-mono" />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full sm:w-auto">
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}
