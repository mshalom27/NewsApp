import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

import { ChartContainer } from "../ui/chart"

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
}

const DashboardCard = ({
  title,
  description,
  endAngle,
  totalValue,
  lastMonthValue,
  footerText,
  chartData,
  chartConfig,
}) => {
  return (
    

    <Card className="flex flex-col bg-amber-100 border border-amber-200 shadow-sm rounded-lg">
  <CardHeader className="items-center text-center pb-0">
    <CardTitle className="text-xl font-bold text-slate-800">{title}</CardTitle>
    <CardDescription className="text-sm text-slate-500">{description}</CardDescription>
  </CardHeader>

  <CardContent className="flex-1 pb-0 mt-4">
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[200px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={endAngle}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="value" background fill="#f59e0b" cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-slate-800 text-4xl font-bold"
                    >
                      {totalValue.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-gray-400 text-sm"
                    >
                      Total
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  </CardContent>

  <CardFooter className="flex-col gap-2 mt-2 text-sm px-6 pb-6 text-center">
    <div className="flex items-center justify-center gap-2 font-medium text-slate-700">
      Last month: {lastMonthValue} <TrendingUp className="h-4 w-4 text-amber-600" />
    </div>
    <div className="text-gray-500 italic">{footerText}</div>
  </CardFooter>
</Card>

  )
}

export default DashboardCard
