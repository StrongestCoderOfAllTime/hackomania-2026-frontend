import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Home, Wind, Save } from "lucide-react";
import { defaultProfile, type UserProfile } from "@/lib/energyData";
import { toast } from "sonner";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [newAppliance, setNewAppliance] = useState("");

  const handleSave = () => {
    toast.success("Profile updated successfully! Your energy analysis will be recalculated.");
  };

  const addAppliance = () => {
    if (newAppliance.trim() && !profile.majorAppliances.includes(newAppliance.trim())) {
      setProfile({
        ...profile,
        majorAppliances: [...profile.majorAppliances, newAppliance.trim()],
      });
      setNewAppliance("");
    }
  };

  const removeAppliance = (appliance: string) => {
    setProfile({
      ...profile,
      majorAppliances: profile.majorAppliances.filter((a) => a !== appliance),
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Help us improve your energy analysis</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Household Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Household Size</Label>
            <Input
              type="number"
              min={1}
              max={10}
              value={profile.householdSize}
              onChange={(e) => setProfile({ ...profile, householdSize: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Home Type</Label>
            <Select
              value={profile.homeType}
              onValueChange={(v) => setProfile({ ...profile, homeType: v as UserProfile["homeType"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HDB">HDB Flat</SelectItem>
                <SelectItem value="Condo">Condominium</SelectItem>
                <SelectItem value="Landed">Landed Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base flex items-center gap-2">
              <Wind className="h-4 w-4" />
              Number of Air Conditioners
            </Label>
            <Input
              type="number"
              min={0}
              max={10}
              value={profile.numAircons}
              onChange={(e) => setProfile({ ...profile, numAircons: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base flex items-center gap-2">
              <Home className="h-4 w-4" />
              Appliances
            </Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add an appliance (e.g., Blender)"
                  value={newAppliance}
                  onChange={(e) => setNewAppliance(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAppliance()}
                />
                <Button onClick={addAppliance} size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.majorAppliances.map((a) => (
                  <div key={a} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                    <span className="text-sm">{a}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAppliance(a)}
                      className="h-4 w-4 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
