import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Thermometer, Clock, Plug, Flame, ArrowRight, Zap, DollarSign, Leaf, Lightbulb } from "lucide-react";

interface SimSettings {
  acTemp: number;
  laundryOffPeak: boolean;
  lightOff: boolean;
  standbyReduction: boolean;
  waterHeaterHours: number;
}

const BASELINE = { bill: 155.20, kwh: 473, carbon: 236.5 };

function calculate(s: SimSettings) {
  let savings = 0;
  if (s.acTemp >= 25) savings += (s.acTemp - 22) * 3.2;
  if (s.lightOff) savings += 5.0;
  if (s.laundryOffPeak) savings += 8.5;
  if (s.standbyReduction) savings += 4.8;
  savings += Math.max(0, 2 - s.waterHeaterHours) * 5.6;

  const newBill = Math.max(0, BASELINE.bill - savings);
  const kwhSaved = Math.round((savings / BASELINE.bill) * BASELINE.kwh);
  const carbonSaved = Math.round(kwhSaved * 0.5 * 10) / 10;
  return { newBill, savings: Math.round(savings * 100) / 100, kwhSaved, carbonSaved };
}

function generateCompliment(metric: string, value: number) {
  if (value <= 0) return "";

  if (metric === "cost") {
    if (value < 5) return `That's about ${Math.floor(value / 1.5)} cups of Kopi! ☕️`;
    if (value < 10) return "You've saved the cost of a McDonald's meal! 🍔";
    if (value < 20) return "That's a free movie ticket saved! 🎟️";
    if (value < 50) return "You've saved a week's worth of public transport! 🚌";
    return "That's a fancy weekend brunch saved! 🍳";
  }

  if (metric === "carbonEmission") {
    if (value < 5) return "Equivalent to charging your phone for a year! 📱";
    if (value < 15) return "As much CO₂ as a newly planted tree absorbs! 🌳";
    if (value < 30) return "Saved emissions from a 100km car drive! 🚗";
    return "Equivalent to saving 1,000 plastic bottles! ♻️";
  }

  if (metric === "electricityConsumption") {
    if (value < 10) return "Enough to run your fridge for 5 days! ❄️";
    if (value < 25) return "That's 100 hours of TV time saved! 📺";
    if (value < 50) return "Equal to 20 loads of laundry! 👕";
    return "Enough power for an average home for 4 days! 🏠";
  }
  return "";
}

export default function Simulator() {
  const [settings, setSettings] = useState<SimSettings>({
    acTemp: 22,
    laundryOffPeak: false,
    standbyReduction: false,
    lightOff: false,
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
      <div className="flex flex-col gap-6 h-full">

        {/* Before vs After & Potential Savings*/}
        <div className="flex flex-row gap-4 items-stretch">

          {/* Potential Savings (2/3 width) */}
          <Card className="shadow-card bg-white w-2/3">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-black">Your Potential Savings</h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <p className="text-base text-black">
                    💰 You have saved <span className="text-2xl font-bold text-teal">${result.savings.toFixed(2)}</span> this month
                  </p>
                  <p className="text-sm text-muted-foreground italic ml-7">
                    {generateCompliment("cost", result.savings)}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-base text-black">
                    ⚡️ You have reduced your consumption by <span className="text-2xl font-bold text-energy-yellow">{result.kwhSaved}</span> kWh this month
                  </p>
                  <p className="text-sm text-muted-foreground italic ml-7">
                    {generateCompliment("electricityConsumption", result.kwhSaved)}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-base text-black">
                    🌱 You have prevented <span className="text-2xl font-bold text-energy-green">{result.carbonSaved}</span> kg of CO₂ emissions
                  </p>
                  <p className="text-sm text-muted-foreground italic ml-7">
                    {generateCompliment("carbonEmission", result.carbonSaved)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Before vs After (1/3 width) */}
          <div className="flex flex-row gap-2 w-1/3 flex-shrink-0">
            <Card className="shadow-card flex-1 flex flex-col justify-center border-b-4 border-b-energy-red">
              <CardContent className="p-4 text-center">
                <p className="text-md text-muted-foreground leading-tight">Current Bill</p>
                <p className="text-2xl font-bold text-energy-red">${BASELINE.bill.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{BASELINE.kwh} kWh</p>
              </CardContent>
            </Card>
            <div className="flex items-center">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <Card className="shadow-card flex-1 flex flex-col justify-center border-b-4 border-b-energy-green">
              <CardContent className="p-4 text-center">
                <p className="text-md text-muted-foreground leading-tight">New Bill</p>
                <p className="text-2xl font-bold text-energy-green">${result.newBill.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{BASELINE.kwh - result.kwhSaved} kWh</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Potential Savings & Controls */}
        <div className="space-y-4">

          {/* Slider */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Adjust Your Habits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
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

              {/* Light Off */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">Turn Off Lights When Not in Use</Label>
                </div>
                <Switch
                  checked={settings.lightOff}
                  onCheckedChange={(v) => setSettings({ ...settings, lightOff: v })}
                />
              </div>

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
