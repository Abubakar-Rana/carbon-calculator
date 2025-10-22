import { NextResponse } from "next/server";

// --------------------------------------------------------
// EMISSION FACTORS (Keep hidden on server)
// --------------------------------------------------------

// Scope 1
const EF_DIESEL = 2.68; // kg CO₂ per liter
const EF_NATURAL_GAS = 1.9; // kg CO₂ per m³
const EF_LPG = 3.0; // kg CO₂ per kg

const VEHICLE_EF: Record<string, number> = {
  "Small Petrol Car": 0.192,
  "Large Petrol Car": 0.282,
  "Small Diesel Car": 0.171,
  "Large Diesel Car": 0.210,
  "Motorcycle": 0.103,
  "Electric Car": 0.050,
};

// Scope 2
const EF_ELECTRICITY = 0.615; // kg CO₂ per kWh (Pakistan grid)

// Scope 3 (Waste)
const EF_WASTE = {
  food: 1.305,
  plastic: 2.88,
  bottles: 2.5,
  glass: 1.437,
  cartons: 0.94,
};

// --------------------------------------------------------
// MAIN FUNCTION
// --------------------------------------------------------

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // ------------------ Scope 1 ------------------
    const dieselLiters = Number(data.dieselLiters || 0);
    const gasM3 = Number(data.gasM3 || 0);
    const lpgKg = Number(data.lpgKg || 0);
    const vehicleDistanceKm = Number(data.vehicleDistanceKm || 0);
    const vehicleType = data.vehicleType || "Small Petrol Car";

    const scope1_diesel = dieselLiters * EF_DIESEL;
    const scope1_gas = gasM3 * EF_NATURAL_GAS;
    const scope1_lpg = lpgKg * EF_LPG;
    const scope1_vehicle =
      vehicleDistanceKm * (VEHICLE_EF[vehicleType] ?? 0);

    const scope1_total =
      scope1_diesel + scope1_gas + scope1_lpg + scope1_vehicle;

    // ------------------ Scope 2 ------------------
    const electricityKWh = Number(data.electricityKWh || 0);
    const solarKWh = Number(data.solarKWh || 0);

    const scope2_electricity = electricityKWh * EF_ELECTRICITY;
    const scope2_solar_offset = solarKWh * EF_ELECTRICITY;
    const scope2_net = scope2_electricity - scope2_solar_offset;

    // ------------------ Scope 3 ------------------
    const foodWaste = Number(data.foodWaste || 0);
    const plasticWaste = Number(data.plasticWaste || 0);
    const bottleWaste = Number(data.bottleWaste || 0);
    const glassWaste = Number(data.glassWaste || 0);
    const cartonWaste = Number(data.cartonWaste || 0);

    const scope3_waste =
      foodWaste * EF_WASTE.food +
      plasticWaste * EF_WASTE.plastic +
      bottleWaste * EF_WASTE.bottles +
      glassWaste * EF_WASTE.glass +
      cartonWaste * EF_WASTE.cartons;

    const scope3_total = scope3_waste;

    // ------------------ Grand Total ------------------
    const total = scope1_total + scope2_net + scope3_total;

    // Return structured result
    return NextResponse.json({
      scope1: {
        diesel: scope1_diesel,
        naturalGas: scope1_gas,
        lpg: scope1_lpg,
        vehicles: scope1_vehicle,
        total: scope1_total,
      },
      scope2: {
        electricity: scope2_electricity,
        solarOffset: scope2_solar_offset,
        net: scope2_net,
      },
      scope3: {
        waste: scope3_waste,
        total: scope3_total,
      },
      total,
    });
  } catch (err) {
    console.error("Error calculating emissions:", err);
    return NextResponse.json(
      { error: "Invalid input or server error" },
      { status: 400 }
    );
  }
}
