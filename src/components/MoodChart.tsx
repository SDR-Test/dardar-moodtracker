
import React from "react";
import { MoodEntry } from "@/types";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { format, subDays } from "date-fns";

interface MoodChartProps {
  entries: MoodEntry[];
  days?: number;
}

const MoodChart: React.FC<MoodChartProps> = ({ entries, days = 7 }) => {
  // Map mood to numeric value for chart
  const moodValue = (mood: string): number => {
    switch (mood) {
      case "happy": return 5;
      case "calm": return 4;
      case "neutral": return 3;
      case "sad": return 2;
      case "angry": return 1;
      default: return 0;
    }
  };

  // Generate labels for the past N days
  const generateDateLabels = () => {
    const labels = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      labels.push(format(date, "MM/dd"));
    }
    return labels;
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    const dateLabels = generateDateLabels();
    const chartData = dateLabels.map(label => {
      // Find entry for this date if it exists
      const matchingEntries = entries.filter(entry => 
        format(entry.date, "MM/dd") === label
      );
      
      // If multiple entries for same day, use the average mood
      const moodSum = matchingEntries.reduce((sum, entry) => sum + moodValue(entry.mood), 0);
      const avgMood = matchingEntries.length > 0 ? moodSum / matchingEntries.length : null;
      
      return {
        date: label,
        mood: avgMood
      };
    });
    
    return chartData;
  };

  const chartData = prepareChartData();
  
  // Custom tooltip to show mood emoji
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let moodEmoji = "";
      let moodText = "";
      
      if (value === 5) { moodEmoji = "😊"; moodText = "행복"; }
      else if (value === 4) { moodEmoji = "😌"; moodText = "평온"; }
      else if (value === 3) { moodEmoji = "😐"; moodText = "보통"; }
      else if (value === 2) { moodEmoji = "😢"; moodText = "슬픔"; }
      else if (value === 1) { moodEmoji = "😠"; moodText = "화남"; }
      
      return (
        <div className="bg-white p-2 rounded shadow border">
          <p className="text-sm">{label}</p>
          <p className="text-lg">
            {moodEmoji} {moodText}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]}
            tick={{fontSize: 12}}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="#A4DDED" 
            strokeWidth={2} 
            dot={{ r: 4, fill: "#D6BCFA" }}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
