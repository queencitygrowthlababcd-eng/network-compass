import { motion } from 'framer-motion';
import { useNetwork } from '@/context/NetworkContext';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function TrafficChart() {
  const { trafficHistory } = useNetwork();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground">Bandwidth Usage</h3>
          <p className="text-[12px] text-muted-foreground mt-0.5">Real-time upload & download speed</p>
        </div>
        <div className="flex gap-5 text-[12px]">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Download</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Upload</span>
          </div>
        </div>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trafficHistory}>
            <defs>
              <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ulGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={false}
              width={50}
              tickFormatter={v => `${v}`}
            />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '10px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                padding: '10px 14px',
              }}
              labelStyle={{ color: '#374151', fontWeight: 600 }}
              itemStyle={{ color: '#6B7280' }}
              formatter={(value: number) => [`${value} Mbps`]}
            />
            <Area type="monotone" dataKey="download" stroke="#2563EB" fill="url(#dlGrad)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="upload" stroke="#22C55E" fill="url(#ulGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
