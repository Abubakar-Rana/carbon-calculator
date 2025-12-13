"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Legend, RadialBar, RadialBarChart, Tooltip, PolarAngleAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/ui/auth-modal"


export default function CarbonBNUVisualizer() {
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleOpenCalculator = () => {
    setShowAuthModal(true)
  }

  const handleAuthenticated = (isAdmin: boolean) => {
    if (isAdmin) {
      router.push("/admin")
    } else {
      router.push("/page1")
    }
  }

  // Scope 2 Data
  const scope2Data =  [
    { month: "Jan 2025", gridunitsConsumed: 80000, gridEmission: 49200 , solarProduction: 58632, savedEmissions: 36058.68 , netEmissions: 13141.32 },
    { month: "Feb 2025", gridunitsConsumed: 20000, gridEmission: 12300 , solarProduction: 46428, savedEmissions: 28553.22 , netEmissions: -16253.22 },
    { month: "Mar 2025", gridunitsConsumed: 4000,  gridEmission: 2460,   solarProduction: 52000, savedEmissions: 31980    , netEmissions: -29340 },
    { month: "Apr 2025", gridunitsConsumed: 76000, gridEmission: 46740,  solarProduction: 111099,savedEmissions: 68325.885, netEmissions: -21585.885 },
    { month: "May 2025", gridunitsConsumed: 116000, gridEmission: 71340, solarProduction: 103934,savedEmissions: 63919.41 , netEmissions: 7420.59 },
    { month: "Jun 2025", gridunitsConsumed: 148000, gridEmission: 91020, solarProduction: 91186, savedEmissions: 56079.39 , netEmissions: 34940.61 },
  ]
  // Scope 1 Data
  const scope1Data = [
    { month: "Jan 2025", dieselConsumption: 23267.72, emissionsinKg: 11095.2 },
    { month: "Feb 2025", dieselConsumption: 11032.63, emissionsinKg: 18191.84 },
    { month: "Mar 2025", dieselConsumption: 11100.8,  emissionsinKg: 10588.68 },
    { month: "Apr 2025", dieselConsumption: 21076.71, emissionsinKg: 8956.56 },
    { month: "May 2025", dieselConsumption: 12642.14, emissionsinKg: 7589.76 },
    { month: "Jun 2025", dieselConsumption: 12642.14, emissionsinKg: 11647.28 }, 
  ]

  // Scope 3 Data
  const scope3Data = [
  {
    month: "May 2025",
    bottles: 80.1,
    glass: 50.6,
    foodWaste: 2067.3,
    plastic: 13.2,
    cartons: 106,
    emissionsBottles: 200.25,
    emissionsGlass: 72.7122,
    emissionsFoodWaste: 2697.82,
    emissionsPlastic: 38.016,
    emissionsCartons: 99.64,
  },
  {
    month: "Jun 2025",
    bottles: 119.8,
    glass: 177.85,
    foodWaste: 1223,
    plastic: 69,
    cartons: 276.6,
    emissionsBottles: 299.5,
    emissionsGlass: 255.57,
    emissionsFoodWaste: 1596.015,
    emissionsPlastic: 198.72,
    emissionsCartons: 260.004,
  }
];

  // Calculate totals
  const totalScope2NetEmissions = scope2Data.reduce((sum, item) => sum + item.gridEmission, 0)
  const totalScope1Emissions = scope1Data.reduce((sum, item) => sum + item.emissionsinKg, 0)
  const totalScope3Emissions = 5718.25


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
  <section className="relative min-h-screen flex items-center text-white overflow-hidden bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 animate-gradient-x py-20">
  {/* Floating CO₂ particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <span className="particle left-[10%] top-[20%]">CO₂</span>
    <span className="particle left-[70%] top-[50%]">CO₂</span>
    <span className="particle left-[30%] top-[75%]">CO₂</span>
    <span className="particle left-[50%] top-[40%]">CO₂</span>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <div>
        <h1 className="text-6xl font-bold mb-6 tracking-tight hero-title">
          Carbon<span className="text-gray-400">BNU</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed hero-subtitle">
          Comprehensive carbon emissions visualization and monitoring system for Beaconhouse National University
        </p>
        <div className="flex gap-4 mb-6">
          <Badge variant="outline" className="text-white border-white">Real-time Monitoring</Badge>
          <Badge variant="outline" className="text-white border-white">Scope 1, 2 & 3 Tracking</Badge>
        </div>
        <Button 
          onClick={handleOpenCalculator}
          className="border-2 border-white bg-white text-black hero-button"
        >
          Open Emissions Calculator
        </Button>
      </div>

      {/* Map */}
      <div className="flex justify-center">
        <div className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.580035194876!2d74.21348101172664!3d31.364969974178265!2m3!1f0!2f3!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391855549698f6f7%3A0x4ffb44644f967144!2sBeaconhouse%20National%20University%20(BNU)!5e1!3m2!1sen!2s!4v1748977707563!5m2!1sen!2s"
            width="500"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale w-full h-[350px]"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Overview Section */}
      {/* Overview Section with Circular Progress */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16">
      Emissions Overview
    </h2>

    <div className="grid md:grid-cols-3 gap-12">
      {/* Scope 1 */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all">
        <RadialBarChart
          width={200}
          height={200}
          innerRadius="70%"
          outerRadius="100%"
          data={[
            { value: totalScope1Emissions, fill: "#dc2626" },
            { value: 100000 - totalScope1Emissions, fill: "#e5e7eb" },
          ]}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100000]} // adjust max scale here
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={50}
            animationDuration={1500}
          />
        </RadialBarChart>
        <h3 className="text-2xl font-bold mt-4">Scope 1</h3>
        <p className="text-lg font-semibold mt-2 text-red-600">
          {totalScope1Emissions.toLocaleString()} kg CO₂
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Diesel Generators (Jan-Jun 2025)
        </p>
      </div>

      {/* Scope 2 */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all">
        <RadialBarChart
          width={200}
          height={200}
          innerRadius="70%"
          outerRadius="100%"
          data={[
            { value: Math.abs(totalScope2NetEmissions), fill: "#16a34a" },
            { value: 200000 - Math.abs(totalScope2NetEmissions), fill: "#e5e7eb" },
          ]}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 200000]} // adjust scale
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={50}
            animationDuration={1500}
          />
        </RadialBarChart>
        <h3 className="text-2xl font-bold mt-4">Scope 2</h3>
        <p className="text-lg font-semibold mt-2 text-green-600">
          {Math.abs(totalScope2NetEmissions).toLocaleString()} kg CO₂
        </p>
        <p className="text-sm text-gray-500 mt-1">Electricity (Net)</p>
      </div>

      {/* Scope 3 */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all">
        <RadialBarChart
          width={200}
          height={200}
          innerRadius="70%"
          outerRadius="100%"
          data={[
            { value: totalScope3Emissions, fill: "#ea580c" },
            { value: 10000 - totalScope3Emissions, fill: "#e5e7eb" },
          ]}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 10000]} // adjust scale
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={50}
            animationDuration={1500}
          />
        </RadialBarChart>
        <h3 className="text-2xl font-bold mt-4">Scope 3</h3>
        <p className="text-lg font-semibold mt-2 text-orange-600">
          {totalScope3Emissions.toLocaleString()} kg CO₂e
        </p>
        <p className="text-sm text-gray-500 mt-1">Waste Emissions</p>
      </div>
    </div>
  </div>
</section>

      {/* Scope 1 Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Scope 1: Direct Emissions</h2>
          <p className="text-lg text-gray-600 mb-8">Monthly diesel generator usage and CO₂ emissions trend</p>

          <Card className="border-2 border-black w-full">
            <CardHeader>
              <CardTitle>Monthly Diesel Generator Emissions</CardTitle>
              <CardDescription>CO₂ emissions from diesel generators (kg)</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <ChartContainer
                config={{
                  emissions: {
                    label: "CO₂ Emissions (kg)",
                    color: "#000000",
                  },
                }}
                className="h-[300px] w-full"
              >
                <LineChart data={scope1Data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
  type="monotone"
  dataKey="emissionsinKg"
  stroke="var(--color-emissions)"
  strokeWidth={3}
  dot={{ fill: "var(--color-emissions)", strokeWidth: 2, r: 6 }}
  name="CO₂ Emissions (kg)"
/>

                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scope 2 Section */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-8">Scope 2: Electricity Emissions</h2>
    <p className="text-lg text-gray-600 mb-8">
      Grid emissions vs solar offset showing net carbon impact by months.
    </p>

    <Card className="border-2 border-black w-full">
      <CardHeader>
        <CardTitle>Grid Emissions vs Solar Offset</CardTitle>
        <CardDescription>These emissions include emissions from the grid and savings by solar.</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer
          config={{
            gridEmission: {
              label: "Grid Emissions",
              color: "#DC2626",
            },
            savedEmissions: {
              label: "Emission Saved by Solar",
              color: "#16A34A",
            },
            netEmissions: {
              label: "Net Emissions",
              color: "#333333",
            },
          }}
          className="h-[400px] w-full"
        >
          <BarChart data={scope2Data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            {/* Match dataKey to actual key in scope2Data */}
            <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} interval={0} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="gridEmission" fill="var(--color-gridEmission)" name="Grid Emissions" />
            <Bar dataKey="savedEmissions" fill="var(--color-savedEmissions)" name="Saved Emissions" />
            <Bar dataKey="netEmissions" fill="var(--color-netEmissions)" name="Net Emissions" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
</section>
      <Separator className="my-8" />

      
       {/* Scope 3 Section */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Scope 3: Indirect Emissions</h2>
        <p className="text-lg text-gray-600 mb-8">
          These are the emissions from waste production.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Waste Production Chart */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>Waste Production</CardTitle>
              <CardDescription>Monthly waste production by category (kg)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
  className="h-[300px]"
  config={{
    emissionsBottles: { color: "#1f77b4" },
    emissionsGlass: { color: "#ff7f0e" },
    emissionsFoodWaste: { color: "#2ca02c" },
    emissionsPlastic: { color: "#d62728" },
    emissionsCartons: { color: "#9467bd" }
  }}
>
                <BarChart data={scope3Data} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="month" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="bottles" fill="#1f77b4" name="Bottles (kg)" />
                  <Bar dataKey="glass" fill="#ff7f0e" name="Glass (kg)" />
                  <Bar dataKey="foodWaste" fill="#2ca02c" name="Food Waste (kg)" />
                  <Bar dataKey="plastic" fill="#d62728" name="Plastic (kg)" />
                  <Bar dataKey="cartons" fill="#9467bd" name="Cartons (kg)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Emissions Chart */}
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>Emissions by Waste</CardTitle>
              <CardDescription>Monthly emissions by category (KgCO₂e)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
  className="h-[300px]"
  config={{
    emissionsBottles: { color: "#1f77b4" },
    emissionsGlass: { color: "#ff7f0e" },
    emissionsFoodWaste: { color: "#2ca02c" },
    emissionsPlastic: { color: "#d62728" },
    emissionsCartons: { color: "#9467bd" }
  }}
>
                <BarChart data={scope3Data} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="month" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="emissionsBottles" fill="#1f77b4" name="Bottles (KgCO₂e)" />
                  <Bar dataKey="emissionsGlass" fill="#ff7f0e" name="Glass (KgCO₂e)" />
                  <Bar dataKey="emissionsFoodWaste" fill="#2ca02c" name="Food Waste (KgCO₂e)" />
                  <Bar dataKey="emissionsPlastic" fill="#d62728" name="Plastic (KgCO₂e)" />
                  <Bar dataKey="emissionsCartons" fill="#9467bd" name="Cartons (KgCO₂e)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Scope 3 Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>Total Waste Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(
                  scope3Data.reduce(
                    (sum, m) =>
                      sum +
                      m.emissionsBottles +
                      m.emissionsGlass +
                      m.emissionsFoodWaste +
                      m.emissionsPlastic +
                      m.emissionsCartons,
                    0
                  )
                ).toFixed(2)}{" "}
                KgCO₂e/two months
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle>Total Waste Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(
                  scope3Data.reduce(
                    (sum, m) =>
                      sum + m.bottles + m.glass + m.foodWaste + m.plastic + m.cartons,
                    0
                  )
                ).toFixed(2)}{" "}
                kg/two months
              </div>
              <p className="text-sm text-gray-600 mt-2">Scope 3 Category 5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section> 
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">CarbonBNU</h3>
          <p className="text-gray-400 mb-4">
            Monitoring and visualizing carbon emissions across Beaconhouse National University
          </p>
          <p className="text-sm text-gray-500">Data updated regularly • Scope 1, 2 & 3 emissions tracking</p>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  )
}
