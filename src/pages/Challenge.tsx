import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Zap,
  Clock,
  Star,
  CheckCircle2,
  Circle,
  Leaf,
  Flame,
  Award,
  TrendingUp,
  Target,
  ChevronRight
} from "lucide-react";
import type { Challenge } from '@/lib/energyData';
import { INITIAL_CHALLENGES, experienceLevel, experiencePoints } from '@/lib/energyData';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Challenge() {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [points, setPoints] = useState(experiencePoints);
  const [level, setLevel] = useState(experienceLevel);

  const toggleEvent = (challengeId: string, eventId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const updatedEvents = c.events.map(e =>
          e.id === eventId ? { ...e, isCompleted: !e.isCompleted } : e
        );

        const allCompleted = updatedEvents.every(e => e.isCompleted);
        const wasAllCompleted = c.events.every(e => e.isCompleted);

        if (allCompleted && !wasAllCompleted) {
          setPoints(p => p + c.points);
          toast.success(`Challenge Completed! Earned ${c.points} points!`, {
            icon: <Award className="h-5 w-5 text-yellow-500" />
          });
        }

        return { ...c, events: updatedEvents };
      }
      return c;
    }));
  };

  const getProgress = (c: Challenge) => {
    const completed = c.events.filter(e => e.isCompleted).length;
    return (completed / c.events.length) * 100;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Dynamic Header Shared Aesthetic */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Challenges & Goals</h1>
        <p className="text-muted-foreground mt-1">Plan your way towards a greener future</p>
      </div>

      {/* Hero Stats Card - Matched to Savings aesthetic */}
      <Card className="shadow-card border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left: Level Status */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-energy-green" />
                  Level {level} Progress
                </h3>
                <span className="text-sm text-muted-foreground">850 / 1000 XP</span>
              </div>
              <div className="space-y-2">
                <Progress value={85} className="h-3 bg-slate-100" />
                <p className="text-xs text-muted-foreground italic">You are in the top 15% of energy savers in your block! 🏆</p>
              </div>
            </div>

            {/* Right: Points Stats - Highlighted */}
            <div className="md:w-1/3 bg-slate-50/50 border-l p-6 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Points</p>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                <span className="text-4xl font-bold">{points.toLocaleString()}</span>
              </div>
              <Button variant="link" className="text-energy-green h-auto p-0 mt-2 text-sm font-semibold">
                View Rewards Shop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {challenges.map((challenge) => {
          const isFull = getProgress(challenge) === 100;
          return (
            <Card
              key={challenge.id}
              className={cn(
                "shadow-card border-y-0 border-r-0 border-l-[6px] transition-all hover:shadow-md",
                challenge.borderClass
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="font-normal">
                    {challenge.duration}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {challenge.points} PTS
                  </div>
                </div>
                <CardTitle className="text-xl flex items-center">
                  <span className={challenge.colorClass}></span>
                  {challenge.title}
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  {challenge.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Event Tracker List */}
                <div className="space-y-2">
                  {challenge.events.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => toggleEvent(challenge.id, event.id)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                        event.isCompleted
                          ? "bg-slate-50 border-slate-200"
                          : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {event.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-energy-green" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300" />
                        )}
                        <span className={cn(
                          "text-sm font-medium",
                          event.isCompleted && "text-muted-foreground line-through"
                        )}>
                          {event.name}
                        </span>
                      </div>
                      {!event.isCompleted && (
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-bold tracking-wider">
                          Done
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Card Progress */}
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground mb-1">
                    <span>Task Progress</span>
                    <span>{Math.round(getProgress(challenge))}%</span>
                  </div>
                  <Progress value={getProgress(challenge)} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Redeemable Showcase Section */}
      <div className="pt-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-energy-green" />
          Featured Rewards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "$10 Bill Rebate", pts: 5000, img: "💵", color: "text-green-600" },
            { title: "Smart Plug (v2)", pts: 8500, img: "🔌", color: "text-blue-600" },
            { title: "Solar Power Bank", pts: 12000, img: "☀️", color: "text-orange-600" },
          ].map((reward, i) => (
            <Card key={i} className="shadow-card border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-slate-50 rounded-xl">
                  {reward.img}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold truncate">{reward.title}</h3>
                  <p className="text-xs font-semibold text-energy-green">{reward.pts} PTS</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-energy-green group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper for chevron import
import { ChevronRight as ChevronRightIcon } from "lucide-react";