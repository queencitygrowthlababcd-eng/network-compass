export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertType = 'unknown_device' | 'bandwidth_spike' | 'device_offline' | 'high_latency';

export interface NetworkAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  deviceName?: string;
  timestamp: string;
  read: boolean;
}

const alertTemplates: { type: AlertType; severity: AlertSeverity; messages: string[] }[] = [
  { type: 'unknown_device', severity: 'critical', messages: ['Unknown device connected from IP 192.168.1.{ip}', 'Rogue access point detected on network'] },
  { type: 'bandwidth_spike', severity: 'warning', messages: ['Bandwidth spike detected: {speed} Mbps download', 'Unusual upload activity: {speed} Mbps'] },
  { type: 'device_offline', severity: 'info', messages: ['{device} has gone offline', '{device} disconnected from network'] },
  { type: 'high_latency', severity: 'warning', messages: ['Network latency exceeds {ms}ms threshold', 'Packet loss detected: {loss}%'] },
];

export function generateAlert(): NetworkAlert {
  const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
  const msg = template.messages[Math.floor(Math.random() * template.messages.length)]
    .replace('{ip}', String(Math.floor(Math.random() * 200) + 10))
    .replace('{speed}', String(Math.floor(Math.random() * 500) + 100))
    .replace('{device}', ['MacBook Pro', 'iPhone 15', 'Smart Thermostat', 'Echo Dot'][Math.floor(Math.random() * 4)])
    .replace('{ms}', String(Math.floor(Math.random() * 200) + 50))
    .replace('{loss}', String((Math.random() * 5).toFixed(1)));

  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: template.type,
    severity: template.severity,
    message: msg,
    timestamp: new Date().toISOString(),
    read: false,
  };
}

export function generateInitialAlerts(): NetworkAlert[] {
  return Array.from({ length: 8 }, (_, i) => {
    const alert = generateAlert();
    alert.id = `alert-init-${i}`;
    alert.timestamp = new Date(Date.now() - (i * 300000)).toISOString();
    alert.read = i > 3;
    return alert;
  });
}
