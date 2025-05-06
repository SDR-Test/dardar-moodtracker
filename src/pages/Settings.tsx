
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState("20:00");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would save to local storage or a database
    toast({
      title: "설정이 저장되었습니다",
      description: "모든 변경사항이 적용되었습니다.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4">설정</h1>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-6">
              <h2 className="text-lg font-medium mb-4">알림</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="cursor-pointer">
                    기분 기록 알림
                  </Label>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                {notificationsEnabled && (
                  <div>
                    <Label htmlFor="notification-time">알림 시간</Label>
                    <Input
                      id="notification-time"
                      type="time"
                      value={notificationTime}
                      onChange={(e) => setNotificationTime(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      매일 이 시간에 기분을 기록하도록 알림을 받습니다.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 pt-6">
              <h2 className="text-lg font-medium mb-4">앱 설정</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme">테마</Label>
                  <Select value={theme} onValueChange={(v: "light" | "dark") => setTheme(v)}>
                    <SelectTrigger id="theme" className="mt-1">
                      <SelectValue placeholder="테마 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">라이트 모드</SelectItem>
                      <SelectItem value="dark">다크 모드</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">언어</Label>
                  <Select value={language} onValueChange={(v: "ko" | "en") => setLanguage(v)}>
                    <SelectTrigger id="language" className="mt-1">
                      <SelectValue placeholder="언어 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 pt-6">
              <h2 className="text-lg font-medium mb-4">정보</h2>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">마음 일기</span> v1.0.0
                </p>
                <p className="text-sm text-gray-500">
                  마음 일기는 감정을 기록하고 자신의 기분을 추적하는 데 도움이 되는 앱입니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              설정 저장
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
