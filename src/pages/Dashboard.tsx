import { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import UsageChart from "@/components/UsageChart";
import ApplianceBreakdown from "@/components/ApplianceBreakdown";
import EnergyTipCard from "@/components/EnergyTipCard";
import EnergyScoreGauge from "@/components/EnergyScoreGauge";
import {
  generateDailyUsage, getApplianceBreakdown, getMonthlyBill,
  getEnergyScore, energyTips, getNeighbourhoodComparison,
} from "@/lib/energyData";
import { DollarSign, Zap, Users, Flame, ThumbsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const usageData = generateDailyUsage(30);
const bill = getMonthlyBill(usageData);
const appliances = getApplianceBreakdown();
const score = getEnergyScore();
const neighbourhood = getNeighbourhoodComparison();

export default function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<"appliance" | "household">("appliance");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your energy overview at a glance</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Predicted Bill"
          value={`$${bill.predicted.toFixed(2)}`}
          subtitle="This month"
          icon={DollarSign}
          trend={{ value: -8, label: "Saved compared to last month" }}
          status="green"
          color="green"
        />
        <DashboardCard
          title="Total Usage"
          value={`${usageData.reduce((s, d) => s + d.totalKwh, 0).toFixed(0)} kWh`}
          subtitle="Last 30 days"
          icon={Zap}
          trend={{ value: 65, label: "saved more than the average!" }}
          status="yellow"
          color="yellow"
        />
        <DashboardCard
          title="Comparison Around You"
          value={`Top ${neighbourhood.percentile}%`}
          subtitle={`${neighbourhood.userKwh} vs ${neighbourhood.avgKwh} kWh avg`}
          icon={Users}
          trend={{ value: 65, label: "saved more than the average!" }}
          status="green"
          color="green"
        />
        <DashboardCard
          title="Daily Streak"
          value={`${usageData[0].streak}`}
          subtitle="Maintaining under target"
          icon={Flame}
          status="green"
          color="green"
          trend={{ value: 100, label: "Effort. Keep up the good work!" }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList className="grid w-full max-w-md grid-cols-2 mt-4 ml-4">
                <TabsTrigger value="appliance">By Appliance</TabsTrigger>
                <TabsTrigger value="household">Whole Household</TabsTrigger>
              </TabsList>

              <TabsContent value="appliance">
                <div className="">
                  <ApplianceBreakdown data={appliances} />
                </div>
              </TabsContent>
              <TabsContent value="household">
                <div className="">
                  <UsageChart />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        <EnergyScoreGauge score={score} />
      </div>
    </div>
  );
}
