import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyUsage } from "@/lib/energyData";

interface UsageChartProps {
  data: DailyUsage[];
}

const statusColor = {
  green: "hsl(145, 63%, 42%)",
  yellow: "hsl(45, 93%, 47%)",
  red: "hsl(0, 72%, 51%)",
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as DailyUsage;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-sm">Total: {d.totalKwh} kWh</p>
      <p className="text-sm">Peak: {d.peakKwh} kWh</p>
      <p className="text-sm">Off-Peak: {d.offPeakKwh} kWh</p>
      <p className="text-sm font-semibold mt-1">Cost: ${d.cost.toFixed(2)}</p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor[d.status] }} />
        <span className="text-xs capitalize">{d.status === "green" ? "Efficient" : d.status === "yellow" ? "Average" : "High"}</span>
      </div>
    </div>
  );
}

export default function UsageChart({ data }: UsageChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    date: d.date.slice(5), // MM-DD
  }));

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Daily Energy Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(220, 70%, 45%)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="offPeakGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(175, 60%, 42%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(175, 60%, 42%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit=" kWh" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="peakKwh" name="Peak" stroke="hsl(220, 70%, 45%)" fill="url(#peakGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="offPeakKwh" name="Off-Peak" stroke="hsl(175, 60%, 42%)" fill="url(#offPeakGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
