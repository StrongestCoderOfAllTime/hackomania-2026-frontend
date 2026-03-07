import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Zap,
  Utensils,
  Smile,
  TrendingUp,
  Award,
  Gift,
  Ticket,
  Sparkles,
  RefreshCcw,
  BicepsFlexed,
  Star
} from "lucide-react";
import { experienceLevel, experiencePoints } from "@/lib/energyData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import ollieImage from "@/assests/ollio-removebg-preview.png";

const REWARDS = [
  {
    title: "$5 SP Bill Rebate",
    description: "Direct deduction from your next utility bill. Level 10 requirement.",
    points: 1500,
    icon: Ticket,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "$10 Grab Voucher",
    description: "Valid for GrabFood or GrabRide. Digital code delivered instantly.",
    points: 2500,
    icon: Gift,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "Eco Coffee Treat",
    description: "Redeem for a small coffee at any partner green café outlet.",
    points: 800,
    icon: Utensils,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Smart Plug (v2)",
    description: "Automate your devices and save more energy. Shipped to home.",
    points: 5000,
    icon: Zap,
    color: "bg-purple-100 text-purple-600"
  }
];


export default function Mascot() {
  const [hunger, setHunger] = useState(65);
  const [happiness, setHappiness] = useState(80);
  const [energy, setEnergy] = useState(45);
  const [isFeeding, setIsFeeding] = useState(false);
  const [points, setPoints] = useState(experiencePoints);

  const handleFeed = () => {
    if (hunger >= 100) {
      toast.info("Ollie is full!");
      return;
    }
    setIsFeeding(true);
    setTimeout(() => {
      setHunger(prev => Math.min(100, prev + 15));
      setHappiness(prev => Math.min(100, prev + 5));
      setIsFeeding(false);
      toast.success("Ollie enjoyed the eco-treat!", {
        icon: <Utensils className="h-4 w-4" />
      });
    }, 1000);
  };

  const handlePlay = () => {
    if (energy <= 10) {
      toast.warning("Ollie is too tired to play!");
      return;
    }
    setHappiness(prev => Math.min(100, prev + 10));
    setEnergy(prev => Math.max(0, prev - 15));
    toast.success("Ollie is having fun!", {
      icon: <Smile className="h-4 w-4" />
    });
  };

  const handleClaimReward = (reward: typeof REWARDS[0]) => {
    if (points >= reward.points) {
      setPoints(prev => prev - reward.points);
      toast.success(`Succesfully claimed ${reward.title}!`, {
        description: "Check your email/profile for the reward details.",
        icon: <reward.icon className="h-4 w-4 text-energy-green" />
      });
    } else {
      toast.error("Not enough points!");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Ollie's Nest</h1>
          <p className="text-muted-foreground mt-1">Care for your energy companion to earn rewards</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 bg-energy-green/5 text-energy-green border-energy-green/20">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Level {experienceLevel} Companion
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Mascot View - Left 2/3 */}
        <Card className="lg:col-span-2 shadow-card border-0 overflow-hidden bg-slate-50/50 flex flex-col h-full">
          <CardContent className="p-0 flex flex-col items-center justify-center flex-1 relative min-h-[500px] lg:min-h-0">
            {/* Background pattern/gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-energy-green/5 pointer-events-none" />

            <div className={cn(
              "relative z-10 transition-all duration-500",
              isFeeding && "scale-110",
              energy < 20 && "opacity-80 grayscale-[20%]"
            )}>
              <img
                src={ollieImage}
                alt="Ollie the Energy Owl"
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />

              {/* Animation overlays for feeding */}
              {isFeeding && (
                <div className="absolute top-0 right-0 animate-bounce">
                  <Utensils className="h-10 w-10 text-energy-green fill-energy-green/20" />
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-4 z-10 pb-8">
              <Button
                onClick={handleFeed}
                disabled={isFeeding}
                className="bg-energy-green hover:bg-energy-green/90 text-white gap-2 shadow-lg"
              >
                <Utensils className="h-4 w-4" />
                Feed Eco-Treat
              </Button>
              <Button
                onClick={handlePlay}
                variant="outline"
                className="gap-2 bg-white shadow-sm"
              >
                <Smile className="h-4 w-4 text-blue-500" />
                Play Games
              </Button>
              <Button
                variant="outline"
                className="gap-2 bg-white shadow-sm"
              >
                <RefreshCcw className="h-4 w-4 text-slate-400" />
                Rest
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mascot Stats & Progress - Right 1/3 */}
        <div className="flex flex-col gap-6 h-full">
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BicepsFlexed className="h-5 w-5 text-energy-green" />
                Companion Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Utensils className="h-3 w-3" /> Hunger
                  </span>
                  <span>{hunger}%</span>
                </div>
                <Progress value={hunger} className="h-2 bg-slate-100" indicatorClassName="bg-blue-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-pink-500">
                    <Heart className="h-3 w-3" /> Happiness
                  </span>
                  <span>{happiness}%</span>
                </div>
                <Progress value={happiness} className="h-2 bg-slate-100" indicatorClassName="bg-pink-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-energy-yellow">
                    <Zap className="h-3 w-3" /> Energy
                  </span>
                  <span>{energy}%</span>
                </div>
                <Progress value={energy} className="h-2 bg-slate-100" indicatorClassName="bg-energy-yellow" />
              </div>

              <div className="pt-4 border-t border-dashed">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold">Level {experienceLevel} Progress</span>
                  <span className="text-xs text-muted-foreground font-mono">850 / 1000 XP</span>
                </div>
                <Progress value={85} className="h-1.5" />
                <p className="text-[11px] text-muted-foreground mt-2 italic">
                  Complete challenges to gain XP and earn better treats for Ollie!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Incentive Shop Highlights */}
          <Card className="shadow-card border-0 bg-energy-green/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-energy-green" />
                Active Perks
              </CardTitle>
              <CardDescription className="text-xs">
                Earned from Ollie's high happiness levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-energy-green/10 shadow-sm">
                <div className="w-10 h-10 bg-energy-green/10 rounded-lg flex items-center justify-center">
                  <Ticket className="h-5 w-5 text-energy-green" />
                </div>
                <div>
                  <p className="text-sm font-bold">$5 Bill Rebate</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Ready to claim</p>
                </div>
                <Button size="sm" className="ml-auto h-7 text-[10px] bg-energy-green px-3">Claim</Button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm opacity-60">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Gift className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">SP Rewards 500 Pts</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Unlock at Level 15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reward Shop Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Points Rewards Shop</h2>
            <p className="text-sm text-muted-foreground">Redeem your hard-earned points for exclusive vouchers and rebates</p>
          </div>
          <div className="bg-energy-green/10 px-4 py-2 rounded-2xl border border-energy-green/20 flex items-center gap-2">
            <Star className="h-4 w-4 text-energy-green fill-energy-green" />
            <span className="font-bold text-energy-green">{points.toLocaleString()} Points Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REWARDS.map((reward, index) => (
            <Card key={index} className="shadow-smooth hover:shadow-card transition-all border-0 group">
              <CardContent className="p-5 flex flex-col h-full">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                  reward.color
                )}>
                  <reward.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight mb-1">{reward.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{reward.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-energy-green fill-energy-green" />
                    <span className="text-sm font-bold">{reward.points.toLocaleString()}</span>
                  </div>
                  <Button
                    size="sm"
                    variant={points >= reward.points ? "default" : "secondary"}
                    disabled={points < reward.points}
                    onClick={() => handleClaimReward(reward)}
                    className={cn(
                      "h-8 px-4 text-xs font-bold transition-all",
                      points >= reward.points ? "bg-energy-green hover:bg-energy-green/90 text-white shadow-md hover:shadow-lg" : "bg-slate-100 text-slate-400"
                    )}
                  >
                    Claim
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}