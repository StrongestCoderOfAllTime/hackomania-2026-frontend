import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: number; label: string };
  status?: "green" | "yellow" | "red";
  className?: string;
  children?: React.ReactNode;
}

const statusStyles = {
  green: "border-l-4 border-l-energy-green",
  yellow: "border-l-4 border-l-energy-yellow",
  red: "border-l-4 border-l-energy-red",
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  status,
  className,
  children,
}: DashboardCardProps) {
  return (
    <Card className={cn("shadow-card hover:shadow-card-hover transition-shadow", status && statusStyles[status], className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        {trend && (
          <p className={cn("text-sm font-medium mt-2", trend.value < 0 ? "text-energy-green" : "text-energy-red")}>
            {trend.value < 0 ? "↓" : "↑"} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
