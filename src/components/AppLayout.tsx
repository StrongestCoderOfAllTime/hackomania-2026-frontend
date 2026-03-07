import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { getMonthlyBill, generateDailyUsage, getEnergyScore } from "@/lib/energyData";

interface AppLayoutProps {
  children: React.ReactNode;
}

const usageData = generateDailyUsage(30);
const bill = getMonthlyBill(usageData);
const score = getEnergyScore();

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader
            monthlyBill={bill.predicted}
            energyScore={score}
            aiInsight="Your AC usage is 15% higher than last week. Consider setting it to 25°C."
          />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
