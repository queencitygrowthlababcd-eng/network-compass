export type DeviceType = 'Laptop' | 'Mobile' | 'IoT' | 'Desktop' | 'Tablet' | 'Unknown';
export type DeviceStatus = 'Online' | 'Offline';

export interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: DeviceType;
  status: DeviceStatus;
  uploadSpeed: number; // Mbps
  downloadSpeed: number; // Mbps
  dataUsage: number; // MB
  lastSeen: string;
  isSuspicious: boolean;
}

const deviceNames: Record<DeviceType, string[]> = {
  Laptop: ['MacBook Pro', 'ThinkPad X1', 'Dell XPS 15', 'HP Spectre', 'Surface Pro'],
  Mobile: ['iPhone 15', 'Galaxy S24', 'Pixel 8', 'OnePlus 12', 'iPhone 14'],
  IoT: ['Smart Thermostat', 'Ring Doorbell', 'Philips Hue Bridge', 'Echo Dot', 'Nest Camera'],
  Desktop: ['iMac Pro', 'Custom PC', 'Mac Studio', 'Dell OptiPlex'],
  Tablet: ['iPad Pro', 'Galaxy Tab S9', 'Surface Go'],
  Unknown: ['Unknown Device', 'Rogue AP', 'Unknown Client'],
};

function randomMac(): string {
  return Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':').toUpperCase();
}

function randomIp(): string {
  return `192.168.1.${Math.floor(Math.random() * 200) + 10}`;
}

export function generateMockDevices(): NetworkDevice[] {
  const types: DeviceType[] = ['Laptop', 'Laptop', 'Mobile', 'Mobile', 'Mobile', 'IoT', 'IoT', 'Desktop', 'Tablet', 'IoT', 'Laptop', 'Unknown', 'Mobile', 'IoT', 'Desktop'];
  
  return types.map((type, i) => {
    const names = deviceNames[type];
    const isSuspicious = type === 'Unknown';
    const isOnline = Math.random() > 0.2;
    return {
      id: `dev-${i.toString().padStart(3, '0')}`,
      name: names[i % names.length],
      ip: randomIp(),
      mac: randomMac(),
      type,
      status: isOnline ? 'Online' : 'Offline',
      uploadSpeed: isOnline ? Math.round(Math.random() * 50 * 10) / 10 : 0,
      downloadSpeed: isOnline ? Math.round(Math.random() * 150 * 10) / 10 : 0,
      dataUsage: Math.round(Math.random() * 5000),
      lastSeen: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      isSuspicious,
    };
  });
}

export const initialDevices = generateMockDevices();
