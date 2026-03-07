import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Bot, Send, User, Trophy, Users, Sparkles } from "lucide-react";
import { energyTips, weeklyChallenges, getNeighbourhoodComparison } from "@/lib/energyData";

interface Message {
  id: string;
  role: "user" | "coach";
  text: string;
}

const SUGGESTED_PROMPTS = [
  "How can I reduce my electricity bill?",
  "What's using the most energy in my home?",
  "Is my usage normal for an HDB flat?",
  "Tips for reducing AC energy consumption",
];

const COACH_RESPONSES: Record<string, string> = {
  "How can I reduce my electricity bill?":
    "Great question! Based on your usage patterns, here are my top 3 recommendations:\n\n1. **Set your AC to 25°C** – This alone could save ~$8.50/month\n2. **Shift laundry to off-peak hours** (10pm–7am) – Save ~$3.20/month\n3. **Unplug standby devices** before bed – Save ~$4.80/month\n\nThat's a potential $16.50/month in savings! Want me to simulate this in the Energy Twin?",
  "What's using the most energy in my home?":
    "Based on AI analysis of your consumption patterns:\n\n🥇 **Air Conditioner** – 38% (180 kWh)\n🥈 **Water Heater** – 20% (95 kWh)\n🥉 **Refrigerator** – 16% (75 kWh)\n\nYour AC is the biggest opportunity for savings. Even a 1°C increase can reduce AC energy by ~6%!",
  "Is my usage normal for an HDB flat?":
    "You're using **473 kWh/month**, which puts you in the **top 35%** of energy-efficient households in your area! 🎉\n\nThe average HDB 4-room flat uses about 520 kWh/month. You're doing well, but there's still room to improve with small habit changes.",
  "Tips for reducing AC energy consumption":
    "Here are proven AC efficiency tips:\n\n❄️ **Set to 25°C** – Each degree below costs ~6% more energy\n🌀 **Use a fan** alongside AC to circulate cool air\n🧹 **Clean filters monthly** – Dirty filters make AC work 15% harder\n⏰ **Use a timer** – Set AC to turn off 30 mins before you wake\n🪟 **Close curtains** during the day to reduce heat gain\n\nEstimated savings: **$12-18/month**",
};

const neighbourhood = getNeighbourhoodComparison();

export default function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "coach",
      text: "Hi there! 👋 I'm your AI Energy Coach. I analyse your electricity usage and help you save money while being more sustainable.\n\nHow can I help you today? Try one of the suggested prompts below!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = COACH_RESPONSES[text] ||
        `That's a great question! Based on your energy profile, here are some thoughts:\n\n${energyTips[Math.floor(Math.random() * energyTips.length)].tip} — this could save you ${energyTips[0].savings}.\n\nWould you like me to go deeper into any specific area?`;
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "coach", text: response }]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Energy Coach</h1>
        <p className="text-muted-foreground mt-1">Your personal AI guide to sustainable energy habits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2">
          <Card className="shadow-card flex flex-col" style={{ height: "500px" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Energy Coach Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "coach" && (
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-xl p-3 text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === "user" && (
                      <div className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested prompts */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => sendMessage(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask your energy coach..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  className="flex-1"
                />
                <Button size="icon" onClick={() => sendMessage(input)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar content */}
        <div className="space-y-4">
          {/* Daily tip */}
          <Card className="shadow-card border-l-4 border-l-energy-green">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-energy-green mb-1">💡 Daily Tip</p>
              <p className="text-base">{energyTips[0].tip}</p>
              <p className="text-sm text-energy-green font-medium mt-1">Save {energyTips[0].savings}</p>
            </CardContent>
          </Card>

          {/* Neighbourhood */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Neighbourhood Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Top {neighbourhood.percentile}%</p>
              <p className="text-sm text-muted-foreground">You use less than {100 - neighbourhood.percentile}% of neighbours</p>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Weekly Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyChallenges.map((c) => (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{c.title}</span>
                    <span className="text-muted-foreground">{c.daysLeft}d left</span>
                  </div>
                  <Progress value={c.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Reward: {c.reward}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
