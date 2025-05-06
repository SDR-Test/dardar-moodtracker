
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MoodChart from "@/components/MoodChart";
import { useMood } from "@/contexts/MoodContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const Stats: React.FC = () => {
  const { moodEntries } = useMood();
  const [period, setPeriod] = useState<"week" | "month">("week");

  // Prepare data for charts
  const getMoodCounts = (days: number) => {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);

    const filteredEntries = moodEntries.filter(
      (entry) => new Date(entry.date) >= cutoff
    );

    const counts: Record<string, number> = {
      happy: 0,
      calm: 0,
      neutral: 0,
      sad: 0,
      angry: 0,
    };

    filteredEntries.forEach((entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });

    return counts;
  };

  const moodLabels: Record<string, string> = {
    happy: "행복",
    calm: "평온",
    neutral: "보통",
    sad: "슬픔",
    angry: "화남",
  };

  const moodColors: Record<string, string> = {
    happy: "#FFD700", // Gold
    calm: "#B2F5EA", // Mint
    neutral: "#E2E8F0", // Light Gray
    sad: "#A4DDED", // Light Blue
    angry: "#FED7D7", // Light Red
  };

  const getPieChartData = (days: number) => {
    const counts = getMoodCounts(days);
    return Object.entries(counts).map(([mood, count]) => ({
      name: moodLabels[mood],
      value: count,
      mood,
    }));
  };

  const weeklyData = getPieChartData(7);
  const monthlyData = getPieChartData(30);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4">기분 통계</h1>

        <Tabs defaultValue="week" onValueChange={(v) => setPeriod(v as "week" | "month")}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="week" className="flex-1">
              주간
            </TabsTrigger>
            <TabsTrigger value="month" className="flex-1">
              월간
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <CardContent className="p-4 pt-6">
              <h3 className="text-lg font-medium mb-3">
                {period === "week" ? "최근 7일" : "최근 30일"} 기분 변화
              </h3>
              <div className="h-64 w-full">
                <MoodChart entries={moodEntries} days={period === "week" ? 7 : 30} />
              </div>
            </CardContent>
          </Card>

          <div className="h-8"></div>
          
          <Card>
            <CardContent className="p-4 pt-6">
              <h3 className="text-lg font-medium mb-3">
                {period === "week" ? "주간" : "월간"} 기분 분포
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={period === "week" ? weeklyData : monthlyData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {(period === "week" ? weeklyData : monthlyData).map(
                        (entry, index) => (
                          <Cell key={`cell-${index}`} fill={moodColors[entry.mood]} />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-8"></div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-3">통계 요약</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>총 기록 횟수:</span>
                  <span className="font-medium">{period === "week" ? weeklyData.reduce((sum, item) => sum + item.value, 0) : monthlyData.reduce((sum, item) => sum + item.value, 0)}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>가장 많은 기분:</span>
                  <span className="font-medium">
                    {moodLabels[
                      Object.entries(period === "week" ? getMoodCounts(7) : getMoodCounts(30))
                        .sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral"
                    ]}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Stats;
