"use client";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { formatMoney } from "@/lib/calc";

export function MoneyChart({ data }: { data: { year: number; value: number }[] }) {
  return (
    <div className="h-48 sm:h-56 -mx-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
          <CartesianGrid stroke="var(--rule)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "var(--ink-soft)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "var(--ink)" }}
            tickLine={false}
            label={{ value: "years", position: "insideBottom", offset: -2, fill: "var(--ink-soft)", fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: "var(--ink-soft)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={{ stroke: "var(--ink)" }}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "2px solid var(--ink)",
              borderRadius: 12,
              boxShadow: "3px 3px 0 var(--ink)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
            formatter={(v) => formatMoney(Number(v))}
            labelFormatter={(l) => `Year ${l}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--accent-leaf)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: "var(--accent-leaf)", stroke: "var(--ink)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
