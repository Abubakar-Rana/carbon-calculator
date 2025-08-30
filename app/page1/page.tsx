"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// --------------------------------------------------------
// Emission Factors (from Carbon Footprint Formulas.pdf)
// --------------------------------------------------------
// Scope 1
const EF_DIESEL_KG_PER_L = 2.68;
const EF_NATURAL_GAS_KG_PER_M3 = 1.9;
const EF_LPG_KG_PER_KG = 3.0;

const VEHICLE_EF_KG_PER_KM: Record<string, number> = {
  "Small Petrol Car": 0.192,
  "Large Petrol Car": 0.282,
  "Small Diesel Car": 0.171,
  "Large Diesel Car": 0.210,
  "Motorcycle": 0.103,
  "Electric Car": 0.050,
};

// Scope 2 (Pakistan grid factor from PDF)
const EF_ELECTRICITY_KG_PER_KWH = 0.615;

// --------------------------------------------------------
// Helper Components
// --------------------------------------------------------
function FieldRow({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-800">{label}</label>
      <div className="flex items-center gap-3">{children}</div>
      {hint ? <p className="text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  min = 0,
  step = "any",
  className = "",
}: {
  value: number | string;
  onChange: (v: number) => void;
  placeholder?: string;
  min?: number;
  step?: number | "any";
  className?: string;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      min={min}
      step={step}
      className={`w-full rounded-md border-2 border-black/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition ${className}`}
    />
  );
}

// --------------------------------------------------------
// Page Component
// --------------------------------------------------------
export default function CarbonBNUToolPage() {
  // ------------------ Scope 1 ------------------
  const [dieselLiters, setDieselLiters] = useState<number>(0);
  const [gasM3, setGasM3] = useState<number>(0);
  const [lpgKg, setLpgKg] = useState<number>(0);

  const [vehicleDistanceKm, setVehicleDistanceKm] = useState<number>(0);
  const [vehicleType, setVehicleType] = useState<string>("Small Petrol Car");

  const scope1_diesel_kg = useMemo(() => dieselLiters * EF_DIESEL_KG_PER_L, [dieselLiters]);
  const scope1_gas_kg = useMemo(() => gasM3 * EF_NATURAL_GAS_KG_PER_M3, [gasM3]);
  const scope1_lpg_kg = useMemo(() => lpgKg * EF_LPG_KG_PER_KG, [lpgKg]);
  const scope1_vehicle_kg = useMemo(
    () => vehicleDistanceKm * (VEHICLE_EF_KG_PER_KM[vehicleType] ?? 0),
    [vehicleDistanceKm, vehicleType]
  );
  const scope1_total_kg = scope1_diesel_kg + scope1_gas_kg + scope1_lpg_kg + scope1_vehicle_kg;

  // ------------------ Scope 2 ------------------
  const [electricityKWh, setElectricityKWh] = useState<number>(0);
  const [solarKWh, setSolarKWh] = useState<number>(0);

  const scope2_electricity_kg = useMemo(() => electricityKWh * EF_ELECTRICITY_KG_PER_KWH, [electricityKWh]);
  const scope2_solar_offset_kg = useMemo(() => solarKWh * EF_ELECTRICITY_KG_PER_KWH, [solarKWh]);
  const scope2_net_kg = scope2_electricity_kg - scope2_solar_offset_kg;

  // ------------------ Scope 3 ------------------


  // Waste
  // Waste Categories EF
const EF_WASTE = {
  food: 1.305,
  plastic: 2.88,
  bottles: 2.5,
  glass: 1.437,
  cartons: 0.94,
};

const [foodWaste, setFoodWaste] = useState<number>(0);
const [plasticWaste, setPlasticWaste] = useState<number>(0);
const [bottleWaste, setBottleWaste] = useState<number>(0);
const [glassWaste, setGlassWaste] = useState<number>(0);
const [cartonWaste, setCartonWaste] = useState<number>(0);

const scope3_waste_kg = useMemo(
  () =>
    foodWaste * EF_WASTE.food +
    plasticWaste * EF_WASTE.plastic +
    bottleWaste * EF_WASTE.bottles +
    glassWaste * EF_WASTE.glass +
    cartonWaste * EF_WASTE.cartons,
  [foodWaste, plasticWaste, bottleWaste, glassWaste, cartonWaste]
);


  // Scope 3 Total
  const scope3_total_kg = scope3_waste_kg 
  // Grand totals
  const total_emissions_kg = scope1_total_kg + scope2_net_kg + scope3_total_kg;
  const net_emissions_kg = total_emissions_kg; // (solar already netted in Scope 2)

  const scopeSummary = useMemo(
    () => [
      { scope: "Scope 1", value: Number(scope1_total_kg.toFixed(2)) },
      { scope: "Scope 2 (Net)", value: Number(scope2_net_kg.toFixed(2)) },
      { scope: "Scope 3", value: Number(scope3_total_kg.toFixed(2)) },
    ],
    [scope1_total_kg, scope2_net_kg, scope3_total_kg]
  );

  // --------------------------------------------------------
  // UI
  // --------------------------------------------------------
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero / Header */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              CarbonBNU • Emissions Calculator
            </h1>
            <p className="text-gray-300 text-base md:text-lg">
              Enter your activity data to calculate <span className="font-semibold">Scope 1, 2 & 3</span> emissions.
              Factors are aligned with your university guide.
            </p>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-white border-white">Realtime Calc</Badge>
              <Badge variant="outline" className="text-white border-white">Emission Factors in Pakistani context.</Badge>
              <Badge variant="outline" className="text-white border-white">Scope 1 • 2 • 3</Badge>
            </div>
          </div>
          <div className="flex-1 w-full">
            <Card className="border-2 border-white/30 bg-white/5 backdrop-blur-sm transition hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-white">Quick Totals</CardTitle>
                <CardDescription className="text-gray-300">Auto-updates as you type</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-gray-300">Scope 1</p>
                  <p className="text-xl font-bold">{scope1_total_kg.toFixed(2)} kg</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-gray-300">Scope 2 (Net)</p>
                  <p className="text-xl font-bold">{scope2_net_kg.toFixed(2)} kg</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-gray-300">Scope 3</p>
                  <p className="text-xl font-bold">{scope3_total_kg.toFixed(2)} kg</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10 col-span-2 md:col-span-1">
                  <p className="text-xs text-gray-300">Grand Total</p>
                  <p className="text-xl font-bold">{net_emissions_kg.toFixed(2)} kg</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Scope 1 ----------------------------------------------------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Scope 1: Direct Emissions</h2>
          <p className="text-gray-600">Enter owned/controlled sources as per your guide.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diesel */}
            <Card className="border-2 border-black transition hover:shadow-xl hover:translate-y-[-2px]">
              <CardHeader>
                <CardTitle>Diesel Fuel (Generators)</CardTitle>
                <CardDescription>The amount of disel used on campus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldRow label="Diesel (liters)">
                  <NumberInput value={dieselLiters} onChange={setDieselLiters} placeholder="e.g., 1200" />
                </FieldRow>
                <Separator />
                <div className="text-sm">
                  <span className="font-semibold">Emissions:</span>{" "}
                  {scope1_diesel_kg.toFixed(2)} kg CO₂
                </div>
              </CardContent>
            </Card>

            {/* Natural Gas / LPG */}
            <Card className="border-2 border-black transition hover:shadow-xl hover:translate-y-[-2px]">
              <CardHeader>
                <CardTitle>Natural Gas & LPG</CardTitle>
                <CardDescription>Only enter if used on campus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldRow label="Natural Gas (m³)">
                  <NumberInput value={gasM3} onChange={setGasM3} placeholder="e.g., 500" />
                </FieldRow>
                <FieldRow label="LPG (kg)">
                  <NumberInput value={lpgKg} onChange={setLpgKg} placeholder="e.g., 200" />
                </FieldRow>
                <Separator />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-semibold">NG:</span> {scope1_gas_kg.toFixed(2)} kg</div>
                  <div><span className="font-semibold">LPG:</span> {scope1_lpg_kg.toFixed(2)} kg</div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicles */}
            <Card className="border-2 border-black transition hover:shadow-xl hover:translate-y-[-2px] md:col-span-2">
              <CardHeader>
                <CardTitle>Campus-Owned Vehicles</CardTitle>
                <CardDescription>Only Enter if the vehicles owned and controlled by university.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FieldRow label="Distance (km)">
                    <NumberInput value={vehicleDistanceKm} onChange={setVehicleDistanceKm} placeholder="e.g., 1500" />
                  </FieldRow>
                  <FieldRow label="Vehicle Type">
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full rounded-md border-2 border-black/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                    >
                      {Object.keys(VEHICLE_EF_KG_PER_KM).map((vt) => (
                        <option key={vt} value={vt}>{vt}</option>
                      ))}
                    </select>
                  </FieldRow>
                  <div className="flex items-end">
                    <div className="text-sm">
                      <span className="font-semibold">Emissions:</span>{" "}
                      {scope1_vehicle_kg.toFixed(2)} kg CO₂
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-black">
            <CardContent className="flex items-center justify-between py-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Scope 1 Total:</span> {scope1_total_kg.toFixed(2)} kg CO₂
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Scope 2 ----------------------------------------------------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Scope 2: Purchased Electricity</h2>
          <p className="text-gray-600">The emission factors are based on Pakistan’s context after careful research, with solar offsets subtracted.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Electricity */}
            <Card className="border-2 border-black transition hover:shadow-xl hover:translate-y-[-2px]">
              <CardHeader>
                <CardTitle>Electricity Consumption</CardTitle>
                <CardDescription>Enter the net units consumed by university.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldRow label="Electricity (kWh)">
                  <NumberInput value={electricityKWh} onChange={setElectricityKWh} placeholder="e.g., 24000" />
                </FieldRow>
                <Separator />
                <div className="text-sm">
                  <span className="font-semibold">Emissions:</span>{" "}
                  {scope2_electricity_kg.toFixed(2)} kg CO₂
                </div>
              </CardContent>
            </Card>

            {/* Solar */}
            <Card className="border-2 border-black transition hover:shadow-xl hover:translate-y-[-2px]">
              <CardHeader>
                <CardTitle>Solar Offset</CardTitle>
                <CardDescription>The offset will be subtracted in the end.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldRow label="Solar Production (kWh)">
                  <NumberInput value={solarKWh} onChange={setSolarKWh} placeholder="e.g., 12000" />
                </FieldRow>
                <Separator />
                <div className="text-sm">
                  <span className="font-semibold">Offset:</span>{" "}
                  {scope2_solar_offset_kg.toFixed(2)} kg CO₂
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-black">
            <CardContent className="flex items-center justify-between py-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Scope 2 Net:</span> {scope2_net_kg.toFixed(2)} kg CO₂
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Scope 3 ----------------------------------------------------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Scope 3: Other Indirect Emissions</h2>
          <p className="text-gray-600">Commute, labs, appliances, water, internet, waste, paper, food.</p>


          {/* Water / Internet / Waste / Paper / Food */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-black w-full md:col-span-2">
  <CardHeader>
    <CardTitle>Emissions from Waste</CardTitle>
    <CardDescription className="text-sm">
      These emissions are from different waste catagories.
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <FieldRow label="Food Waste (kg)">
          <NumberInput value={foodWaste} onChange={setFoodWaste} placeholder="e.g., 100" />
        </FieldRow>
      </div>

      <div>
        <FieldRow label="Plastic (kg)">
          <NumberInput value={plasticWaste} onChange={setPlasticWaste} placeholder="e.g., 50" />
        </FieldRow>
      </div>

      <div>
        <FieldRow label="Bottles (kg)">
          <NumberInput value={bottleWaste} onChange={setBottleWaste} placeholder="e.g., 30" />
        </FieldRow>
      </div>

      <div>
        <FieldRow label="Glass (kg)">
          <NumberInput value={glassWaste} onChange={setGlassWaste} placeholder="e.g., 20" />
        </FieldRow>
      </div>

      <div className="md:col-span-2">
        <FieldRow label="Cartons (kg)">
          <NumberInput value={cartonWaste} onChange={setCartonWaste} placeholder="e.g., 40" />
        </FieldRow>
      </div>
    </div>

    <Separator />

    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="text-sm font-semibold">Total Emissions: {scope3_waste_kg.toFixed(2)} kg CO₂</div>
    </div>
  </CardContent>
</Card>
          </div>

          <Card className="border-2 border-black">
            <CardContent className="flex items-center justify-between py-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Scope 3 Total:</span> {scope3_total_kg.toFixed(2)} kg CO₂
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Summary ----------------------------------------------------- */}
{/* Summary ----------------------------------------------------- */}
<section className="space-y-6">
      <h2 className="text-3xl font-bold">Summary & Chart</h2>
      <p className="text-gray-600">All scopes consolidated. Solar offset already applied to Scope 2.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <Card className="border-2 border-black lg:col-span-2">
          <CardHeader>
            <CardTitle>Scope Distribution</CardTitle>
            <CardDescription>Bar chart of Scope totals (kg CO₂)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={scopeSummary} 
                  barSize={50} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scope" />
                  <YAxis domain={[0, "dataMax + 500"]} /> {/* ensures bars aren’t cut off */}
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#000000" name="kg CO₂e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Totals Card */}
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Totals</CardTitle>
            <CardDescription>Auto-updated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scope 1</span>
              <span className="font-semibold">{scope1_total_kg.toFixed(2)} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Scope 2 (Net)</span>
              <span className="font-semibold">{scope2_net_kg.toFixed(2)} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Scope 3</span>
              <span className="font-semibold">{scope3_total_kg.toFixed(2)} kg</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold">Grand Total</span>
              <span className="font-bold">{net_emissions_kg.toFixed(2)} kg</span>
            </div>
            <div className="pt-2">
              <Link href="/">
                <Button className="w-full border-2 border-black" variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4 text-center space-y-2">
          <h3 className="text-xl font-bold">CarbonBNU</h3>
          <p className="text-sm text-gray-400">University Carbon Emissions Calculator • Scope 1, 2 & 3</p>
        </div>
      </footer>
    </div>
  );
}