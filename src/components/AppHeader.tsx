import { SidebarTrigger } from "@/components/ui/sidebar";
import { DollarSign, Gauge, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  monthlyBill: number;
  energyScore: number;
  aiInsight: string;
}

export default function AppHeader({ monthlyBill, energyScore, aiInsight }: AppHeaderProps) {
  return (
    <header className="h-16 border-b bg-card flex items-center px-4 gap-4 shrink-0">
      <SidebarTrigger className="shrink-0" />

      <div className="flex-1 flex items-center gap-3 md:gap-6 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground leading-none">Est. Bill</p>
            <p className="text-sm font-bold">${monthlyBill.toFixed(2)}</p>
          </div>
        </div>

        <div className="w-px h-8 bg-border shrink-0 hidden md:block" />

        <div className="flex items-center gap-2 shrink-0">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground leading-none">Score</p>
            <p className="text-sm font-bold">{energyScore}/100</p>
          </div>
        </div>

        <div className="w-px h-8 bg-border shrink-0 hidden md:block" />

        <div className="hidden md:flex items-center gap-2 min-w-0">
          <Badge variant="secondary" className="gap-1 shrink-0">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
          <p className="text-sm text-muted-foreground truncate">{aiInsight}</p>
        </div>
      </div>
    </header>
  );
}
