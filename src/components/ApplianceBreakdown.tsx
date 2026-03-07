import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplianceUsage } from "@/lib/energyData";
import { Snowflake, Flame, Refrigerator, WashingMachine, Lightbulb, Plug, ListOrdered, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const IconMap: Record<string, any> = {
  Snowflake: Snowflake,
  Flame: Flame,
  Refrigerator: Refrigerator,
  WashingMachine: WashingMachine,
  Lightbulb: Lightbulb,
  Plug: Plug,
};

interface ApplianceBreakdownProps {
  data: ApplianceUsage[];
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as ApplianceUsage;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-sm">{d.name}</p>
      <p className="text-sm">{d.kwh} kWh ({d.percentage}%)</p>
    </div>
  );
}

export default function ApplianceBreakdown({ data }: ApplianceBreakdownProps) {
  const topThree = [...data].sort((a, b) => b.kwh - a.kwh).slice(0, 3);

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Appliance Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          <div className="h-[320px] flex flex-col items-center">
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="kwh"
                  nameKey="name"
                  stroke="none"
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 w-full">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {data.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-[11px] font-medium text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start space-y-5 pt-2">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-primary" />
                Consumption Leaderboard
              </h4>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Top Contributors</span>
            </div>
            <div className="space-y-4">
              {topThree.map((app, index) => {
                const Icon = IconMap[app.icon] || Plug;

                return (
                  <div
                    key={app.name}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-xs font-bold text-muted-foreground/50 w-4">
                        {index + 1}.
                      </div>
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg text-white/90 shadow-sm"
                        style={{ backgroundColor: app.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground tracking-tight">{app.name}</p>
                        <p className="text-[11px] text-muted-foreground">Primary household load</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{app.kwh} <span className="text-[10px] font-normal text-muted-foreground">kWh</span></p>
                      <div className="flex items-center justify-end gap-1.5 text-xs font-medium mt-0.5">
                        <Zap className="w-3 h-3 text-energy-yellow fill-energy-yellow" />
                        <span>{app.percentage}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 mt-auto">
              <p className="text-[11px] text-muted-foreground italic leading-relaxed border-t pt-4">
                These three appliances account for {topThree.reduce((acc, curr) => acc + curr.percentage, 0)}% of your total energy spend. Consider optimizing usage during peak hours.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
