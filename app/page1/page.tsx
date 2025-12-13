// "use client";

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { Leaf, Zap, Trash2, Factory, Car, Wind, TrendingDown, Calculator, Sun } from "lucide-react";
// import { exportCarbonReport } from "@/lib/reportgenerator";


// // ---------- Type Definitions ----------


// interface NumberInputProps {
//   value: number;
//   onChange: (v: number) => void;
//   placeholder?: string;
// }

// interface FieldRowProps {
//   label: string;
//   children: React.ReactNode;
// }

// // ---------- Reusable Components ----------
// const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, placeholder }) => (
//   <input
//     type="number"
//     value={value}
//     onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
//     placeholder={placeholder}
//     className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
//   />
// );

// const FieldRow: React.FC<FieldRowProps> = ({ label, children }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     {children}
//   </div>
// );

// // ---------- Main Component ----------
// export default function CarbonCalculator() {
//   const [dieselLiters, setDieselLiters] = useState(0);
//   const [gasM3, setGasM3] = useState(0);
//   const [lpgKg, setLpgKg] = useState(0);
//   const [vehicleDistanceKm, setVehicleDistanceKm] = useState(0);
//   const [vehicleType, setVehicleType] = useState<keyof typeof VEHICLE_EF_KG_PER_KM>("Small Petrol Car");
//   const [electricityKWh, setElectricityKWh] = useState(0);
//   const [solarKWh, setSolarKWh] = useState(0);
//   const [foodWaste, setFoodWaste] = useState(0);
//   const [plasticWaste, setPlasticWaste] = useState(0);
//   const [bottleWaste, setBottleWaste] = useState(0);
//   const [glassWaste, setGlassWaste] = useState(0);
//   const [cartonWaste, setCartonWaste] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => setIsVisible(true), []);

//   // Emission factors
//   const EF_DIESEL_KG_PER_L = 2.68;
//   const EF_NATURAL_GAS_KG_PER_M3 = 1.9;
//   const EF_LPG_KG_PER_KG = 3.0;
//   const EF_ELECTRICITY_KG_PER_KWH = 0.615;

//   const VEHICLE_EF_KG_PER_KM = {
//     "Small Petrol Car": 0.192,
//     "Large Petrol Car": 0.282,
//     "Small Diesel Car": 0.171,
//     "Large Diesel Car": 0.21,
//     Motorcycle: 0.103,
//     "Electric Car": 0.05,
//   };

//   const EF_WASTE = {
//     food: 1.305,
//     plastic: 2.88,
//     bottles: 2.5,
//     glass: 1.437,
//     cartons: 0.94,
//   };

//   // --- Emission Calculations ---
//   const scope1_diesel_kg = dieselLiters * EF_DIESEL_KG_PER_L;
//   const scope1_gas_kg = gasM3 * EF_NATURAL_GAS_KG_PER_M3;
//   const scope1_lpg_kg = lpgKg * EF_LPG_KG_PER_KG;
//   const scope1_vehicle_kg = vehicleDistanceKm * (VEHICLE_EF_KG_PER_KM[vehicleType] || 0);
//   const scope1_total_kg = scope1_diesel_kg + scope1_gas_kg + scope1_lpg_kg + scope1_vehicle_kg;

//   const scope2_electricity_kg = electricityKWh * EF_ELECTRICITY_KG_PER_KWH;
//   const scope2_solar_offset_kg = solarKWh * EF_ELECTRICITY_KG_PER_KWH;
//   const scope2_net_kg = scope2_electricity_kg - scope2_solar_offset_kg;

//   const scope3_waste_kg =
//     foodWaste * EF_WASTE.food +
//     plasticWaste * EF_WASTE.plastic +
//     bottleWaste * EF_WASTE.bottles +
//     glassWaste * EF_WASTE.glass +
//     cartonWaste * EF_WASTE.cartons;

//   const scope3_total_kg = scope3_waste_kg;
//   const net_emissions_kg = scope1_total_kg + scope2_net_kg + scope3_total_kg;

//   const scopeSummary = [
//     { scope: "Scope 1", value: scope1_total_kg },
//     { scope: "Scope 2", value: scope2_net_kg },
//     { scope: "Scope 3", value: scope3_total_kg },
//   ];


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
//       <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20 overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
//           <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
//         </div>

//         <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             <div className="flex-1 space-y-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <Leaf className="w-12 h-12 animate-pulse" />
//                 <h1 className="text-5xl md:text-6xl font-bold tracking-tight">CarbonBNU</h1>
//               </div>
//               <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl">
//                 Calculate your carbon footprint with precision. Track <span className="font-bold text-white">Scope 1, 2 & 3</span> emissions 
//                 using Pakistan-contextualized emission factors.
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <Calculator className="w-4 h-4 mr-2" />
//                   Real-time Calculations
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <TrendingDown className="w-4 h-4 mr-2" />
//                   Pakistan Context
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <Wind className="w-4 h-4 mr-2" />
//                   All Scopes Covered
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex-1 w-full">
//               <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="text-2xl text-gray-800">Emission Overview</CardTitle>
//                   <CardDescription className="text-gray-600">Live calculations as you input data</CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Factory className="w-4 h-4 text-emerald-600" />
//                       <p className="text-xs font-medium text-emerald-700">Scope 1</p>
//                     </div>
//                     <p className="text-2xl font-bold text-emerald-800">{scope1_total_kg.toFixed(1)}</p>
//                     <p className="text-xs text-emerald-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Zap className="w-4 h-4 text-blue-600" />
//                       <p className="text-xs font-medium text-blue-700">Scope 2</p>
//                     </div>
//                     <p className="text-2xl font-bold text-blue-800">{scope2_net_kg.toFixed(1)}</p>
//                     <p className="text-xs text-blue-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Trash2 className="w-4 h-4 text-purple-600" />
//                       <p className="text-xs font-medium text-purple-700">Scope 3</p>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-800">{scope3_total_kg.toFixed(1)}</p>
//                     <p className="text-xs text-purple-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <TrendingDown className="w-4 h-4 text-white" />
//                       <p className="text-xs font-medium text-gray-300">Total</p>
//                     </div>
//                     <p className="text-2xl font-bold text-white">{net_emissions_kg.toFixed(1)}</p>
//                     <p className="text-xs text-gray-400">kg CO₂e</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-6 py-16 space-y-20">
//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-emerald-100 rounded-xl">
//               <Factory className="w-8 h-8 text-emerald-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 1</h2>
//               <p className="text-gray-600 mt-1">Direct emissions from owned sources</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Factory className="w-5 h-5 text-emerald-600" />
//                   Diesel Generators
//                 </CardTitle>
//                 <CardDescription>Campus diesel consumption</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Diesel Consumed (liters)">
//                   <NumberInput value={dieselLiters} onChange={setDieselLiters} placeholder="e.g., 1200" />
//                 </FieldRow>
//                 <Separator />
//                 <div className="p-4 bg-emerald-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Emissions Generated</p>
//                   <p className="text-2xl font-bold text-emerald-700">{scope1_diesel_kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Wind className="w-5 h-5 text-orange-600" />
//                   Natural Gas & LPG
//                 </CardTitle>
//                 <CardDescription>Gas consumption on campus</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Natural Gas (m³)">
//                   <NumberInput value={gasM3} onChange={setGasM3} placeholder="e.g., 500" />
//                 </FieldRow>
//                 <FieldRow label="LPG (kg)">
//                   <NumberInput value={lpgKg} onChange={setLpgKg} placeholder="e.g., 200" />
//                 </FieldRow>
//                 <Separator />
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="p-3 bg-orange-50 rounded-lg">
//                     <p className="text-xs text-gray-600">Natural Gas</p>
//                     <p className="text-lg font-bold text-orange-700">{scope1_gas_kg.toFixed(1)} kg</p>
//                   </div>
//                   <div className="p-3 bg-amber-50 rounded-lg">
//                     <p className="text-xs text-gray-600">LPG</p>
//                     <p className="text-lg font-bold text-amber-700">{scope1_lpg_kg.toFixed(1)} kg</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white md:col-span-2">
//               <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Car className="w-5 h-5 text-blue-600" />
//                   Campus-Owned Vehicles
//                 </CardTitle>
//                 <CardDescription>University-controlled transportation</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <FieldRow label="Distance Traveled (km)">
//                     <NumberInput value={vehicleDistanceKm} onChange={setVehicleDistanceKm} placeholder="e.g., 1500" />
//                   </FieldRow>
//                   <FieldRow label="Vehicle Type">
//                     <select
//                       value={vehicleType}
//                       onChange={(e) => setVehicleType(e.target.value as typeof vehicleType)}
//                       className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       {Object.keys(VEHICLE_EF_KG_PER_KM).map((vt) => (
//                         <option key={vt} value={vt}>{vt}</option>
//                       ))}
//                     </select>
//                   </FieldRow>
//                   <div className="flex items-end">
//                     <div className="p-4 bg-blue-50 rounded-lg w-full">
//                       <p className="text-xs text-gray-600">Emissions</p>
//                       <p className="text-xl font-bold text-blue-700">{scope1_vehicle_kg.toFixed(2)} kg</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-emerald-100 text-sm mb-1">Scope 1 Total Emissions</p>
//                   <p className="text-4xl font-bold">{scope1_total_kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Factory className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-xl">
//               <Zap className="w-8 h-8 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 2</h2>
//               <p className="text-gray-600 mt-1">Purchased electricity with solar offsets</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Zap className="w-5 h-5 text-blue-600" />
//                   Grid Electricity
//                 </CardTitle>
//                 <CardDescription>Power consumed from the grid</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Electricity Consumed (kWh)">
//                   <NumberInput value={electricityKWh} onChange={setElectricityKWh} placeholder="e.g., 24000" />
//                 </FieldRow>
//                 <Separator />
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Grid Emissions</p>
//                   <p className="text-2xl font-bold text-blue-700">{scope2_electricity_kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Leaf className="w-5 h-5 text-yellow-600" />
//                   Solar Production
//                 </CardTitle>
//                 <CardDescription>Renewable energy offset</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Solar Energy (kWh)">
//                   <NumberInput value={solarKWh} onChange={setSolarKWh} placeholder="e.g., 12000" />
//                 </FieldRow>
//                 <Separator />
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Carbon Offset</p>
//                   <p className="text-2xl font-bold text-green-700">-{scope2_solar_offset_kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-sm mb-1">Scope 2 Net Emissions</p>
//                   <p className="text-4xl font-bold">{scope2_net_kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Zap className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-purple-100 rounded-xl">
//               <Trash2 className="w-8 h-8 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 3</h2>
//               <p className="text-gray-600 mt-1">Other indirect emissions</p>
//             </div>
//           </div>

//           <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
//             <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
//               <CardTitle className="flex items-center gap-2">
//                 <Trash2 className="w-5 h-5 text-purple-600" />
//                 Waste Management
//               </CardTitle>
//               <CardDescription>Emissions from different waste categories</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <FieldRow label="Food Waste (kg)">
//                   <NumberInput value={foodWaste} onChange={setFoodWaste} placeholder="e.g., 100" />
//                 </FieldRow>
//                 <FieldRow label="Plastic (kg)">
//                   <NumberInput value={plasticWaste} onChange={setPlasticWaste} placeholder="e.g., 50" />
//                 </FieldRow>
//                 <FieldRow label="Bottles (kg)">
//                   <NumberInput value={bottleWaste} onChange={setBottleWaste} placeholder="e.g., 30" />
//                 </FieldRow>
//                 <FieldRow label="Glass (kg)">
//                   <NumberInput value={glassWaste} onChange={setGlassWaste} placeholder="e.g., 20" />
//                 </FieldRow>
//                 <FieldRow label="Cartons (kg)">
//                   <NumberInput value={cartonWaste} onChange={setCartonWaste} placeholder="e.g., 40" />
//                 </FieldRow>
//               </div>
//               <Separator />
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Total Waste Emissions</p>
//                 <p className="text-2xl font-bold text-purple-700">{scope3_waste_kg.toFixed(2)} kg CO₂e</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm mb-1">Scope 3 Total Emissions</p>
//                   <p className="text-4xl font-bold">{scope3_total_kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Trash2 className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gray-800 rounded-xl">
//               <TrendingDown className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Summary & Analytics</h2>
//               <p className="text-gray-600 mt-1">Comprehensive emission breakdown</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <Card className="border-0 shadow-lg lg:col-span-2 bg-white">
//               <CardHeader>
//                 <CardTitle>Scope Distribution</CardTitle>
//                 <CardDescription>Comparative emissions by scope</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={scopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                       <defs>
//                         <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#10b981" />
//                           <stop offset="100%" stopColor="#059669" />
//                         </linearGradient>
//                       </defs>
//                                             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                       <XAxis dataKey="scope" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="url(#colorGradient)" barSize={50} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg bg-white">
//               <CardHeader>
//                 <CardTitle>Emission Share</CardTitle>
//                 <CardDescription>Scope contribution to total CO₂e</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={scopeSummary}
//                         dataKey="value"
//                         nameKey="scope"
//                         innerRadius={60}
//                         outerRadius={100}
//                         paddingAngle={3}
//                       >
//                         {scopeSummary.map((entry, index) => {
//                           const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
//                           return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
//                         })}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white">
//             <CardContent className="py-8 flex justify-between items-center">
//               <div>
//                 <p className="text-gray-300 text-sm mb-1">Net Total Emissions</p>
//                 <p className="text-5xl font-bold">{net_emissions_kg.toFixed(2)} kg CO₂e</p>
//               </div>
//               <Calculator className="w-16 h-16 opacity-20" />
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//       <div id="carbon-report" className="p-8 bg-gradient-to-b from-white via-emerald-50 to-blue-50 rounded-3xl shadow-lg space-y-12">

//   {/* Header */}
//   <header className="text-center space-y-3 border-b border-emerald-200 pb-6">
//     <h1 className="text-5xl font-bold text-emerald-700">CarbonBNU Emission Report</h1>
//     <p className="text-lg text-gray-600">
//       Comprehensive Scope 1, 2 & 3 Emission Analysis with Solar Offset
//     </p>
//     <div className="flex justify-center items-center gap-3 text-sm text-gray-500">
//       <Leaf className="w-4 h-4 text-emerald-500" />
//       <span>Generated by CarbonBNU Dashboard</span>
//     </div>
//   </header>

//  {/* Scope Summary Cards */}
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//   {/* Scope 1 */}
//   <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm">
//     <CardHeader className="pb-2">
//       <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
//         <Factory className="w-5 h-5" /> Scope 1
//       </CardTitle>
//       <CardDescription className="text-sm text-emerald-600">Direct emissions</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <p className="text-3xl font-bold text-emerald-800">
//         {scope1_total_kg.toFixed(2)} <span className="text-base text-emerald-700">kg CO₂e</span>
//       </p>
//     </CardContent>
//   </Card>

//   {/* Scope 2 */}
//   <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
//     <CardHeader className="pb-2">
//       <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
//         <Zap className="w-5 h-5" /> Scope 2
//       </CardTitle>
//       <CardDescription className="text-sm text-blue-600">Purchased electricity</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <p className="text-3xl font-bold text-blue-800">
//         {scope2_net_kg.toFixed(2)} <span className="text-base text-blue-700">kg CO₂e</span>
//       </p>
//       <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
//   <Sun className="w-4 h-4 text-yellow-500" />
//   Solar Offset:&nbsp;
//   <span className="text-blue-800 font-semibold">
//     {scope2_solar_offset_kg.toFixed(2)} kg CO₂e
//   </span>
// </p>

//     </CardContent>
//   </Card>

//   {/* Scope 3 */}
//   <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-sm">
//     <CardHeader className="pb-2">
//       <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
//         <Trash2 className="w-5 h-5" /> Scope 3
//       </CardTitle>
//       <CardDescription className="text-sm text-purple-600">Indirect emissions</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <p className="text-3xl font-bold text-purple-800">
//         {scope3_total_kg.toFixed(2)} <span className="text-base text-purple-700">kg CO₂e</span>
//       </p>
//     </CardContent>
//   </Card>
// </div>

// {/* Charts */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//   {/* Bar Chart */}
//   <Card className="border border-gray-200 shadow-md bg-white">
//     <CardHeader>
//       <CardTitle>Scope Distribution</CardTitle>
//       <CardDescription>Comparative emissions by scope</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="h-80 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={scopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//             <XAxis dataKey="scope" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#10b981" barSize={50} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </CardContent>
//   </Card>

//   {/* Pie Chart */}
//   <Card className="border border-gray-200 shadow-md bg-white">
//     <CardHeader>
//       <CardTitle>Emission Share</CardTitle>
//       <CardDescription>Scope contribution to total CO₂e</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="h-80 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={scopeSummary}
//               dataKey="value"
//               nameKey="scope"
//               innerRadius={60}
//               outerRadius={100}
//               paddingAngle={3}
//             >
//               {scopeSummary.map((entry, index) => {
//                 const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
//                 return <Cell key={index} fill={colors[index % colors.length]} />;
//               })}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </CardContent>
//   </Card>
// </div>


//   {/* Total Summary */}
//   <div className="text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 rounded-2xl">
//     <h2 className="text-4xl font-bold mb-2">Total Emissions</h2>
//     <p className="text-5xl font-extrabold text-emerald-400">
//       {net_emissions_kg.toFixed(2)} kg CO₂e
//     </p>
//     <p className="text-sm text-gray-300 mt-2">
//       After accounting for all Scopes and Solar Reduction
//     </p>
//   </div>

//   {/* Footer */}
//   <footer className="pt-8 border-t border-emerald-200 text-center space-y-2">
//     <p className="text-sm text-gray-500">
//       Beaconhouse National University — Sustainability Initiative
//     </p>
//     <p className="text-xs text-gray-400">
//       Generated using real-time data from CarbonBNU
//     </p>
//   </footer>
// </div>

// {/* Export Button (kept outside for clean capture) */}
// <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-8">
//   <CardContent className="py-6 flex items-center justify-between">
//     <div>
//       <p className="text-gray-400 text-sm mb-1">Total Emissions</p>
//       <p className="text-4xl font-bold">{net_emissions_kg.toFixed(2)} kg CO₂e</p>
//     </div>
//     <Button
//       onClick={() =>
//         exportCarbonReport("carbon-report", {
//           month: new Date().toLocaleString("default", { month: "long" }),
//           totalEmissions: net_emissions_kg,
//           scope1: scope1_total_kg,
//           scope2: scope2_net_kg,
//           scope3: scope3_total_kg,
//         })
//       }
//       className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
//     >
//       Export Report
//     </Button>
//   </CardContent>
// </Card>

//         <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 text-white py-12">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="flex items-center gap-3">
//               <Leaf className="w-8 h-8 text-emerald-400" />
//               <div>
//                 <h3 className="text-2xl font-bold">CarbonBNU</h3>
//                 <p className="text-sm text-gray-400">Sustainable Campus Initiative</p>
//               </div>
//             </div>
//             <div className="text-center md:text-right">
//               <p className="text-sm text-gray-400">University Carbon Emissions Calculator</p>
//               <p className="text-xs text-gray-500 mt-1">Scope 1, 2 & 3 • Pakistan Context</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



// ------------------------- V2 With Button -------------------


// "use client";

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// // Added Loader2 for the processing symbol
// import { Leaf, Zap, Trash2, Factory, Car, Wind, TrendingDown, Calculator, Sun, Loader2 } from "lucide-react";
// import { exportCarbonReport } from "@/lib/reportgenerator";


// // ---------- Type Definitions ----------


// interface NumberInputProps {
//   value: number;
//   onChange: (v: number) => void;
//   placeholder?: string;
// }

// interface FieldRowProps {
//   label: string;
//   children: React.ReactNode;
// }

// // ---------- Reusable Components ----------
// const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, placeholder }) => (
//   <input
//     type="number"
//     value={value}
//     onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
//     placeholder={placeholder}
//     className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
//   />
// );

// const FieldRow: React.FC<FieldRowProps> = ({ label, children }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     {children}
//   </div>
// );

// // ---------- Main Component ----------
// export default function CarbonCalculator() {
//   // --- Input States ---
//   const [dieselLiters, setDieselLiters] = useState(0);
//   const [gasM3, setGasM3] = useState(0);
//   const [lpgKg, setLpgKg] = useState(0);
//   const [vehicleDistanceKm, setVehicleDistanceKm] = useState(0);
//   const [vehicleType, setVehicleType] = useState<keyof typeof VEHICLE_EF_KG_PER_KM>("Small Petrol Car");
//   const [electricityKWh, setElectricityKWh] = useState(0);
//   const [solarKWh, setSolarKWh] = useState(0);
//   const [foodWaste, setFoodWaste] = useState(0);
//   const [plasticWaste, setPlasticWaste] = useState(0);
//   const [bottleWaste, setBottleWaste] = useState(0);
//   const [glassWaste, setGlassWaste] = useState(0);
//   const [cartonWaste, setCartonWaste] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   // --- NEW: Processing State ---
//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- NEW: Calculated States (to store results after calculation) ---
//   const [calculatedScope1Diesel, setCalculatedScope1Diesel] = useState(0);
//   const [calculatedScope1Gas, setCalculatedScope1Gas] = useState(0);
//   const [calculatedScope1Lpg, setCalculatedScope1Lpg] = useState(0);
//   const [calculatedScope1Vehicle, setCalculatedScope1Vehicle] = useState(0);
//   const [calculatedScope1Kg, setCalculatedScope1Kg] = useState(0);

//   const [calculatedScope2Grid, setCalculatedScope2Grid] = useState(0);
//   const [calculatedScope2Solar, setCalculatedScope2Solar] = useState(0);
//   const [calculatedScope2Kg, setCalculatedScope2Kg] = useState(0);

//   const [calculatedScope3Waste, setCalculatedScope3Waste] = useState(0);
//   const [calculatedScope3Kg, setCalculatedScope3Kg] = useState(0);

//   const [calculatedNetKg, setCalculatedNetKg] = useState(0);
//   const [calculatedScopeSummary, setCalculatedScopeSummary] = useState([
//     { scope: "Scope 1", value: 0 },
//     { scope: "Scope 2", value: 0 },
//     { scope: "Scope 3", value: 0 },
//   ]);


//   useEffect(() => setIsVisible(true), []);

//   // Emission factors
//   const EF_DIESEL_KG_PER_L = 2.68;
//   const EF_NATURAL_GAS_KG_PER_M3 = 1.9;
//   const EF_LPG_KG_PER_KG = 3.0;
//   const EF_ELECTRICITY_KG_PER_KWH = 0.615;

//   const VEHICLE_EF_KG_PER_KM = {
//     "Small Petrol Car": 0.192,
//     "Large Petrol Car": 0.282,
//     "Small Diesel Car": 0.171,
//     "Large Diesel Car": 0.21,
//     Motorcycle: 0.103,
//     "Electric Car": 0.05,
//   };

//   const EF_WASTE = {
//     food: 1.305,
//     plastic: 2.88,
//     bottles: 2.5,
//     glass: 1.437,
//     cartons: 0.94,
//   };

//   // --- NEW: Calculation Function ---
//   const handleCalculate = () => {
//     setIsProcessing(true);

//     // Simulate calculation time
//     setTimeout(() => {
//       // --- Emission Calculations ---
//       const scope1_diesel_kg = dieselLiters * EF_DIESEL_KG_PER_L;
//       const scope1_gas_kg = gasM3 * EF_NATURAL_GAS_KG_PER_M3;
//       const scope1_lpg_kg = lpgKg * EF_LPG_KG_PER_KG;
//       const scope1_vehicle_kg = vehicleDistanceKm * (VEHICLE_EF_KG_PER_KM[vehicleType] || 0);
//       const scope1_total_kg = scope1_diesel_kg + scope1_gas_kg + scope1_lpg_kg + scope1_vehicle_kg;

//       const scope2_electricity_kg = electricityKWh * EF_ELECTRICITY_KG_PER_KWH;
//       const scope2_solar_offset_kg = solarKWh * EF_ELECTRICITY_KG_PER_KWH;
//       const scope2_net_kg = scope2_electricity_kg - scope2_solar_offset_kg;

//       const scope3_waste_kg =
//         foodWaste * EF_WASTE.food +
//         plasticWaste * EF_WASTE.plastic +
//         bottleWaste * EF_WASTE.bottles +
//         glassWaste * EF_WASTE.glass +
//         cartonWaste * EF_WASTE.cartons;

//       const scope3_total_kg = scope3_waste_kg;
//       const net_emissions_kg = scope1_total_kg + scope2_net_kg + scope3_total_kg;

//       const scopeSummary = [
//         { scope: "Scope 1", value: scope1_total_kg },
//         { scope: "Scope 2", value: scope2_net_kg },
//         { scope: "Scope 3", value: scope3_total_kg },
//       ];

//       // --- Update all calculated states ---
//       setCalculatedScope1Diesel(scope1_diesel_kg);
//       setCalculatedScope1Gas(scope1_gas_kg);
//       setCalculatedScope1Lpg(scope1_lpg_kg);
//       setCalculatedScope1Vehicle(scope1_vehicle_kg);
//       setCalculatedScope1Kg(scope1_total_kg);

//       setCalculatedScope2Grid(scope2_electricity_kg);
//       setCalculatedScope2Solar(scope2_solar_offset_kg);
//       setCalculatedScope2Kg(scope2_net_kg);

//       setCalculatedScope3Waste(scope3_waste_kg);
//       setCalculatedScope3Kg(scope3_total_kg);

//       setCalculatedNetKg(net_emissions_kg);
//       setCalculatedScopeSummary(scopeSummary);

//       setIsProcessing(false);
//     }, 1500); // 1.5 second delay for "cool" effect
//   };

//   // --- OLD Calculations (Now only used inside handleCalculate) ---
//   // const scope1_diesel_kg = dieselLiters * EF_DIESEL_KG_PER_L;
//   // ... (all other calculations are now moved inside handleCalculate) ...
//   // const net_emissions_kg = scope1_total_kg + scope2_net_kg + scope3_total_kg;
//   // const scopeSummary = [ ... ];


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
//       <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20 overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
//           <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
//         </div>

//         <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             <div className="flex-1 space-y-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <Leaf className="w-12 h-12 animate-pulse" />
//                 <h1 className="text-5xl md:text-6xl font-bold tracking-tight">CarbonBNU</h1>
//               </div>
//               <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl">
//                 Calculate your carbon footprint with precision. Track <span className="font-bold text-white">Scope 1, 2 & 3</span> emissions 
//                 using Pakistan-contextualized emission factors.
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <Calculator className="w-4 h-4 mr-2" />
//                   Real-time Calculations
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <TrendingDown className="w-4 h-4 mr-2" />
//                   Pakistan Context
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <Wind className="w-4 h-4 mr-2" />
//                   All Scopes Covered
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex-1 w-full">
//               {/* Updated to show CALCULATED state values */}
//               <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="text-2xl text-gray-800">Emission Overview</CardTitle>
//                   <CardDescription className="text-gray-600">Press "Calculate" to see results</CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Factory className="w-4 h-4 text-emerald-600" />
//                       <p className="text-xs font-medium text-emerald-700">Scope 1</p>
//                     </div>
//                     <p className="text-2xl font-bold text-emerald-800">{calculatedScope1Kg.toFixed(1)}</p>
//                     <p className="text-xs text-emerald-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Zap className="w-4 h-4 text-blue-600" />
//                       <p className="text-xs font-medium text-blue-700">Scope 2</p>
//                     </div>
//                     <p className="text-2xl font-bold text-blue-800">{calculatedScope2Kg.toFixed(1)}</p>
//                     <p className="text-xs text-blue-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Trash2 className="w-4 h-4 text-purple-600" />
//                       <p className="text-xs font-medium text-purple-700">Scope 3</p>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-800">{calculatedScope3Kg.toFixed(1)}</p>
//                     <p className="text-xs text-purple-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <TrendingDown className="w-4 h-4 text-white" />
//                       <p className="text-xs font-medium text-gray-300">Total</p>
//                     </div>
//                     <p className="text-2xl font-bold text-white">{calculatedNetKg.toFixed(1)}</p>
//                     <p className="text-xs text-gray-400">kg CO₂e</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-6 py-16 space-y-20">
//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-emerald-100 rounded-xl">
//               <Factory className="w-8 h-8 text-emerald-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 1</h2>
//               <p className="text-gray-600 mt-1">Direct emissions from owned sources</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Factory className="w-5 h-5 text-emerald-600" />
//                   Diesel Generators
//                 </CardTitle>
//                 <CardDescription>Campus diesel consumption</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Diesel Consumed (liters)">
//                   <NumberInput value={dieselLiters} onChange={setDieselLiters} placeholder="e.g., 1200" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state value */}
//                 <div className="p-4 bg-emerald-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Emissions Generated</p>
//                   <p className="text-2xl font-bold text-emerald-700">{calculatedScope1Diesel.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Wind className="w-5 h-5 text-orange-600" />
//                   Natural Gas & LPG
//                 </CardTitle>
//                 <CardDescription>Gas consumption on campus</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Natural Gas (m³)">
//                   <NumberInput value={gasM3} onChange={setGasM3} placeholder="e.g., 500" />
//                 </FieldRow>
//                 <FieldRow label="LPG (kg)">
//                   <NumberInput value={lpgKg} onChange={setLpgKg} placeholder="e.g., 200" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state values */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="p-3 bg-orange-50 rounded-lg">
//                     <p className="text-xs text-gray-600">Natural Gas</p>
//                     <p className="text-lg font-bold text-orange-700">{calculatedScope1Gas.toFixed(1)} kg</p>
//                   </div>
//                   <div className="p-3 bg-amber-50 rounded-lg">
//                     <p className="text-xs text-gray-600">LPG</p>
//                     <p className="text-lg font-bold text-amber-700">{calculatedScope1Lpg.toFixed(1)} kg</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white md:col-span-2">
//               <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Car className="w-5 h-5 text-blue-600" />
//                   Campus-Owned Vehicles
//                 </CardTitle>
//                 <CardDescription>University-controlled transportation</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <FieldRow label="Distance Traveled (km)">
//                     <NumberInput value={vehicleDistanceKm} onChange={setVehicleDistanceKm} placeholder="e.g., 1500" />
//                   </FieldRow>
//                   <FieldRow label="Vehicle Type">
//                     <select
//                       value={vehicleType}
//                       onChange={(e) => setVehicleType(e.target.value as typeof vehicleType)}
//                       className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       {Object.keys(VEHICLE_EF_KG_PER_KM).map((vt) => (
//                         <option key={vt} value={vt}>{vt}</option>
//                       ))}
//                     </select>
//                   </FieldRow>
//                   {/* Updated to show CALCULATED state value */}
//                   <div className="flex items-end">
//                     <div className="p-4 bg-blue-50 rounded-lg w-full">
//                       <p className="text-xs text-gray-600">Emissions</p>
//                       <p className="text-xl font-bold text-blue-700">{calculatedScope1Vehicle.toFixed(2)} kg</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-emerald-100 text-sm mb-1">Scope 1 Total Emissions</p>
//                   <p className="text-4xl font-bold">{calculatedScope1Kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Factory className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-xl">
//               <Zap className="w-8 h-8 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 2</h2>
//               <p className="text-gray-600 mt-1">Purchased electricity with solar offsets</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Zap className="w-5 h-5 text-blue-600" />
//                   Grid Electricity
//                 </CardTitle>
//                 <CardDescription>Power consumed from the grid</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Electricity Consumed (kWh)">
//                   <NumberInput value={electricityKWh} onChange={setElectricityKWh} placeholder="e.g., 24000" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state value */}
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Grid Emissions</p>
//                   <p className="text-2xl font-bold text-blue-700">{calculatedScope2Grid.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Leaf className="w-5 h-5 text-yellow-600" />
//                   Solar Production
//                 </CardTitle>
//                 <CardDescription>Renewable energy offset</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Solar Energy (kWh)">
//                   <NumberInput value={solarKWh} onChange={setSolarKWh} placeholder="e.g., 12000" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state value */}
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Carbon Offset</p>
//                   <p className="text-2xl font-bold text-green-700">-{calculatedScope2Solar.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-sm mb-1">Scope 2 Net Emissions</p>
//                   <p className="text-4xl font-bold">{calculatedScope2Kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Zap className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-purple-100 rounded-xl">
//               <Trash2 className="w-8 h-8 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 3</h2>
//               <p className="text-gray-600 mt-1">Other indirect emissions</p>
//             </div>
//           </div>

//           <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
//             <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
//               <CardTitle className="flex items-center gap-2">
//                 <Trash2 className="w-5 h-5 text-purple-600" />
//                 Waste Management
//               </CardTitle>
//               <CardDescription>Emissions from different waste categories</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <FieldRow label="Food Waste (kg)">
//                   <NumberInput value={foodWaste} onChange={setFoodWaste} placeholder="e.g., 100" />
//                 </FieldRow>
//                 <FieldRow label="Plastic (kg)">
//                   <NumberInput value={plasticWaste} onChange={setPlasticWaste} placeholder="e.g., 50" />
//                 </FieldRow>
//                 <FieldRow label="Bottles (kg)">
//                   <NumberInput value={bottleWaste} onChange={setBottleWaste} placeholder="e.g., 30" />
//                 </FieldRow>
//                 <FieldRow label="Glass (kg)">
//                   <NumberInput value={glassWaste} onChange={setGlassWaste} placeholder="e.g., 20" />
//                 </FieldRow>
//                 <FieldRow label="Cartons (kg)">
//                   <NumberInput value={cartonWaste} onChange={setCartonWaste} placeholder="e.g., 40" />
//                 </FieldRow>
//               </div>
//               <Separator />
//               {/* Updated to show CALCULATED state value */}
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Total Waste Emissions</p>
//                 <p className="text-2xl font-bold text-purple-700">{calculatedScope3Waste.toFixed(2)} kg CO₂e</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm mb-1">Scope 3 Total Emissions</p>
//                   <p className="text-4xl font-bold">{calculatedScope3Kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Trash2 className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* --- NEW: Calculate Button Section --- */}
//         <section className="text-center py-10">
//           <Button
//             onClick={handleCalculate}
//             disabled={isProcessing}
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-7 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
//           >
//             {isProcessing ? (
//               <div className="flex items-center gap-3">
//                 <Loader2 className="w-6 h-6 animate-spin" />
//                 <span>Calculating...</span>
//               </div>
//             ) : (
//               "Calculate Emissions"
//             )}
//           </Button>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gray-800 rounded-xl">
//               <TrendingDown className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Summary & Analytics</h2>
//               <p className="text-gray-600 mt-1">Comprehensive emission breakdown</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <Card className="border-0 shadow-lg lg:col-span-2 bg-white">
//               <CardHeader>
//                 <CardTitle>Scope Distribution</CardTitle>
//                 <CardDescription>Comparative emissions by scope</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 w-full">
//                   {/* Updated to use CALCULATED state data */}
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={calculatedScopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                       <defs>
//                         <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#10b981" />
//                           <stop offset="100%" stopColor="#059669" />
//                         </linearGradient>
//                       </defs>
//                                           <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                       <XAxis dataKey="scope" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="url(#colorGradient)" barSize={50} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg bg-white">
//               <CardHeader>
//                 <CardTitle>Emission Share</CardTitle>
//                 <CardDescription>Scope contribution to total CO₂e</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 w-full">
//                   {/* Updated to use CALCULATED state data */}
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={calculatedScopeSummary}
//                         dataKey="value"
//                         nameKey="scope"
//                         innerRadius={60}
//                         outerRadius={100}
//                         paddingAngle={3}
//                       >
//                         {calculatedScopeSummary.map((entry, index) => {
//                           const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
//                           return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
//                         })}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white">
//             <CardContent className="py-8 flex justify-between items-center">
//               <div>
//                 <p className="text-gray-300 text-sm mb-1">Net Total Emissions</p>
//                 <p className="text-5xl font-bold">{calculatedNetKg.toFixed(2)} kg CO₂e</p>
//               </div>
//               <Calculator className="w-16 h-16 opacity-20" />
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//       {/* Updated REPORT SECTION to use CALCULATED state values */}
//       <div id="carbon-report" className="p-8 bg-gradient-to-b from-white via-emerald-50 to-blue-50 rounded-3xl shadow-lg space-y-12">

//         {/* Header */}
//         <header className="text-center space-y-3 border-b border-emerald-200 pb-6">
//           <h1 className="text-5xl font-bold text-emerald-700">CarbonBNU Emission Report</h1>
//           <p className="text-lg text-gray-600">
//             Comprehensive Scope 1, 2 & 3 Emission Analysis with Solar Offset
//           </p>
//           <div className="flex justify-center items-center gap-3 text-sm text-gray-500">
//             <Leaf className="w-4 h-4 text-emerald-500" />
//             <span>Generated by CarbonBNU Dashboard</span>
//           </div>
//         </header>

//         {/* Scope Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Scope 1 */}
//           <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
//                 <Factory className="w-5 h-5" /> Scope 1
//               </CardTitle>
//               <CardDescription className="text-sm text-emerald-600">Direct emissions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-emerald-800">
//                 {calculatedScope1Kg.toFixed(2)} <span className="text-base text-emerald-700">kg CO₂e</span>
//               </p>
//             </CardContent>
//           </Card>

//           {/* Scope 2 */}
//           <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
//                 <Zap className="w-5 h-5" /> Scope 2
//               </CardTitle>
//               <CardDescription className="text-sm text-blue-600">Purchased electricity</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-blue-800">
//                 {calculatedScope2Kg.toFixed(2)} <span className="text-base text-blue-700">kg CO₂e</span>
//               </p>
//               <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
//                 <Sun className="w-4 h-4 text-yellow-500" />
//                 Solar Offset:&nbsp;
//                 <span className="text-blue-800 font-semibold">
//                   {calculatedScope2Solar.toFixed(2)} kg CO₂e
//                 </span>
//               </p>

//             </CardContent>
//           </Card>

//           {/* Scope 3 */}
//           <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
//                 <Trash2 className="w-5 h-5" /> Scope 3
//               </CardTitle>
//               <CardDescription className="text-sm text-purple-600">Indirect emissions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-purple-800">
//                 {calculatedScope3Kg.toFixed(2)} <span className="text-base text-purple-700">kg CO₂e</span>
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Bar Chart */}
//           <Card className="border border-gray-200 shadow-md bg-white">
//             <CardHeader>
//               <CardTitle>Scope Distribution</CardTitle>
//               <CardDescription>Comparative emissions by scope</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={calculatedScopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="scope" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#10b981" barSize={50} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Pie Chart */}
//           <Card className="border border-gray-200 shadow-md bg-white">
//             <CardHeader>
//               <CardTitle>Emission Share</CardTitle>
//               <CardDescription>Scope contribution to total CO₂e</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={calculatedScopeSummary}
//                       dataKey="value"
//                       nameKey="scope"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={3}
//                     >
//                       {calculatedScopeSummary.map((entry, index) => {
//                         const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
//                         return <Cell key={index} fill={colors[index % colors.length]} />;
//                       })}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>


//         {/* Total Summary */}
//         <div className="text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 rounded-2xl">
//           <h2 className="text-4xl font-bold mb-2">Total Emissions</h2>
//           <p className="text-5xl font-extrabold text-emerald-400">
//             {calculatedNetKg.toFixed(2)} kg CO₂e
//           </p>
//           <p className="text-sm text-gray-300 mt-2">
//             After accounting for all Scopes and Solar Reduction
//           </p>
//         </div>

//         {/* Footer */}
//         <footer className="pt-8 border-t border-emerald-200 text-center space-y-2">
//           <p className="text-sm text-gray-500">
//             Beaconhouse National University — Sustainability Initiative
//           </p>
//           <p className="text-xs text-gray-400">
//             Generated using real-time data from CarbonBNU
//           </p>
//         </footer>
//       </div>

//       {/* Export Button (kept outside for clean capture) */}
//       {/* Updated to use CALCULATED state values */}
//       <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-8">
//         <CardContent className="py-6 flex items-center justify-between">
//           <div>
//             <p className="text-gray-400 text-sm mb-1">Total Emissions</p>
//             <p className="text-4xl font-bold">{calculatedNetKg.toFixed(2)} kg CO₂e</p>
//           </div>
//           <Button
//             onClick={() =>
//               exportCarbonReport("carbon-report", {
//                 month: new Date().toLocaleString("default", { month: "long" }),
//                 totalEmissions: calculatedNetKg,
//                 scope1: calculatedScope1Kg,
//                 scope2: calculatedScope2Kg,
//                 scope3: calculatedScope3Kg,
//               })
//             }
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
//           >
//             Export Report
//           </Button>
//         </CardContent>
//       </Card>

//       <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 text-white py-12">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="flex items-center gap-3">
//               <Leaf className="w-8 h-8 text-emerald-400" />
//               <div>
//                 <h3 className="text-2xl font-bold">CarbonBNU</h3>
//                 <p className="text-sm text-gray-400">Sustainable Campus Initiative</p>
//               </div>
//             </div>
//             <div className="text-center md:text-right">
//               <p className="text-sm text-gray-400">University Carbon Emissions Calculator</p>
//               <p className="text-xs text-gray-500 mt-1">Scope 1, 2 & 3 • Pakistan Context</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




// --------------v3 with button and with loading 

// "use client";

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// // Removed Loader2
// import { Leaf, Zap, Trash2, Factory, Car, Wind, TrendingDown, Calculator, Sun } from "lucide-react";
// import { exportCarbonReport } from "@/lib/reportgenerator";
// // --- NEW: Import your custom loader ---
// // (Adjust this path if you saved your Loader.tsx file elsewhere)
// import Loader from "@/components/ui/Loader";


// // ---------- Type Definitions ----------


// interface NumberInputProps {
//   value: number;
//   onChange: (v: number) => void;
//   placeholder?: string;
// }

// interface FieldRowProps {
//   label: string;
//   children: React.ReactNode;
// }

// // ---------- Reusable Components ----------
// const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, placeholder }) => (
//   <input
//     type="number"
//     value={value}
//     onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
//     placeholder={placeholder}
//     className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
//   />
// );

// const FieldRow: React.FC<FieldRowProps> = ({ label, children }) => (
//   <div className="space-y-2">
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     {children}
//   </div>
// );

// // ---------- Main Component ----------
// export default function CarbonCalculator() {
//   // --- Input States ---
//   const [dieselLiters, setDieselLiters] = useState(0);
//   const [gasM3, setGasM3] = useState(0);
//   const [lpgKg, setLpgKg] = useState(0);
//   const [vehicleDistanceKm, setVehicleDistanceKm] = useState(0);
//   const [vehicleType, setVehicleType] = useState<keyof typeof VEHICLE_EF_KG_PER_KM>("Small Petrol Car");
//   const [electricityKWh, setElectricityKWh] = useState(0);
//   const [solarKWh, setSolarKWh] = useState(0);
//   const [foodWaste, setFoodWaste] = useState(0);
//   const [plasticWaste, setPlasticWaste] = useState(0);
//   const [bottleWaste, setBottleWaste] = useState(0);
//   const [glassWaste, setGlassWaste] = useState(0);
//   const [cartonWaste, setCartonWaste] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   // --- NEW: Processing State ---
//   const [isProcessing, setIsProcessing] = useState(false);

//   // --- NEW: Calculated States (to store results after calculation) ---
//   const [calculatedScope1Diesel, setCalculatedScope1Diesel] = useState(0);
//   const [calculatedScope1Gas, setCalculatedScope1Gas] = useState(0);
//   const [calculatedScope1Lpg, setCalculatedScope1Lpg] = useState(0);
//   const [calculatedScope1Vehicle, setCalculatedScope1Vehicle] = useState(0);
//   const [calculatedScope1Kg, setCalculatedScope1Kg] = useState(0);

//   const [calculatedScope2Grid, setCalculatedScope2Grid] = useState(0);
//   const [calculatedScope2Solar, setCalculatedScope2Solar] = useState(0);
//   const [calculatedScope2Kg, setCalculatedScope2Kg] = useState(0);

//   const [calculatedScope3Waste, setCalculatedScope3Waste] = useState(0);
//   const [calculatedScope3Kg, setCalculatedScope3Kg] = useState(0);

//   const [calculatedNetKg, setCalculatedNetKg] = useState(0);
//   const [calculatedScopeSummary, setCalculatedScopeSummary] = useState([
//     { scope: "Scope 1", value: 0 },
//     { scope: "Scope 2", value: 0 },
//     { scope: "Scope 3", value: 0 },
//   ]);


//   useEffect(() => setIsVisible(true), []);

//   // Emission factors
//   const EF_DIESEL_KG_PER_L = 2.68;
//   const EF_NATURAL_GAS_KG_PER_M3 = 1.9;
//   const EF_LPG_KG_PER_KG = 3.0;
//   const EF_ELECTRICITY_KG_PER_KWH = 0.615;

//   const VEHICLE_EF_KG_PER_KM = {
//     "Small Petrol Car": 0.192,
//     "Large Petrol Car": 0.282,
//     "Small Diesel Car": 0.171,
//     "Large Diesel Car": 0.21,
//     Motorcycle: 0.103,
//     "Electric Car": 0.05,
//   };

//   const EF_WASTE = {
//     food: 1.305,
//     plastic: 2.88,
//     bottles: 2.5,
//     glass: 1.437,
//     cartons: 0.94,
//   };

//   // --- NEW: Calculation Function ---
//   const handleCalculate = () => {
//     setIsProcessing(true);

//     // Simulate calculation time (I set it to 3s to show off the cool animation)
//     setTimeout(() => {
//       // --- Emission Calculations ---
//       const scope1_diesel_kg = dieselLiters * EF_DIESEL_KG_PER_L;
//       const scope1_gas_kg = gasM3 * EF_NATURAL_GAS_KG_PER_M3;
//       const scope1_lpg_kg = lpgKg * EF_LPG_KG_PER_KG;
//       const scope1_vehicle_kg = vehicleDistanceKm * (VEHICLE_EF_KG_PER_KM[vehicleType] || 0);
//       const scope1_total_kg = scope1_diesel_kg + scope1_gas_kg + scope1_lpg_kg + scope1_vehicle_kg;

//       const scope2_electricity_kg = electricityKWh * EF_ELECTRICITY_KG_PER_KWH;
//       const scope2_solar_offset_kg = solarKWh * EF_ELECTRICITY_KG_PER_KWH;
//       const scope2_net_kg = scope2_electricity_kg - scope2_solar_offset_kg;

//       const scope3_waste_kg =
//         foodWaste * EF_WASTE.food +
//         plasticWaste * EF_WASTE.plastic +
//         bottleWaste * EF_WASTE.bottles +
//         glassWaste * EF_WASTE.glass +
//         cartonWaste * EF_WASTE.cartons;

//       const scope3_total_kg = scope3_waste_kg;
//       const net_emissions_kg = scope1_total_kg + scope2_net_kg + scope3_total_kg;

//       const scopeSummary = [
//         { scope: "Scope 1", value: scope1_total_kg },
//         { scope: "Scope 2", value: scope2_net_kg },
//         { scope: "Scope 3", value: scope3_total_kg },
//       ];

//       // --- Update all calculated states ---
//       setCalculatedScope1Diesel(scope1_diesel_kg);
//       setCalculatedScope1Gas(scope1_gas_kg);
//       setCalculatedScope1Lpg(scope1_lpg_kg);
//       setCalculatedScope1Vehicle(scope1_vehicle_kg);
//       setCalculatedScope1Kg(scope1_total_kg);

//       setCalculatedScope2Grid(scope2_electricity_kg);
//       setCalculatedScope2Solar(scope2_solar_offset_kg);
//       setCalculatedScope2Kg(scope2_net_kg);

//       setCalculatedScope3Waste(scope3_waste_kg);
//       setCalculatedScope3Kg(scope3_total_kg);

//       setCalculatedNetKg(net_emissions_kg);
//       setCalculatedScopeSummary(scopeSummary);

//       setIsProcessing(false);
//     }, 3000); // 3 second delay
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
//       <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20 overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
//           <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
//         </div>

//         <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             <div className="flex-1 space-y-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <Leaf className="w-12 h-12 animate-pulse" />
//                 <h1 className="text-5xl md:text-6xl font-bold tracking-tight">CarbonBNU</h1>
//               </div>
//               <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl">
//                 Calculate your carbon footprint with precision. Track <span className="font-bold text-white">Scope 1, 2 & 3</span> emissions 
//                 using Pakistan-contextualized emission factors.
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <Calculator className="w-4 h-4 mr-2" />
//                   Real-time Calculations
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <TrendingDown className="w-4 h-4 mr-2" />
//                   Pakistan Context
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
//                   <Wind className="w-4 h-4 mr-2" />
//                   All Scopes Covered
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex-1 w-full">
//               {/* Updated to show CALCULATED state values */}
//               <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="text-2xl text-gray-800">Emission Overview</CardTitle>
//                   <CardDescription className="text-gray-600">Press "Calculate" to see results</CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-2 gap-4">
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Factory className="w-4 h-4 text-emerald-600" />
//                       <p className="text-xs font-medium text-emerald-700">Scope 1</p>
//                     </div>
//                     <p className="text-2xl font-bold text-emerald-800">{calculatedScope1Kg.toFixed(1)}</p>
//                     <p className="text-xs text-emerald-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Zap className="w-4 h-4 text-blue-600" />
//                       <p className="text-xs font-medium text-blue-700">Scope 2</p>
//                     </div>
//                     <p className="text-2xl font-bold text-blue-800">{calculatedScope2Kg.toFixed(1)}</p>
//                     <p className="text-xs text-blue-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Trash2 className="w-4 h-4 text-purple-600" />
//                       <p className="text-xs font-medium text-purple-700">Scope 3</p>
//                     </div>
//                     <p className="text-2xl font-bold text-purple-800">{calculatedScope3Kg.toFixed(1)}</p>
//                     <p className="text-xs text-purple-600">kg CO₂e</p>
//                   </div>
//                   <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transform hover:scale-105 transition-all">
//                     <div className="flex items-center gap-2 mb-2">
//                       <TrendingDown className="w-4 h-4 text-white" />
//                       <p className="text-xs font-medium text-gray-300">Total</p>
//                     </div>
//                     <p className="text-2xl font-bold text-white">{calculatedNetKg.toFixed(1)}</p>
//                     <p className="text-xs text-gray-400">kg CO₂e</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-6 py-16 space-y-20">
//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-emerald-100 rounded-xl">
//               <Factory className="w-8 h-8 text-emerald-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 1</h2>
//               <p className="text-gray-600 mt-1">Direct emissions from owned sources</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Factory className="w-5 h-5 text-emerald-600" />
//                   Diesel Generators
//                 </CardTitle>
//                 <CardDescription>Campus diesel consumption</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Diesel Consumed (liters)">
//                   <NumberInput value={dieselLiters} onChange={setDieselLiters} placeholder="e.g., 1200" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state value */}
//                 <div className="p-4 bg-emerald-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Emissions Generated</p>
//                   <p className="text-2xl font-bold text-emerald-700">{calculatedScope1Diesel.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Wind className="w-5 h-5 text-orange-600" />
//                   Natural Gas & LPG
//                 </CardTitle>
//                 <CardDescription>Gas consumption on campus</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Natural Gas (m³)">
//                   <NumberInput value={gasM3} onChange={setGasM3} placeholder="e.g., 500" />
//                 </FieldRow>
//                 <FieldRow label="LPG (kg)">
//                   <NumberInput value={lpgKg} onChange={setLpgKg} placeholder="e.g., 200" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state values */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="p-3 bg-orange-50 rounded-lg">
//                     <p className="text-xs text-gray-600">Natural Gas</p>
//                     <p className="text-lg font-bold text-orange-700">{calculatedScope1Gas.toFixed(1)} kg</p>
//                   </div>
//                   <div className="p-3 bg-amber-50 rounded-lg">
//                     <p className="text-xs text-gray-600">LPG</p>
//                     <p className="text-lg font-bold text-amber-700">{calculatedScope1Lpg.toFixed(1)} kg</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white md:col-span-2">
//               <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Car className="w-5 h-5 text-blue-600" />
//                   Campus-Owned Vehicles
//                 </CardTitle>
//                 <CardDescription>University-controlled transportation</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <FieldRow label="Distance Traveled (km)">
//                     <NumberInput value={vehicleDistanceKm} onChange={setVehicleDistanceKm} placeholder="e.g., 1500" />
//                   </FieldRow>
//                   <FieldRow label="Vehicle Type">
//                     <select
//                       value={vehicleType}
//                       onChange={(e) => setVehicleType(e.target.value as typeof vehicleType)}
//                       className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       {Object.keys(VEHICLE_EF_KG_PER_KM).map((vt) => (
//                         <option key={vt} value={vt}>{vt}</option>
//                       ))}
//                     </select>
//                   </FieldRow>
//                   {/* Updated to show CALCULATED state value */}
//                   <div className="flex items-end">
//                     <div className="p-4 bg-blue-50 rounded-lg w-full">
//                       <p className="text-xs text-gray-600">Emissions</p>
//                       <p className="text-xl font-bold text-blue-700">{calculatedScope1Vehicle.toFixed(2)} kg</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-emerald-100 text-sm mb-1">Scope 1 Total Emissions</p>
//                   <p className="text-4xl font-bold">{calculatedScope1Kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Factory className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-xl">
//               <Zap className="w-8 h-8 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 2</h2>
//               <p className="text-gray-600 mt-1">Purchased electricity with solar offsets</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Zap className="w-5 h-5 text-blue-600" />
//                   Grid Electricity
//                 </CardTitle>
//                 <CardDescription>Power consumed from the grid</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Electricity Consumed (kWh)">
//                   <NumberInput value={electricityKWh} onChange={setElectricityKWh} placeholder="e.g., 24000" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state value */}
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Grid Emissions</p>
//                   <p className="text-2xl font-bold text-blue-700">{calculatedScope2Grid.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
//               <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
//                 <CardTitle className="flex items-center gap-2">
//                   <Leaf className="w-5 h-5 text-yellow-600" />
//                   Solar Production
//                 </CardTitle>
//                 <CardDescription>Renewable energy offset</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-6">
//                 <FieldRow label="Solar Energy (kWh)">
//                   <NumberInput value={solarKWh} onChange={setSolarKWh} placeholder="e.g., 12000" />
//                 </FieldRow>
//                 <Separator />
//                 {/* Updated to show CALCULATED state value */}
//                 <div className="p-4 bg-green-50 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Carbon Offset</p>
//                   <p className="text-2xl font-bold text-green-700">-{calculatedScope2Solar.toFixed(2)} kg CO₂e</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-sm mb-1">Scope 2 Net Emissions</p>
//                   <p className="text-4xl font-bold">{calculatedScope2Kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Zap className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-purple-100 rounded-xl">
//               <Trash2 className="w-8 h-8 text-purple-600" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Scope 3</h2>
//               <p className="text-gray-600 mt-1">Other indirect emissions</p>
//             </div>
//           </div>

//           <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
//             <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
//               <CardTitle className="flex items-center gap-2">
//                 <Trash2 className="w-5 h-5 text-purple-600" />
//                 Waste Management
//               </CardTitle>
//               <CardDescription>Emissions from different waste categories</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 pt-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <FieldRow label="Food Waste (kg)">
//                   <NumberInput value={foodWaste} onChange={setFoodWaste} placeholder="e.g., 100" />
//                 </FieldRow>
//                 <FieldRow label="Plastic (kg)">
//                   <NumberInput value={plasticWaste} onChange={setPlasticWaste} placeholder="e.g., 50" />
//                 </FieldRow>
//                 <FieldRow label="Bottles (kg)">
//                   <NumberInput value={bottleWaste} onChange={setBottleWaste} placeholder="e.g., 30" />
//                 </FieldRow>
//                 <FieldRow label="Glass (kg)">
//                   <NumberInput value={glassWaste} onChange={setGlassWaste} placeholder="e.g., 20" />
//                 </FieldRow>
//                 <FieldRow label="Cartons (kg)">
//                   <NumberInput value={cartonWaste} onChange={setCartonWaste} placeholder="e.g., 40" />
//                 </FieldRow>
//               </div>
//               <Separator />
//               {/* Updated to show CALCULATED state value */}
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <p className="text-sm text-gray-600 mb-1">Total Waste Emissions</p>
//                 <p className="text-2xl font-bold text-purple-700">{calculatedScope3Waste.toFixed(2)} kg CO₂e</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//             <CardContent className="py-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm mb-1">Scope 3 Total Emissions</p>
//                   <p className="text-4xl font-bold">{calculatedScope3Kg.toFixed(2)} kg CO₂e</p>
//                 </div>
//                 <Trash2 className="w-16 h-16 opacity-20" />
//               </div>
//             </CardContent>
//           </Card>
//         </section>

//         {/* --- MODIFIED: Calculate Button Section --- */}
//         {/* This section now shows the Loader component when processing, or the Button when not */}
//         <section className="text-center py-10 min-h-[100px] flex justify-center items-center">
//           {isProcessing ? (
//             <div className="w-full max-w-lg mx-auto">
//               <Loader />
//             </div>
//           ) : (
//             <Button
//               onClick={handleCalculate}
//               disabled={isProcessing}
//               className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-7 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
//             >
//               Calculate Emissions
//             </Button>
//           )}
//         </section>

//         <section className="space-y-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-gray-800 rounded-xl">
//               <TrendingDown className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-bold text-gray-800">Summary & Analytics</h2>
//               <p className="text-gray-600 mt-1">Comprehensive emission breakdown</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <Card className="border-0 shadow-lg lg:col-span-2 bg-white">
//               <CardHeader>
//                 <CardTitle>Scope Distribution</CardTitle>
//                 <CardDescription>Comparative emissions by scope</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 w-full">
//                   {/* Updated to use CALCULATED state data */}
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={calculatedScopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                       <defs>
//                         <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#10b981" />
//                           <stop offset="100%" stopColor="#059669" />
//                         </linearGradient>
//                       </defs>
//                                           <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                       <XAxis dataKey="scope" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="url(#colorGradient)" barSize={50} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg bg-white">
//               <CardHeader>
//                 <CardTitle>Emission Share</CardTitle>
//                 <CardDescription>Scope contribution to total CO₂e</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 w-full">
//                   {/* Updated to use CALCULATED state data */}
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={calculatedScopeSummary}
//                         dataKey="value"
//                         nameKey="scope"
//                         innerRadius={60}
//                         outerRadius={100}
//                         paddingAngle={3}
//                       >
//                         {calculatedScopeSummary.map((entry, index) => {
//                           const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
//                           return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
//                         })}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Updated to show CALCULATED state value */}
//           <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white">
//             <CardContent className="py-8 flex justify-between items-center">
//               <div>
//                 <p className="text-gray-300 text-sm mb-1">Net Total Emissions</p>
//                 <p className="text-5xl font-bold">{calculatedNetKg.toFixed(2)} kg CO₂e</p>
//               </div>
//               <Calculator className="w-16 h-16 opacity-20" />
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//       {/* Updated REPORT SECTION to use CALCULATED state values */}
//       <div id="carbon-report" className="p-8 bg-gradient-to-b from-white via-emerald-50 to-blue-50 rounded-3xl shadow-lg space-y-12">

//         {/* Header */}
//         <header className="text-center space-y-3 border-b border-emerald-200 pb-6">
//           <h1 className="text-5xl font-bold text-emerald-700">CarbonBNU Emission Report</h1>
//           <p className="text-lg text-gray-600">
//             Comprehensive Scope 1, 2 & 3 Emission Analysis with Solar Offset
//           </p>
//           <div className="flex justify-center items-center gap-3 text-sm text-gray-500">
//             <Leaf className="w-4 h-4 text-emerald-500" />
//             <span>Generated by CarbonBNU Dashboard</span>
//           </div>
//         </header>

//         {/* Scope Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Scope 1 */}
//           <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
//                 <Factory className="w-5 h-5" /> Scope 1
//               </CardTitle>
//               <CardDescription className="text-sm text-emerald-600">Direct emissions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-emerald-800">
//                 {calculatedScope1Kg.toFixed(2)} <span className="text-base text-emerald-700">kg CO₂e</span>
//               </p>
//             </CardContent>
//           </Card>

//           {/* Scope 2 */}
//           <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
//                 <Zap className="w-5 h-5" /> Scope 2
//               </CardTitle>
//               <CardDescription className="text-sm text-blue-600">Purchased electricity</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-blue-800">
//                 {calculatedScope2Kg.toFixed(2)} <span className="text-base text-blue-700">kg CO₂e</span>
//               </p>
//               <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
//                 <Sun className="w-4 h-4 text-yellow-500" />
//                 Solar Offset:&nbsp;
//                 <span className="text-blue-800 font-semibold">
//                   {calculatedScope2Solar.toFixed(2)} kg CO₂e
//                 </span>
//               </p>

//             </CardContent>
//           </Card>

//           {/* Scope 3 */}
//           <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-sm">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
//                 <Trash2 className="w-5 h-5" /> Scope 3
//               </CardTitle>
//               <CardDescription className="text-sm text-purple-600">Indirect emissions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-purple-800">
//                 {calculatedScope3Kg.toFixed(2)} <span className="text-base text-purple-700">kg CO₂e</span>
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Bar Chart */}
//           <Card className="border border-gray-200 shadow-md bg-white">
//             <CardHeader>
//               <CardTitle>Scope Distribution</CardTitle>
//               <CardDescription>Comparative emissions by scope</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={calculatedScopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="scope" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#10b981" barSize={50} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Pie Chart */}
//           <Card className="border border-gray-200 shadow-md bg-white">
//             <CardHeader>
//               <CardTitle>Emission Share</CardTitle>
//               <CardDescription>Scope contribution to total CO₂e</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={calculatedScopeSummary}
//                       dataKey="value"
//                       nameKey="scope"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={3}
//                     >
//                       {calculatedScopeSummary.map((entry, index) => {
//                         const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
//                         return <Cell key={index} fill={colors[index % colors.length]} />;
//                       })}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>


//         {/* Total Summary */}
//         <div className="text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 rounded-2xl">
//           <h2 className="text-4xl font-bold mb-2">Total Emissions</h2>
//           <p className="text-5xl font-extrabold text-emerald-400">
//             {calculatedNetKg.toFixed(2)} kg CO₂e
//           </p>
//           <p className="text-sm text-gray-300 mt-2">
//             After accounting for all Scopes and Solar Reduction
//           </p>
//         </div>

//         {/* Footer */}
//         <footer className="pt-8 border-t border-emerald-200 text-center space-y-2">
//           <p className="text-sm text-gray-500">
//             Beaconhouse National University — Sustainability Initiative
//           </p>
//           <p className="text-xs text-gray-400">
//             Generated using real-time data from CarbonBNU
//           </p>
//         </footer>
//       </div>

//       {/* Export Button (kept outside for clean capture) */}
//       {/* Updated to use CALCULATED state values */}
//       <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-8">
//         <CardContent className="py-6 flex items-center justify-between">
//           <div>
//             <p className="text-gray-400 text-sm mb-1">Total Emissions</p>
//             <p className="text-4xl font-bold">{calculatedNetKg.toFixed(2)} kg CO₂e</p>
//           </div>
//           <Button
//             onClick={() =>
//               exportCarbonReport("carbon-report", {
//                 month: new Date().toLocaleString("default", { month: "long" }),
//                 totalEmissions: calculatedNetKg,
//                 scope1: calculatedScope1Kg,
//                 scope2: calculatedScope2Kg,
//                 scope3: calculatedScope3Kg,
//               })
//             }
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
//           >
//             Export Report
//           </Button>
//         </CardContent>
//       </Card>

//       <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 text-white py-12">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="flex items-center gap-3">
//               <Leaf className="w-8 h-8 text-emerald-400" />
//               <div>
//                 <h3 className="text-2xl font-bold">CarbonBNU</h3>
//                 <p className="text-sm text-gray-400">Sustainable Campus Initiative</p>
//               </div>
//             </div>
//             <div className="text-center md:text-right">
//               <p className="text-sm text-gray-400">University Carbon Emissions Calculator</p>
//               <p className="text-xs text-gray-500 mt-1">Scope 1, 2 & 3 • Pakistan Context</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



// ---------------- v4 -------------------

// --------------v3 with button and with loading 
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CalculateButton from '@/components/ui/CalculateButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// Removed Loader2
import { Leaf, Zap, Trash2, Factory, Car, Wind, TrendingDown, Calculator, Sun, ArrowLeft, LogOut } from "lucide-react";
import { exportCarbonReport } from "@/lib/reportgenerator";
// --- NEW: Import your custom loader ---
// (Adjust this path if you saved your Loader.tsx file elsewhere)
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";


// ---------- Type Definitions ----------


interface NumberInputProps {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}

interface FieldRowProps {
  label: string;
  children: React.ReactNode;
}

// ---------- Reusable Components ----------
const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, placeholder }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    placeholder={placeholder}
    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
  />
);

const FieldRow: React.FC<FieldRowProps> = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

// ---------- Main Component ----------
export default function CarbonCalculator() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  // --- Input States ---
  const [dieselLiters, setDieselLiters] = useState(0);
  const [gasM3, setGasM3] = useState(0);
  const [lpgKg, setLpgKg] = useState(0);
  const [vehicleDistanceKm, setVehicleDistanceKm] = useState(0);
  const [vehicleType, setVehicleType] = useState<keyof typeof VEHICLE_EF_KG_PER_KM>("Small Petrol Car");
  const [electricityKWh, setElectricityKWh] = useState(0);
  const [solarKWh, setSolarKWh] = useState(0);
  const [foodWaste, setFoodWaste] = useState(0);
  const [plasticWaste, setPlasticWaste] = useState(0);
  const [bottleWaste, setBottleWaste] = useState(0);
  const [glassWaste, setGlassWaste] = useState(0);
  const [cartonWaste, setCartonWaste] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // --- NEW: Processing State ---
  const [isProcessing, setIsProcessing] = useState(false);

  // --- NEW: Calculated States (to store results after calculation) ---
  const [calculatedScope1Diesel, setCalculatedScope1Diesel] = useState(0);
  const [calculatedScope1Gas, setCalculatedScope1Gas] = useState(0);
  const [calculatedScope1Lpg, setCalculatedScope1Lpg] = useState(0);
  const [calculatedScope1Vehicle, setCalculatedScope1Vehicle] = useState(0);
  const [calculatedScope1Kg, setCalculatedScope1Kg] = useState(0);

  const [calculatedScope2Grid, setCalculatedScope2Grid] = useState(0);
  const [calculatedScope2Solar, setCalculatedScope2Solar] = useState(0);
  const [calculatedScope2Kg, setCalculatedScope2Kg] = useState(0);

  const [calculatedScope3Waste, setCalculatedScope3Waste] = useState(0);
  const [calculatedScope3Kg, setCalculatedScope3Kg] = useState(0);

  const [calculatedNetKg, setCalculatedNetKg] = useState(0);
  const [calculatedScopeSummary, setCalculatedScopeSummary] = useState([
    { scope: "Scope 1", value: 0 },
    { scope: "Scope 2", value: 0 },
    { scope: "Scope 3", value: 0 },
  ]);


  useEffect(() => setIsVisible(true), []);

  // Emission factors
  const EF_DIESEL_KG_PER_L = 2.68;
  const EF_NATURAL_GAS_KG_PER_M3 = 1.9;
  const EF_LPG_KG_PER_KG = 3.0;
  const EF_ELECTRICITY_KG_PER_KWH = 0.615;

  const VEHICLE_EF_KG_PER_KM = {
    "Small Petrol Car": 0.192,
    "Large Petrol Car": 0.282,
    "Small Diesel Car": 0.171,
    "Large Diesel Car": 0.21,
    Motorcycle: 0.103,
    "Electric Car": 0.05,
  };

  const EF_WASTE = {
    food: 1.305,
    plastic: 2.88,
    bottles: 2.5,
    glass: 1.437,
    cartons: 0.94,
  };

  // --- NEW: Calculation Function ---
  const handleCalculate = () => {
    setIsProcessing(true);

    // Simulate calculation time (I set it to 3s to show off the cool animation)
    setTimeout(() => {
      // --- Emission Calculations ---
      const scope1_diesel_kg = dieselLiters * EF_DIESEL_KG_PER_L;
      const scope1_gas_kg = gasM3 * EF_NATURAL_GAS_KG_PER_M3;
      const scope1_lpg_kg = lpgKg * EF_LPG_KG_PER_KG;
      const scope1_vehicle_kg = vehicleDistanceKm * (VEHICLE_EF_KG_PER_KM[vehicleType] || 0);
      const scope1_total_kg = scope1_diesel_kg + scope1_gas_kg + scope1_lpg_kg + scope1_vehicle_kg;

      const scope2_electricity_kg = electricityKWh * EF_ELECTRICITY_KG_PER_KWH;
      const scope2_solar_offset_kg = solarKWh * EF_ELECTRICITY_KG_PER_KWH;
      const scope2_net_kg = scope2_electricity_kg - scope2_solar_offset_kg;

      const scope3_waste_kg =
        foodWaste * EF_WASTE.food +
        plasticWaste * EF_WASTE.plastic +
        bottleWaste * EF_WASTE.bottles +
        glassWaste * EF_WASTE.glass +
        cartonWaste * EF_WASTE.cartons;

      const scope3_total_kg = scope3_waste_kg;
      const net_emissions_kg = scope1_total_kg + scope2_net_kg + scope3_total_kg;

      const scopeSummary = [
        { scope: "Scope 1", value: scope1_total_kg },
        { scope: "Scope 2", value: scope2_net_kg },
        { scope: "Scope 3", value: scope3_total_kg },
      ];

      // --- Update all calculated states ---
      setCalculatedScope1Diesel(scope1_diesel_kg);
      setCalculatedScope1Gas(scope1_gas_kg);
      setCalculatedScope1Lpg(scope1_lpg_kg);
      setCalculatedScope1Vehicle(scope1_vehicle_kg);
      setCalculatedScope1Kg(scope1_total_kg);

      setCalculatedScope2Grid(scope2_electricity_kg);
      setCalculatedScope2Solar(scope2_solar_offset_kg);
      setCalculatedScope2Kg(scope2_net_kg);

      setCalculatedScope3Waste(scope3_waste_kg);
      setCalculatedScope3Kg(scope3_total_kg);

      setCalculatedNetKg(net_emissions_kg);
      setCalculatedScopeSummary(scopeSummary);

      setIsProcessing(false);
    }, 3000); // 3 second delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-white/80">{user.username}</div>
              <Button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>

        <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-12 h-12 animate-pulse" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">CarbonBNU</h1>
              </div>
              <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl">
                Calculate your carbon footprint with precision. Track <span className="font-bold text-white">Scope 1, 2 & 3</span> emissions
                using Pakistan-contextualized emission factors.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
                  <Calculator className="w-4 h-4 mr-2" />
                  Real-time Calculations
                </Badge>
                <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Pakistan Context
                </Badge>
                <Badge className="bg-white/20 text-white border-white/40 px-4 py-2 text-sm backdrop-blur-sm">
                  <Wind className="w-4 h-4 mr-2" />
                  All Scopes Covered
                </Badge>
              </div>
            </div>

            <div className="flex-1 w-full">
              {/* Updated to show CALCULATED state values */}
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-800">Emission Overview</CardTitle>
                  <CardDescription className="text-gray-600">Press "Calculate" to see results</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 transform hover:scale-105 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Factory className="w-4 h-4 text-emerald-600" />
                      <p className="text-xs font-medium text-emerald-700">Scope 1</p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-800">{calculatedScope1Kg.toFixed(1)}</p>
                    <p className="text-xs text-emerald-600">kg CO₂e</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transform hover:scale-105 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <p className="text-xs font-medium text-blue-700">Scope 2</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-800">{calculatedScope2Kg.toFixed(1)}</p>
                    <p className="text-xs text-blue-600">kg CO₂e</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transform hover:scale-105 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Trash2 className="w-4 h-4 text-purple-600" />
                      <p className="text-xs font-medium text-purple-700">Scope 3</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-800">{calculatedScope3Kg.toFixed(1)}</p>
                    <p className="text-xs text-purple-600">kg CO₂e</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transform hover:scale-105 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-white" />
                      <p className="text-xs font-medium text-gray-300">Total</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{calculatedNetKg.toFixed(1)}</p>
                    <p className="text-xs text-gray-400">kg CO₂e</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-20">
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Factory className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Scope 1</h2>
              <p className="text-gray-600 mt-1">Direct emissions from owned sources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-emerald-600" />
                  Diesel Generators
                </CardTitle>
                <CardDescription>Campus diesel consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <FieldRow label="Diesel Consumed (liters)">
                  <NumberInput value={dieselLiters} onChange={setDieselLiters} placeholder="e.g., 1200" />
                </FieldRow>
                <Separator />
                {/* Updated to show CALCULATED state value */}
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Emissions Generated</p>
                  <p className="text-2xl font-bold text-emerald-700">{calculatedScope1Diesel.toFixed(2)} kg CO₂e</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-orange-600" />
                  Natural Gas & LPG
                </CardTitle>
                <CardDescription>Gas consumption on campus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <FieldRow label="Natural Gas (m³)">
                  <NumberInput value={gasM3} onChange={setGasM3} placeholder="e.g., 500" />
                </FieldRow>
                <FieldRow label="LPG (kg)">
                  <NumberInput value={lpgKg} onChange={setLpgKg} placeholder="e.g., 200" />
                </FieldRow>
                <Separator />
                {/* Updated to show CALCULATED state values */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600">Natural Gas</p>
                    <p className="text-lg font-bold text-orange-700">{calculatedScope1Gas.toFixed(1)} kg</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-xs text-gray-600">LPG</p>
                    <p className="text-lg font-bold text-amber-700">{calculatedScope1Lpg.toFixed(1)} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white md:col-span-2">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Campus-Owned Vehicles
                </CardTitle>
                <CardDescription>University-controlled transportation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FieldRow label="Distance Traveled (km)">
                    <NumberInput value={vehicleDistanceKm} onChange={setVehicleDistanceKm} placeholder="e.g., 1500" />
                  </FieldRow>
                  <FieldRow label="Vehicle Type">
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value as typeof vehicleType)}
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {Object.keys(VEHICLE_EF_KG_PER_KM).map((vt) => (
                        <option key={vt} value={vt}>{vt}</option>
                      ))}
                    </select>
                  </FieldRow>
                  {/* Updated to show CALCULATED state value */}
                  <div className="flex items-end">
                    <div className="p-4 bg-blue-50 rounded-lg w-full">
                      <p className="text-xs text-gray-600">Emissions</p>
                      <p className="text-xl font-bold text-blue-700">{calculatedScope1Vehicle.toFixed(2)} kg</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Updated to show CALCULATED state value */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm mb-1">Scope 1 Total Emissions</p>
                  <p className="text-4xl font-bold">{calculatedScope1Kg.toFixed(2)} kg CO₂e</p>
                </div>
                <Factory className="w-16 h-16 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Scope 2</h2>
              <p className="text-gray-600 mt-1">Purchased electricity with solar offsets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Grid Electricity
                </CardTitle>
                <CardDescription>Power consumed from the grid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <FieldRow label="Electricity Consumed (kWh)">
                  <NumberInput value={electricityKWh} onChange={setElectricityKWh} placeholder="e.g., 24000" />
                </FieldRow>
                <Separator />
                {/* Updated to show CALCULATED state value */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Grid Emissions</p>
                  <p className="text-2xl font-bold text-blue-700">{calculatedScope2Grid.toFixed(2)} kg CO₂e</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-yellow-600" />
                  Solar Production
                </CardTitle>
                <CardDescription>Renewable energy offset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <FieldRow label="Solar Energy (kWh)">
                  <NumberInput value={solarKWh} onChange={setSolarKWh} placeholder="e.g., 12000" />
                </FieldRow>
                <Separator />
                {/* Updated to show CALCULATED state value */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Carbon Offset</p>
                  <p className="text-2xl font-bold text-green-700">-{calculatedScope2Solar.toFixed(2)} kg CO₂e</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Updated to show CALCULATED state value */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Scope 2 Net Emissions</p>
                  <p className="text-4xl font-bold">{calculatedScope2Kg.toFixed(2)} kg CO₂e</p>
                </div>
                <Zap className="w-16 h-16 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Trash2 className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Scope 3</h2>
              <p className="text-gray-600 mt-1">Other indirect emissions</p>
            </div>
          </div>

          <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-purple-600" />
                Waste Management
              </CardTitle>
              <CardDescription>Emissions from different waste categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FieldRow label="Food Waste (kg)">
                  <NumberInput value={foodWaste} onChange={setFoodWaste} placeholder="e.g., 100" />
                </FieldRow>
                <FieldRow label="Plastic (kg)">
                  <NumberInput value={plasticWaste} onChange={setPlasticWaste} placeholder="e.g., 50" />
                </FieldRow>
                <FieldRow label="Bottles (kg)">
                  <NumberInput value={bottleWaste} onChange={setBottleWaste} placeholder="e.g., 30" />
                </FieldRow>
                <FieldRow label="Glass (kg)">
                  <NumberInput value={glassWaste} onChange={setGlassWaste} placeholder="e.g., 20" />
                </FieldRow>
                <FieldRow label="Cartons (kg)">
                  <NumberInput value={cartonWaste} onChange={setCartonWaste} placeholder="e.g., 40" />
                </FieldRow>
              </div>
              <Separator />
              {/* Updated to show CALCULATED state value */}
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Waste Emissions</p>
                <p className="text-2xl font-bold text-purple-700">{calculatedScope3Waste.toFixed(2)} kg CO₂e</p>
              </div>
            </CardContent>
          </Card>

          {/* Updated to show CALCULATED state value */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Scope 3 Total Emissions</p>
                  <p className="text-4xl font-bold">{calculatedScope3Kg.toFixed(2)} kg CO₂e</p>
                </div>
                <Trash2 className="w-16 h-16 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* --- MODIFIED: Calculate Button Section --- */}
        {/* This section now only shows the button. The loader appears in a modal. */}
        <section className="text-center py-10 min-h-[100px] flex justify-center items-center">
          <section className="text-center py-10 min-h-[100px] flex justify-center items-center">
            <CalculateButton
              onClick={handleCalculate}
              isProcessing={isProcessing}
            />
          </section>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800 rounded-xl">
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Summary & Analytics</h2>
              <p className="text-gray-600 mt-1">Comprehensive emission breakdown</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg lg:col-span-2 bg-white">
              <CardHeader>
                <CardTitle>Scope Distribution</CardTitle>
                <CardDescription>Comparative emissions by scope</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* Updated to use CALCULATED state data */}
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={calculatedScopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="scope" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="url(#colorGradient)" barSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Emission Share</CardTitle>
                <CardDescription>Scope contribution to total CO₂e</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  {/* Updated to use CALCULATED state data */}
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={calculatedScopeSummary}
                        dataKey="value"
                        nameKey="scope"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                      >
                        {calculatedScopeSummary.map((entry, index) => {
                          const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
                          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                        })}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Updated to show CALCULATED state value */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <CardContent className="py-8 flex justify-between items-center">
              <div>
                <p className="text-gray-300 text-sm mb-1">Net Total Emissions</p>
                <p className="text-5xl font-bold">{calculatedNetKg.toFixed(2)} kg CO₂e</p>
              </div>
              <Calculator className="w-16 h-16 opacity-20" />
            </CardContent>
          </Card>
        </section>
      </div>
      {/* Updated REPORT SECTION to use CALCULATED state values */}
      <div id="carbon-report" className="p-8 bg-gradient-to-b from-white via-emerald-50 to-blue-50 rounded-3xl shadow-lg space-y-12">

        {/* Header */}
        <header className="text-center space-y-3 border-b border-emerald-200 pb-6">
          <h1 className="text-5xl font-bold text-emerald-700">CarbonBNU Emission Report</h1>
          <p className="text-lg text-gray-600">
            Comprehensive Scope 1, 2 & 3 Emission Analysis with Solar Offset
          </p>
          <div className="flex justify-center items-center gap-3 text-sm text-gray-500">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span>Generated by CarbonBNU Dashboard</span>
          </div>
        </header>

        {/* Scope Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scope 1 */}
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-emerald-700 text-lg">
                <Factory className="w-5 h-5" /> Scope 1
              </CardTitle>
              <CardDescription className="text-sm text-emerald-600">Direct emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-800">
                {calculatedScope1Kg.toFixed(2)} <span className="text-base text-emerald-700">kg CO₂e</span>
              </p>
            </CardContent>
          </Card>

          {/* Scope 2 */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
                <Zap className="w-5 h-5" /> Scope 2
              </CardTitle>
              <CardDescription className="text-sm text-blue-600">Purchased electricity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-800">
                {calculatedScope2Kg.toFixed(2)} <span className="text-base text-blue-700">kg CO₂e</span>
              </p>
              <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                <Sun className="w-4 h-4 text-yellow-500" />
                Solar Offset:&nbsp;
                <span className="text-blue-800 font-semibold">
                  {calculatedScope2Solar.toFixed(2)} kg CO₂e
                </span>
              </p>

            </CardContent>
          </Card>

          {/* Scope 3 */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
                <Trash2 className="w-5 h-5" /> Scope 3
              </CardTitle>
              <CardDescription className="text-sm text-purple-600">Indirect emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-800">
                {calculatedScope3Kg.toFixed(2)} <span className="text-base text-purple-700">kg CO₂e</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <Card className="border border-gray-200 shadow-md bg-white">
            <CardHeader>
              <CardTitle>Scope Distribution</CardTitle>
              <CardDescription>Comparative emissions by scope</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calculatedScopeSummary} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="scope" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="border border-gray-200 shadow-md bg-white">
            <CardHeader>
              <CardTitle>Emission Share</CardTitle>
              <CardDescription>Scope contribution to total CO₂e</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={calculatedScopeSummary}
                      dataKey="value"
                      nameKey="scope"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {calculatedScopeSummary.map((entry, index) => {
                        const colors = ["#10b981", "#3b82f6", "#8b5cf6"];
                        return <Cell key={index} fill={colors[index % colors.length]} />;
                      })}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Total Summary */}
        <div className="text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 rounded-2xl">
          <h2 className="text-4xl font-bold mb-2">Total Emissions</h2>
          <p className="text-5xl font-extrabold text-emerald-400">
            {calculatedNetKg.toFixed(2)} kg CO₂e
          </p>
          <p className="text-sm text-gray-300 mt-2">
            After accounting for all Scopes and Solar Reduction
          </p>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-emerald-200 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Beaconhouse National University — Sustainability Initiative
          </p>
          <p className="text-xs text-gray-400">
            Generated using real-time data from CarbonBNU
          </p>
        </footer>
      </div>

      {/* Export Button (kept outside for clean capture) */}
      {/* Updated to use CALCULATED state values */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-8">
        <CardContent className="py-6 flex items-center justify-between">



          <div>
            <h2 className="text-2xl font-bold text-center">Export Your Carbon Report</h2>
            <p className="text-gray-400 text-sm mb-1">Total Emissions</p>
            <p className="text-4xl font-bold">{calculatedNetKg.toFixed(2)} kg CO₂e</p>
          </div>
          <Button
            onClick={() =>
              exportCarbonReport("carbon-report", {
                month: new Date().toLocaleString("default", { month: "long" }),
                totalEmissions: calculatedNetKg,
                scope1: calculatedScope1Kg,
                scope2: calculatedScope2Kg,
                scope3: calculatedScope3Kg,
              })
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
          >
            Export Report
          </Button>
        </CardContent>
      </Card>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <div>
                <h3 className="text-2xl font-bold">CarbonBNU</h3>
                <p className="text-sm text-gray-400">Sustainable Campus Initiative</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">University Carbon Emissions Calculator</p>
              <p className="text-xs text-gray-500 mt-1">Scope 1, 2 & 3 • Pakistan Context</p>
            </div>
          </div>
        </div>
      </footer>

      {/* --- NEW: Full-screen Loader Modal --- */}
      {/* This modal appears on top of all content when isProcessing is true */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-auto p-4">
            <Loader />
          </div>
        </div>
      )}

    </div>
  );
}