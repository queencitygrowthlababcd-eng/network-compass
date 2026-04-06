import { useState, useEffect, useCallback } from 'react';
import { NetworkDevice, initialDevices } from '@/data/mockDevices';
import { NetworkAlert, generateAlert, generateInitialAlerts } from '@/data/mockAlerts';

export interface TrafficDataPoint {
  time: string;
  upload: number;
  download: number;
}

export interface NetworkHealth {
  latency: number;
  packetLoss: number;
  signalStrength: number;
  status: 'Good' | 'Moderate' | 'Poor';
}

function getNetworkStatus(latency: number, packetLoss: number): 'Good' | 'Moderate' | 'Poor' {
  if (latency < 30 && packetLoss < 1) return 'Good';
  if (latency < 80 && packetLoss < 3) return 'Moderate';
  return 'Poor';
}

export function useNetworkSimulation() {
  const [devices, setDevices] = useState<NetworkDevice[]>(initialDevices);
  const [alerts, setAlerts] = useState<NetworkAlert[]>(generateInitialAlerts());
  const [trafficHistory, setTrafficHistory] = useState<TrafficDataPoint[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (20 - i) * 3000).toLocaleTimeString(),
      upload: Math.round(Math.random() * 80 + 10),
      download: Math.round(Math.random() * 200 + 50),
    }));
  });
  const [health, setHealth] = useState<NetworkHealth>({
    latency: 12,
    packetLoss: 0.2,
    signalStrength: 85,
    status: 'Good',
  });

  // Simulate traffic updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const upload = Math.round(Math.random() * 80 + 10);
      const download = Math.round(Math.random() * 200 + 50);

      setTrafficHistory(prev => [...prev.slice(-29), { time: now, upload, download }]);

      // Update device speeds randomly
      setDevices(prev =>
        prev.map(d => d.status === 'Online' ? {
          ...d,
          uploadSpeed: Math.round(Math.random() * 50 * 10) / 10,
          downloadSpeed: Math.round(Math.random() * 150 * 10) / 10,
          dataUsage: d.dataUsage + Math.round(Math.random() * 10),
        } : d)
      );

      // Update health
      const latency = Math.round(Math.random() * 60 + 5);
      const packetLoss = Math.round(Math.random() * 4 * 10) / 10;
      const signalStrength = Math.round(Math.random() * 30 + 65);
      setHealth({
        latency,
        packetLoss,
        signalStrength,
        status: getNetworkStatus(latency, packetLoss),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate random alerts every 8-15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = generateAlert();
      setAlerts(prev => [newAlert, ...prev].slice(0, 50));
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  // Randomly toggle device status every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => {
        const idx = Math.floor(Math.random() * prev.length);
        const device = prev[idx];
        const newStatus = device.status === 'Online' ? 'Offline' : 'Online';
        const updated = [...prev];
        updated[idx] = {
          ...device,
          status: newStatus,
          uploadSpeed: newStatus === 'Online' ? Math.round(Math.random() * 50 * 10) / 10 : 0,
          downloadSpeed: newStatus === 'Online' ? Math.round(Math.random() * 150 * 10) / 10 : 0,
          lastSeen: new Date().toISOString(),
        };
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const markAlertRead = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  }, []);

  const totalDevices = devices.length;
  const activeDevices = devices.filter(d => d.status === 'Online').length;
  const inactiveDevices = totalDevices - activeDevices;
  const suspiciousDevices = devices.filter(d => d.isSuspicious);
  const unreadAlerts = alerts.filter(a => !a.read).length;

  const totalUpload = trafficHistory.length > 0 ? trafficHistory[trafficHistory.length - 1].upload : 0;
  const totalDownload = trafficHistory.length > 0 ? trafficHistory[trafficHistory.length - 1].download : 0;

  return {
    devices,
    alerts,
    trafficHistory,
    health,
    totalDevices,
    activeDevices,
    inactiveDevices,
    suspiciousDevices,
    unreadAlerts,
    totalUpload,
    totalDownload,
    markAlertRead,
    markAllAlertsRead,
  };
}
