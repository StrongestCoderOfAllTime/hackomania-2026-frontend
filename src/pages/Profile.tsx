import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  applianceList
} from "@/lib/energyData";
import { User, Home, Wind, Save, LucideTarget, Plug2, Trash2, Edit2, Plus } from "lucide-react";
import { defaultProfile, type UserProfile } from "@/lib/energyData";
import { toast } from "sonner";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [newAppliance, setNewAppliance] = useState("");
  const [appliances, setAppliances] = useState(applianceList);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editKwh, setEditKwh] = useState("");
  const [newKwh, setNewKwh] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleAddApplianceItem = () => {
    const name = newAppliance.trim();
    const kwhNum = Number(newKwh) || 0;
    if (!name) return;

    const newItem = {
      name: name,
      kwh: kwhNum,
      percentage: 0,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      icon: "Plug"
    };

    setAppliances(prev => [newItem, ...prev]);
    setNewAppliance("");
    setNewKwh("");
    setIsDialogOpen(false);
    toast.success(`${name} added to list`);
  };

  const handleDeleteApplianceItem = (name: string) => {
    setAppliances(appliances.filter(a => a.name !== name));
    toast.error(`${name} removed`);
  };

  const startEditing = (app: any) => {
    setEditingId(app.name);
    setEditName(app.name);
    setEditKwh(app.kwh.toString());
  };

  const saveEdit = () => {
    setAppliances(appliances.map(a =>
      a.name === editingId ? { ...a, name: editName, kwh: Number(editKwh) || 0 } : a
    ));
    setEditingId(null);
    toast.success("Updated successfully");
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Target & Goals</h1>
        <p className="text-muted-foreground mt-1">Plan your way towards a greener future</p>
      </div>

      <div className="flex flex-row w-full gap-6">

        {/* Target  */}
        <Card className="shadow-card flex-1">
          {/* <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LucideTarget className="h-5 w-5" />
              Target
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
          </CardContent> */}
        </Card>

        {/* Electrical Appliances */}
        <Card className="shadow-card flex-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plug2 className="h-5 w-5" />
              Electrical Appliances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Manage your detailed appliance list</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Appliance
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Appliance</DialogTitle>
                    <DialogDescription>
                      Enter the details of your appliance to track its energy consumption.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Appliance Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g. Airfryer, Coffee Machine"
                        value={newAppliance}
                        onChange={(e) => setNewAppliance(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kwh">Energy Usage (kWh/month)</Label>
                      <Input
                        id="kwh"
                        type="number"
                        placeholder="e.g. 15"
                        value={newKwh}
                        onChange={(e) => setNewKwh(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddApplianceItem}>Add to List</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
              {appliances.map((app) => (
                <div
                  key={app.name}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex-1">
                    {editingId === app.name ? (
                      <div className="flex flex-col gap-2 mr-4">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8 text-sm"
                        />
                        <div className="flex items-center gap-2">
                          <Input
                            value={editKwh}
                            onChange={(e) => setEditKwh(e.target.value)}
                            type="number"
                            className="h-8 text-sm w-24"
                            placeholder="kWh"
                          />
                          <span className="text-xs text-muted-foreground">kWh</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.kwh} kWh • {app.percentage}% total</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {editingId === app.name ? (
                      <Button onClick={saveEdit} size="sm" variant="default" className="h-8">
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => startEditing(app)}
                        >
                          <Edit2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                          onClick={() => handleDeleteApplianceItem(app.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
