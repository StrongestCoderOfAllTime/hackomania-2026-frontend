import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Thermometer, Clock, Plug, Flame, ArrowRight, Zap, DollarSign, Leaf } from "lucide-react";

interface SimSettings {
  acTemp: number;
  laundryOffPeak: boolean;
  standbyReduction: boolean;
  waterHeaterHours: number;
}

const BASELINE = { bill: 155.20, kwh: 473, carbon: 236.5 };

function calculate(s: SimSettings) {
  let savings = 0;
  if (s.acTemp >= 25) savings += (s.acTemp - 22) * 3.2;
  if (s.laundryOffPeak) savings += 8.5;
  if (s.standbyReduction) savings += 4.8;
  savings += Math.max(0, 2 - s.waterHeaterHours) * 5.6;

  const newBill = Math.max(0, BASELINE.bill - savings);
  const kwhSaved = Math.round((savings / BASELINE.bill) * BASELINE.kwh);
  const carbonSaved = Math.round(kwhSaved * 0.5 * 10) / 10;
  return { newBill, savings: Math.round(savings * 100) / 100, kwhSaved, carbonSaved };
}

export default function Simulator() {
  const [settings, setSettings] = useState<SimSettings>({
    acTemp: 22,
    laundryOffPeak: false,
    standbyReduction: false,
    waterHeaterHours: 3,
  });

  const result = calculate(settings);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Energy Twin Simulator</h1>
        <p className="text-muted-foreground mt-1">See how changes in habits affect your bill</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-full">

        {/* Results */}
        <div className="h-full">
          {/* Before vs After */}
          <div className="flex flex-col gap-4 items-center h-full">
            <Card className="shadow-card w-full flex-1 flex flex-col justify-center border-l-4 border-l-energy-red">
              <CardContent className="p-4 text-center">
                <p className="text-md text-muted-foreground">Current Bill</p>
                <p className="text-2xl font-bold text-energy-red">${BASELINE.bill.toFixed(2)}</p>
                <p className="text-md text-muted-foreground">{BASELINE.kwh} kWh</p>
              </CardContent>
            </Card>
            <div className="flex-shrink-0">
              <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
            </div>
            <Card className="shadow-card border-l-4 border-l-energy-green w-full flex-1 flex flex-col justify-center">
              <CardContent className="p-4 text-center">
                <p className="text-md text-muted-foreground">New Bill</p>
                <p className="text-2xl font-bold text-energy-green">${result.newBill.toFixed(2)}</p>
                <p className="text-md text-muted-foreground">{BASELINE.kwh - result.kwhSaved} kWh</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Potential Savings & Controls */}
        <div className="space-y-4">
          {/* Potential Savings Summary */}
          <Card className="shadow-card bg-navy text-primary-foreground">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Potential Savings</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-1 text-teal" />
                  <p className="text-2xl font-bold">${result.savings.toFixed(2)}</p>
                  <p className="text-xs opacity-80">Cost saved/month</p>
                </div>
                <div className="text-center">
                  <Zap className="h-6 w-6 mx-auto mb-1 text-energy-yellow" />
                  <p className="text-2xl font-bold">{result.kwhSaved}</p>
                  <p className="text-xs opacity-80">kWh saved/month</p>
                </div>
                <div className="text-center">
                  <Leaf className="h-6 w-6 mx-auto mb-1 text-energy-green" />
                  <p className="text-2xl font-bold">{result.carbonSaved}</p>
                  <p className="text-xs opacity-80">kg CO₂ reduced</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Adjust Your Habits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* AC Temperature */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">AC Temperature</Label>
                </div>
                <Slider
                  value={[settings.acTemp]}
                  onValueChange={([v]) => setSettings({ ...settings, acTemp: v })}
                  min={18} max={28} step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground text-center">{settings.acTemp}°C</p>
              </div>

              {/* Laundry */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">Off-Peak Laundry</Label>
                </div>
                <Switch
                  checked={settings.laundryOffPeak}
                  onCheckedChange={(v) => setSettings({ ...settings, laundryOffPeak: v })}
                />
              </div>

              {/* Standby */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plug className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">Reduce Standby Devices</Label>
                </div>
                <Switch
                  checked={settings.standbyReduction}
                  onCheckedChange={(v) => setSettings({ ...settings, standbyReduction: v })}
                />
              </div>

              {/* Water Heater */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">Water Heater Duration</Label>
                </div>
                <Slider
                  value={[settings.waterHeaterHours]}
                  onValueChange={([v]) => setSettings({ ...settings, waterHeaterHours: v })}
                  min={0} max={5} step={0.5}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground text-center">{settings.waterHeaterHours} hrs/day</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
