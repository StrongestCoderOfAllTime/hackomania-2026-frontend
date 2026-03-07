import { SidebarTrigger } from "@/components/ui/sidebar";
import { Star, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { experiencePoints, experienceLevel } from "@/lib/energyData";

export default function AppHeader() {
  // Hardcoded XP progress for demo purposes, matching Challenge page
  const currentXP = 850;
  const targetXP = 1000;
  const progressPercent = (currentXP / targetXP) * 100;

  return (
    <header className="h-16 border-b bg-card flex items-center px-4 gap-4 shrink-0">
      <SidebarTrigger className="shrink-0" />

      <div className="flex-1 flex items-center gap-3 md:gap-8 overflow-x-auto scrollbar-hide">
        {/* Level & Progress Section */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-energy-green/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-energy-green" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground leading-none uppercase font-bold tracking-wider">Level</p>
              <p className="text-sm font-bold">{experienceLevel}</p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-1.5 min-w-[120px] md:min-w-[180px]">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
              <span>Progress</span>
              <span>{currentXP} / {targetXP} XP</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-slate-100" />
          </div>
        </div>

        <div className="w-px h-8 bg-border shrink-0" />

        {/* Points Section */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1.5 bg-yellow-500/10 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground leading-none uppercase font-bold tracking-wider">Total Points</p>
            <p className="text-sm font-bold">{experiencePoints.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
