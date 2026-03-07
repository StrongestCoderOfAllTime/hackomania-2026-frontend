import AlertCard from "@/components/AlertCard";
import { getAlerts } from "@/lib/energyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ShieldAlert } from "lucide-react";

const alerts = getAlerts();

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-energy-red/10 p-2">
          <ShieldAlert className="h-6 w-6 text-energy-red" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Smart Alerts</h1>
          <p className="text-muted-foreground mt-0.5">AI-detected anomalies in your energy usage</p>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Active Alerts ({alerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Alert History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Feb 28", title: "Overnight high usage resolved", status: "Resolved" },
              { date: "Feb 20", title: "Weekend peak usage spike", status: "Resolved" },
              { date: "Feb 12", title: "Water heater running continuously", status: "Resolved" },
            ].map((h, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <span className="text-xs font-medium text-energy-green bg-energy-green/10 px-2 py-1 rounded-full">
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
