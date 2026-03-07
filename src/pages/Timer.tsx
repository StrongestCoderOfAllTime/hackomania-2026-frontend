import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { applianceList as applianceList } from '@/lib/energyData';

interface Appliance {
  id: number;
  name: string;
  onTime: string;
  offTime: string;
  isOn: boolean;
  notificationTime: string; // Time after which to notify if still on
}

export default function Timer() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [newApplianceName, setNewApplianceName] = useState('');
  const [newOnHour, setNewOnHour] = useState('1');
  const [newOnMinute, setNewOnMinute] = useState('00');
  const [newOnAmpm, setNewOnAmpm] = useState('AM');
  const [newOffHour, setNewOffHour] = useState('1');
  const [newOffMinute, setNewOffMinute] = useState('00');
  const [newOffAmpm, setNewOffAmpm] = useState('AM');
  const [newNotificationHour, setNewNotificationHour] = useState('1');
  const [newNotificationMinute, setNewNotificationMinute] = useState('00');
  const [newNotificationAmpm, setNewNotificationAmpm] = useState('AM');

  const to24Hour = (hour: number, ampm: string) => {
    if (ampm === 'AM') return hour === 12 ? 0 : hour;
    return hour === 12 ? 12 : hour + 12;
  };

  const addAppliance = () => {
    if (newApplianceName.trim()) {
      const onTime = `${to24Hour(parseInt(newOnHour), newOnAmpm).toString().padStart(2, '0')}:${newOnMinute}`;
      const offTime = `${to24Hour(parseInt(newOffHour), newOffAmpm).toString().padStart(2, '0')}:${newOffMinute}`;
      const notificationTime = `${to24Hour(parseInt(newNotificationHour), newNotificationAmpm).toString().padStart(2, '0')}:${newNotificationMinute}`;
      const newAppliance: Appliance = {
        id: Date.now(),
        name: newApplianceName,
        onTime,
        offTime,
        isOn: false,
        notificationTime,
      };
      setAppliances([...appliances, newAppliance]);
      setNewApplianceName('');
      setNewOnHour('1');
      setNewOnMinute('00');
      setNewOnAmpm('AM');
      setNewOffHour('1');
      setNewOffMinute('00');
      setNewOffAmpm('AM');
      setNewNotificationHour('1');
      setNewNotificationMinute('00');
      setNewNotificationAmpm('AM');
    }
  };

  const toggleAppliance = (id: number) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, isOn: !app.isOn } : app
    ));
  };

  const updateAppliance = (id: number, field: keyof Appliance, value: string | boolean) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const removeAppliance = (id: number) => {
    setAppliances(appliances.filter(app => app.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

      appliances.forEach(app => {
        if (app.isOn && app.notificationTime && currentTime >= app.notificationTime) {
          // Trigger notification
          if (Notification.permission === 'granted') {
            new Notification(`${app.name} is still on past ${app.notificationTime}!`);
          } else {
            alert(`${app.name} is still on past ${app.notificationTime}!`);
          }
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [appliances]);

  useEffect(() => {
    // Request notification permission on mount
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Appliance Timer</h1>
        <p className="text-muted-foreground mt-1">Schedule your appliances and get notified</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Add Appliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appliance-name">Appliance Name</Label>
              <Select value={newApplianceName} onValueChange={setNewApplianceName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an appliance" />
                </SelectTrigger>
                <SelectContent>
                  {applianceList.map((a) => (
                    <SelectItem key={a.name} value={a.name}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>On Time</Label>
              <div className="flex gap-2">
                <Select value={newOnHour} onValueChange={setNewOnHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <SelectItem key={h} value={h.toString()}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newOnMinute} onValueChange={setNewOnMinute}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                      <SelectItem key={m} value={m.toString().padStart(2, '0')}>
                        {m.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newOnAmpm} onValueChange={setNewOnAmpm}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Off Time</Label>
              <div className="flex gap-2">
                <Select value={newOffHour} onValueChange={setNewOffHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <SelectItem key={h} value={h.toString()}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newOffMinute} onValueChange={setNewOffMinute}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                      <SelectItem key={m} value={m.toString().padStart(2, '0')}>
                        {m.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newOffAmpm} onValueChange={setNewOffAmpm}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Notification Time (if still on)</Label>
              <div className="flex gap-2">
                <Select value={newNotificationHour} onValueChange={setNewNotificationHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <SelectItem key={h} value={h.toString()}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newNotificationMinute} onValueChange={setNewNotificationMinute}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                      <SelectItem key={m} value={m.toString().padStart(2, '0')}>
                        {m.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newNotificationAmpm} onValueChange={setNewNotificationAmpm}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button onClick={addAppliance} className="w-full">Add Appliance</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliances.map((app) => (
          <Card key={app.id} className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                {app.name}
                <Button variant="ghost" size="sm" onClick={() => removeAppliance(app.id)}>×</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Status</Label>
                <Switch
                  checked={app.isOn}
                  onCheckedChange={() => toggleAppliance(app.id)}
                />
              </div>
              <div>
                <Label>On Time</Label>
                <Input
                  type="time"
                  value={app.onTime}
                  onChange={(e) => updateAppliance(app.id, 'onTime', e.target.value)}
                />
              </div>
              <div>
                <Label>Off Time</Label>
                <Input
                  type="time"
                  value={app.offTime}
                  onChange={(e) => updateAppliance(app.id, 'offTime', e.target.value)}
                />
              </div>
              <div>
                <Label>Notification Time</Label>
                <Input
                  type="time"
                  value={app.notificationTime}
                  onChange={(e) => updateAppliance(app.id, 'notificationTime', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}