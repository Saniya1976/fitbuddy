"use client"

import type React from "react"

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
} from "recharts"

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const LineChart = ({ data, children }: { data: any[]; children: React.ReactNode }) => {
  return <RechartsLineChart data={data}>{children}</RechartsLineChart>
}

export const Line = (props: any) => {
  return <RechartsLine {...props} />
}

export const XAxis = (props: any) => {
  return <RechartsXAxis {...props} />
}

export const YAxis = (props: any) => {
  return <RechartsYAxis {...props} />
}

export const ChartTooltip = (props: any) => {
  return <RechartsTooltip {...props} />
}

export const ChartTooltipContent = ({ label, payload }: { label: string; payload: any[] }) => {
  return (
    <div className="p-2">
      <p className="font-semibold">{label}</p>
      {payload &&
        payload.map((item, index) => (
          <p key={index} className="text-sm">
            {item.name}: {item.value}
          </p>
        ))}
    </div>
  )
}

