import { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import UsageChart from "@/components/UsageChart";
import ApplianceBreakdown from "@/components/ApplianceBreakdown";
import ChallengeCard from "@/components/ChallengeCard";
import {
  generateDailyUsage, applianceList, getMonthlyBill,
  getEnergyScore, energyTips, getNeighbourhoodComparison,
  INITIAL_CHALLENGES, experienceLevel, experiencePoints
} from "@/lib/energyData";
import { DollarSign, Zap, Users, Flame, ThumbsUp, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Challenge } from '@/lib/energyData';
import { useNavigate } from "react-router-dom";

const usageData = generateDailyUsage(30);
const bill = getMonthlyBill(usageData);
const score = getEnergyScore();
const neighbourhood = getNeighbourhoodComparison();

export default function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<"appliance" | "household">("appliance");

  return (
    <div className="space-y-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[480px]">
        <div className="lg:col-span-2 h-full">
          <Card className="shadow-card h-full flex flex-col">
            <Tabs value={view} onValueChange={(v) => setView(v as any)} className="flex-1 flex flex-col">
              <TabsList className="grid w-full max-w-md grid-cols-2 mt-4 ml-4 shrink-0">
                <TabsTrigger value="appliance">By Appliance</TabsTrigger>
                <TabsTrigger value="household">Whole Household</TabsTrigger>
              </TabsList>

              <TabsContent value="appliance" className="flex-1 min-h-0 overflow-y-auto">
                <div className="p-4">
                  <ApplianceBreakdown />
                </div>
              </TabsContent>
              <TabsContent value="household" className="flex-1 min-h-0">
                <div className="p-4">
                  <UsageChart />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        {/* Suggested Optimisations */}
        <Card className="shadow-card flex flex-col h-full min-h-0">
          <CardHeader className="flex-none">
            <CardTitle className="text-lg flex items-center justify-between">
              Latest Challenges
              <Button
                variant="default"
                size="sm"
                className="gap-1 h-8 pl-4 transition-colors"
                onClick={() => navigate('/challenge')}
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {INITIAL_CHALLENGES.map((t, i) => (
              <ChallengeCard key={i} title={t.title} description={t.description} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
