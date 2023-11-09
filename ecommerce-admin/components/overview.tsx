"use client";

// charts
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// overview props
type OverviewProps = {
  data: any[];
};

// overview
export const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      {/* bar chart */}
      <BarChart data={data}>
        {/* x-axis */}
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        {/* y-axis */}
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />

        {/* filled bar */}
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
