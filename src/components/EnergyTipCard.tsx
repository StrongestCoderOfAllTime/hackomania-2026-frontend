import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EnergyTipCardProps {
  tip: string;
  savings: string;
  onSimulate?: () => void;
}

export default function EnergyTipCard({ tip, savings, onSimulate }: EnergyTipCardProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <Card className={cn("shadow-card transition-all", completed && "opacity-60")}>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="rounded-full bg-energy-green/10 p-2.5 shrink-0 mt-0.5">
          <Lightbulb className="h-5 w-5 text-energy-green" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium leading-snug">{tip}</p>
          <p className="text-sm text-energy-green font-semibold mt-1">Save {savings}</p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          {onSimulate && (
            <Button variant="outline" size="sm" onClick={onSimulate} className="text-xs">
              Simulate
            </Button>
          )}
          <Button
            variant={completed ? "default" : "outline"}
            size="sm"
            onClick={() => setCompleted(!completed)}
            className="text-xs"
          >
            {completed ? <Check className="h-3 w-3 mr-1" /> : null}
            {completed ? "Done" : "Mark Done"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
