import { motion } from 'framer-motion';
import { useNetwork } from '@/context/NetworkContext';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

export function TrafficChart() {
  const { trafficHistory } = useNetwork();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-4 md:p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Bandwidth Usage</h3>
          <p className="text-xs text-muted-foreground">Real-time upload/download</p>
        </div>
        <div className="flex gap-4 text-xs">
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
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trafficHistory}>
            <defs>
              <linearGradient id="downloadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} tickLine={false} axisLine={false} unit=" Mbps" />
            <Tooltip
              contentStyle={{ background: 'hsl(222, 40%, 9%)', border: '1px solid hsl(222, 30%, 16%)', borderRadius: '8px', fontSize: '12px' }}
              labelStyle={{ color: 'hsl(210, 40%, 93%)' }}
            />
            <Area type="monotone" dataKey="download" stroke="hsl(210, 100%, 56%)" fill="url(#downloadGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="upload" stroke="hsl(142, 71%, 45%)" fill="url(#uploadGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
