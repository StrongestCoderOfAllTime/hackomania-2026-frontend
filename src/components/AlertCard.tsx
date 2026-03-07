import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, DollarSign } from "lucide-react";
import type { Alert } from "@/lib/energyData";

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  return (
    <Card className="shadow-card border-l-4 border-l-energy-red">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-energy-red/10 p-2">
            <AlertTriangle className="h-5 w-5 text-energy-red" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{alert.title}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
              <Clock className="h-3.5 w-3.5" />
              {alert.timestamp}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-base">{alert.description}</p>
        <div className="flex items-center gap-2 text-energy-red font-semibold">
          <DollarSign className="h-4 w-4" />
          Estimated waste: ${alert.estimatedWaste.toFixed(2)}/month
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Suggestions:</p>
          <ul className="space-y-1.5">
            {alert.suggestions.map((s, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-energy-green mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
