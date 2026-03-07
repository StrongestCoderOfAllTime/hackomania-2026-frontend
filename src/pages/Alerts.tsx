import AlertCard from "@/components/AlertCard";
import { getAlerts } from "@/lib/energyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import type { Alert } from "@/lib/energyData";

export default function Alerts() {
  const [alerts, setAlerts] = useState(getAlerts());
  const [showHistory, setShowHistory] = useState(false);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
  };

  const minimizeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-energy-red/10 p-2">
          <ShieldAlert className="h-6 w-6 text-energy-red" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Smart Alerts</h1>
          <p className="text-muted-foreground mt-0.5">
            AI-detected anomalies in your energy usage
          </p>
        </div>
      </div>

      {/* active alerts */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Active Alerts ({activeAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active alerts</p>
          ) : (
            activeAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onResolve={() => resolveAlert(alert.id)}
                onMinimize={() => minimizeAlert(alert.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      {/* toggle for history */}
      <div className="flex items-center gap-2">
        <Switch
          checked={showHistory}
          onCheckedChange={setShowHistory}
          id="show-history-switch"
        />
        <label htmlFor="show-history-switch" className="text-sm">
          Show alert history
        </label>
      </div>

      {/* alert history */}
      {showHistory && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Alert History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resolvedAlerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No resolved alerts</p>
              ) : (
                resolvedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                    <span className="text-xs font-medium text-energy-green bg-energy-green/10 px-2 py-1 rounded-full">
                      Resolved
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}