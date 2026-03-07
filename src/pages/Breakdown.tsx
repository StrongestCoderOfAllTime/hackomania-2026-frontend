import { useState } from "react";
import ApplianceBreakdown from "@/components/ApplianceBreakdown";
import EnergyTipCard from "@/components/EnergyTipCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getApplianceBreakdown, getHourlyPattern, energyTips } from "@/lib/energyData";

const appliances = getApplianceBreakdown();
const hourlyData = getHourlyPattern();

export default function Breakdown() {
  const [view, setView] = useState<"appliance" | "household">("appliance");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Energy Breakdown</h1>
        <p className="text-muted-foreground mt-1">Understand where your energy goes</p>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="appliance">By Appliance</TabsTrigger>
          <TabsTrigger value="household">Whole Household</TabsTrigger>
        </TabsList>

        <TabsContent value="appliance" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ApplianceBreakdown data={appliances} />
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Hourly Usage Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
                      <XAxis dataKey="hour" tick={{ fontSize: 13 }} label={{ value: "Hour", position: "bottom", offset: -8 }} />
                      <YAxis tick={{ fontSize: 11 }} unit=" kWh" />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: "1px solid hsl(223, 86%, 11%)" }}
                        formatter={(value: number) => [`${value} kWh`, "Usage"]}
                        labelFormatter={(hour: number) => `${hour}:00`}
                      />
                      <ReferenceLine y={0.5} stroke="hsl(220, 70%, 45%)" strokeDasharray="5 5" />
                      <Bar dataKey="kwh" fill="hsl(220, 70%, 45%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground mt-2">* Average Singaporean Household's Hourly Electrical Usage</p>
              </CardContent>
            </Card>
          </div>

          {/* Appliance detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliances.map((a) => (
              <Card key={a.name} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }} />
                    <h4 className="font-semibold">{a.name}</h4>
                  </div>
                  <p className="text-2xl font-bold">{a.kwh} kWh</p>
                  <p className="text-sm text-muted-foreground">{a.percentage}% of total usage</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="household" className="mt-4 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Household Energy Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">473</p>
                  <p className="text-sm text-muted-foreground">kWh this month</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">$155</p>
                  <p className="text-sm text-muted-foreground">Est. monthly bill</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">15.8</p>
                  <p className="text-sm text-muted-foreground">kWh/day avg</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-energy-green">-8%</p>
                  <p className="text-sm text-muted-foreground">vs last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Optimisation Tips</h3>
        {energyTips.slice(0, 3).map((t, i) => (
          <EnergyTipCard key={i} tip={t.tip} savings={t.savings} />
        ))}
      </div>
    </div>
  );
}
