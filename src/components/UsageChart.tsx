import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { getUsageData } from "@/lib/energyData";

export default function UsageChart() {
  const [view, setView] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const { data, benchmark } = getUsageData(view);

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Energy Consumption</CardTitle>
        <div className="flex bg-muted rounded-lg p-1">
          {(["weekly", "monthly", "yearly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${view === v
                ? "bg-background shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 110, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                unit=" kWh"
                axisLine={false}
                tickLine={false}
                domain={[view === "yearly" ? 250 : 10, 'auto']}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <ReferenceLine
                y={benchmark}
                stroke="#94a3b8"
                strokeDasharray="5 5"
                strokeWidth={2}
              >
                <Label
                  value="National Average"
                  position="right"
                  fill="#94a3b8"
                  fontSize={12}
                  fontWeight="bold"
                />
              </ReferenceLine>
              <Bar
                dataKey="kwh"
                name="Usage"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                barSize={view === "monthly" ? 10 : 40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
