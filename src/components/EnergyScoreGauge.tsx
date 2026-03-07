import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EnergyScoreGaugeProps {
  score: number;
  neighbourhoodAvg?: number;
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-energy-green";
  if (score >= 40) return "text-energy-yellow";
  return "text-energy-red";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Improvement";
}

export default function EnergyScoreGauge({ score, neighbourhoodAvg = 58 }: EnergyScoreGaugeProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Energy Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={score >= 70 ? "hsl(var(--energy-green))" : score >= 40 ? "hsl(var(--energy-yellow))" : "hsl(var(--energy-red))"}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 264} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
        <p className={`text-center font-semibold ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Your score</span>
            <span className="font-medium">{score}</span>
          </div>
          <Progress value={score} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Neighbourhood avg</span>
            <span className="font-medium">{neighbourhoodAvg}</span>
          </div>
          <Progress value={neighbourhoodAvg} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
