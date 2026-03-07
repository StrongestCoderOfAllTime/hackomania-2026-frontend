// Simulated dataset generator for SP Energy Coach demo mode

export interface DailyUsage {
  date: string;
  totalKwh: number;
  peakKwh: number;
  offPeakKwh: number;
  streak: number;
  cost: number;
  status: "green" | "yellow" | "red";
}

export interface ApplianceUsage {
  name: string;
  kwh: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
  estimatedWaste: number;
  suggestions: string[];
  resolved: boolean;
}

export interface UserProfile {
  householdSize: number;
  homeType: "HDB" | "Condo" | "Landed";
  numAircons: number;
  majorAppliances: string[];
}

const RATE_PER_KWH = 0.3283; // SGD

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateDailyUsage(days: number = 30): DailyUsage[] {
  const rand = seededRandom(42);
  const data: DailyUsage[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseKwh = isWeekend ? 18 + rand() * 8 : 14 + rand() * 6;

    // Add some spikes
    const spike = rand() > 0.85 ? 8 + rand() * 5 : 0;
    const totalKwh = Math.round((baseKwh + spike) * 100) / 100;
    const peakKwh = Math.round(totalKwh * (0.55 + rand() * 0.15) * 100) / 100;
    const offPeakKwh = Math.round((totalKwh - peakKwh) * 100) / 100;
    const cost = Math.round(totalKwh * RATE_PER_KWH * 100) / 100;

    // Add Daily Streak
    const streak = 12;

    let status: "green" | "yellow" | "red" = "green";
    if (totalKwh > 22) status = "red";
    else if (totalKwh > 18) status = "yellow";

    data.push({
      date: date.toISOString().split("T")[0],
      totalKwh,
      peakKwh,
      offPeakKwh,
      cost,
      streak,
      status,
    });
  }
  return data;
}

export function getApplianceBreakdown(): ApplianceUsage[] {
  return [
    { name: "Air Conditioner", kwh: 180, percentage: 38, color: "hsl(220, 70%, 45%)", icon: "Snowflake" },
    { name: "Water Heater", kwh: 95, percentage: 20, color: "hsl(0, 72%, 51%)", icon: "Flame" },
    { name: "Refrigerator", kwh: 75, percentage: 16, color: "hsl(175, 60%, 42%)", icon: "Refrigerator" },
    { name: "Washing Machine", kwh: 55, percentage: 12, color: "hsl(45, 93%, 47%)", icon: "WashingMachine" },
    { name: "Lighting", kwh: 35, percentage: 7, color: "hsl(280, 60%, 50%)", icon: "Lightbulb" },
    { name: "Others", kwh: 33, percentage: 7, color: "hsl(220, 15%, 60%)", icon: "Plug" },
  ];
}

export function getAlerts(): Alert[] {
  return [
    {
      id: "1",
      title: "Energy Leakage Detected",
      description: "Unusually high consumption detected between 2am–5am over the past 3 nights.",
      severity: "high",
      timestamp: "2 hours ago",
      estimatedWaste: 12.5,
      suggestions: [
        "Check if your air conditioner is running overnight unnecessarily",
        "Inspect water heater timer settings",
        "Unplug standby electronics before sleeping",
      ],
      resolved: false,
    },
    {
      id: "2",
      title: "Peak Hour Surge",
      description: "Your peak-hour usage increased by 15% this week compared to last week.",
      severity: "medium",
      timestamp: "1 day ago",
      estimatedWaste: 8.2,
      suggestions: [
        "Shift laundry loads to off-peak hours (10pm–7am)",
        "Pre-cool your home before peak hours",
        "Use a timer for your water heater",
      ],
      resolved: false,
    },
    {
      id: "3",
      title: "AC Running Longer Than Usual",
      description: "Your air conditioner appears to be running 2 hours longer daily this week.",
      severity: "medium",
      timestamp: "3 days ago",
      estimatedWaste: 6.0,
      suggestions: [
        "Set AC temperature to 25°C for optimal efficiency",
        "Clean your AC filter for better cooling",
        "Use a fan alongside your AC to circulate air",
      ],
      resolved: false,
    },
  ];
}

export function getEnergyScore(): number {
  return 72;
}

export function getMonthlyBill(data: DailyUsage[]): { current: number; previous: number; predicted: number } {
  const totalKwh = data.reduce((sum, d) => sum + d.totalKwh, 0);
  const predicted = Math.round(totalKwh * RATE_PER_KWH * 100) / 100;
  return {
    current: predicted,
    previous: Math.round(predicted * 1.08 * 100) / 100,
    predicted: Math.round((predicted / data.length) * 30 * 100) / 100,
  };
}

export function getNeighbourhoodComparison(): { userKwh: number; avgKwh: number; percentile: number } {
  return { userKwh: 473, avgKwh: 520, percentile: 35 };
}

export function getHourlyPattern(): { hour: number; kwh: number }[] {
  const rand = seededRandom(99);
  return Array.from({ length: 24 }, (_, hour) => {
    let base = 0.3;
    if (hour >= 7 && hour <= 9) base = 0.8 + rand() * 0.3;
    if (hour >= 12 && hour <= 14) base = 0.9 + rand() * 0.4;
    if (hour >= 18 && hour <= 22) base = 1.2 + rand() * 0.5;
    if (hour >= 0 && hour <= 5) base = 0.2 + rand() * 0.15;
    return { hour, kwh: Math.round(base * 100) / 100 };
  });
}

export const defaultProfile: UserProfile = {
  householdSize: 4,
  homeType: "HDB",
  numAircons: 2,
  majorAppliances: ["Refrigerator", "Washing Machine", "Water Heater", "Air Conditioner"],
};

export const energyTips = [
  { tip: "Set your AC to 25°C instead of 22°C", savings: "$8.50/month", category: "cooling" },
  { tip: "Run your washing machine during off-peak hours (10pm–7am)", savings: "$3.20/month", category: "laundry" },
  { tip: "Switch off standby appliances before bed", savings: "$4.80/month", category: "standby" },
  { tip: "Use LED bulbs instead of incandescent", savings: "$2.10/month", category: "lighting" },
  { tip: "Reduce water heater usage by 30 minutes daily", savings: "$5.60/month", category: "heating" },
  { tip: "Use a fan with your AC to distribute cool air", savings: "$3.90/month", category: "cooling" },
  { tip: "Defrost your refrigerator regularly", savings: "$1.50/month", category: "refrigerator" },
  { tip: "Air-dry clothes instead of using a dryer", savings: "$6.20/month", category: "laundry" },
];

export const weeklyChallenges = [
  { id: "1", title: "Reduce peak usage by 10%", progress: 65, reward: "⚡ Peak Saver Badge", daysLeft: 3 },
  { id: "2", title: "Run laundry only off-peak for 7 days", progress: 40, reward: "🌙 Night Owl Badge", daysLeft: 5 },
  { id: "3", title: "Keep AC at 25°C for a week", progress: 85, reward: "❄️ Cool Saver Badge", daysLeft: 1 },
];

export function getUsageData(view: "weekly" | "monthly" | "yearly") {
  const rand = seededRandom(123);
  if (view === "weekly") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = days.map(d => ({
      label: d,
      kwh: Math.round((18 + rand() * 10) * 10) / 10,
    }));
    return { data, benchmark: 22 };
  }
  if (view === "monthly") {
    const data = Array.from({ length: 30 }, (_, i) => ({
      label: `${i + 1}`,
      kwh: Math.round((16 + rand() * 12) * 10) / 10,
    }));
    return { data, benchmark: 20 };
  }
  if (view === "yearly") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map(m => ({
      label: m,
      kwh: Math.round((500 + rand() * 180) * 10) / 10,
    }));
    return { data, benchmark: 580 };
  }
  return { data: [], benchmark: 0 };
}

export const applianceList: ApplianceUsage[] = [
  { name: "Refrigerator", kwh: 75, percentage: 16, color: "hsl(220, 70%, 45%)", icon: "Refrigerator" },
  { name: "Air Conditioner", kwh: 180, percentage: 38, color: "hsl(0, 72%, 51%)", icon: "Snowflake" },
  { name: "Washing Machine", kwh: 55, percentage: 12, color: "hsl(175, 60%, 42%)", icon: "WashingMachine" },
  { name: "Water Heater", kwh: 95, percentage: 20, color: "hsl(45, 93%, 47%)", icon: "Flame" },
  { name: "Television", kwh: 25, percentage: 5, color: "hsl(280, 60%, 50%)", icon: "Monitor" },
  { name: "Computer/Laptop", kwh: 20, percentage: 4, color: "hsl(120, 60%, 50%)", icon: "Laptop" },
  { name: "Microwave", kwh: 15, percentage: 3, color: "hsl(30, 70%, 50%)", icon: "Microwave" },
  { name: "Fan", kwh: 10, percentage: 2, color: "hsl(60, 70%, 50%)", icon: "Fan" },
  { name: "Vacuum Cleaner", kwh: 8, percentage: 2, color: "hsl(90, 60%, 50%)", icon: "Vacuum" },
  { name: "Blender", kwh: 5, percentage: 1, color: "hsl(150, 60%, 50%)", icon: "Blender" },
  { name: "Toaster", kwh: 3, percentage: 1, color: "hsl(180, 60%, 50%)", icon: "Toaster" },
  { name: "Hair Dryer", kwh: 12, percentage: 3, color: "hsl(210, 60%, 50%)", icon: "HairDryer" },
  { name: "Lights", kwh: 1, percentage: 1, color: "hsl(210, 60%, 50%)", icon: "HairDryer" },
];
