import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  title: string;
  description: string;
}

export default function ChallengeCard({ title, description }: ChallengeCardProps) {

  return (
    <Card className={cn("shadow-card transition-all")}>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex-1 min-w-0">
          <p className="text-base font-medium leading-snug">{title}</p>
          <p className="text-sm text-gray-500 font-semibold mt-1">Save {description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
