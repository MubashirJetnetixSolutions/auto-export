"use client";

import React, { useState } from "react";
import {
  Car,
  Truck,
  Plus,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  User,
  Scale,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface TrailerSlot {
  position: number;
  deck: "Upper Deck" | "Lower Deck";
  vehicle: string | null;
  vin: string | null;
  weight: number | null;
  destination: string | null;
}

interface HaulerTruck {
  id: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
  trailerType: "9-Car High-Rail Stacker" | "4-Car Wedge" | "7-Car Auto Carrier";
  totalSlots: number;
  loadedSlots: number;
  currentRoute: string;
  grossWeightLbs: number;
  maxWeightLbs: number;
  status: "Loading" | "En Route" | "Delivered" | "Maintenance";
  slots: TrailerSlot[];
}

export default function CarHaulerLoadPage() {
  const [selectedTruckId, setSelectedTruckId] = useState("TRK-104");

  const [trucks, setTrucks] = useState<HaulerTruck[]>([
    {
      id: "TRK-104",
      truckNumber: "KENWORTH T680 #104",
      driverName: "Alex Rivera",
      driverPhone: "+1 (404) 891-2091",
      trailerType: "9-Car High-Rail Stacker",
      totalSlots: 9,
      loadedSlots: 8,
      currentRoute: "Atlanta Copart -> Savannah Port Terminal",
      grossWeightLbs: 68400,
      maxWeightLbs: 80000,
      status: "En Route",
      slots: [
        { position: 1, deck: "Upper Deck", vehicle: "2024 Toyota RAV4 Hybrid", vin: "2T3P1RFV5PW339182", weight: 3750, destination: "Savannah Yard" },
        { position: 2, deck: "Upper Deck", vehicle: "2023 BMW M4 Competition", vin: "WBS43AZ01PFP98214", weight: 3900, destination: "Savannah Yard" },
        { position: 3, deck: "Upper Deck", vehicle: "2022 Porsche 911 Carrera", vin: "WP0AB2A99NS249102", weight: 3350, destination: "Savannah Yard" },
        { position: 4, deck: "Upper Deck", vehicle: "2024 Honda Civic Sport", vin: "19XFC2F59PE029182", weight: 2950, destination: "Savannah Yard" },
        { position: 5, deck: "Lower Deck", vehicle: "2024 Mercedes GLE 450", vin: "4JGDA5HB1PA109283", weight: 4950, destination: "Savannah Yard" },
        { position: 6, deck: "Lower Deck", vehicle: "2023 Lexus RX 350 AWD", vin: "2T2HZMCA4RC092817", weight: 4400, destination: "Savannah Yard" },
        { position: 7, deck: "Lower Deck", vehicle: "2024 Audi Q7 Quattro", vin: "WA1VAAF77PD029182", weight: 5050, destination: "Savannah Yard" },
        { position: 8, deck: "Lower Deck", vehicle: "2023 Ford Explorer XLT", vin: "1FMSK8DH4PGA09182", weight: 4350, destination: "Savannah Yard" },
        { position: 9, deck: "Lower Deck", vehicle: null, vin: null, weight: null, destination: null },
      ],
    },
    {
      id: "TRK-108",
      truckNumber: "PETERBILT 579 #108",
      driverName: "Johnathan Miller",
      driverPhone: "+1 (832) 441-9982",
      trailerType: "4-Car Wedge",
      totalSlots: 4,
      loadedSlots: 4,
      currentRoute: "Dallas IAAI -> Houston Port Gate 2",
      grossWeightLbs: 48200,
      maxWeightLbs: 55000,
      status: "En Route",
      slots: [
        { position: 1, deck: "Upper Deck", vehicle: "2024 Cadillac Escalade", vin: "1GYS4CKL8PR109283", weight: 5800, destination: "Houston Terminal" },
        { position: 2, deck: "Upper Deck", vehicle: "2023 Chevrolet Tahoe", vin: "1GNSKCKD4PR209182", weight: 5600, destination: "Houston Terminal" },
        { position: 3, deck: "Lower Deck", vehicle: "2024 Range Rover Sport", vin: "SALWR2V47RA091827", weight: 5250, destination: "Houston Terminal" },
        { position: 4, deck: "Lower Deck", vehicle: "2023 Ford F-150 Lightning", vin: "1FT6W1EV4NW189201", weight: 6100, destination: "Houston Terminal" },
      ],
    },
    {
      id: "TRK-112",
      truckNumber: "FREIGHTLINER CASCADIA #112",
      driverName: "Stanislaw B.",
      driverPhone: "+1 (201) 902-3341",
      trailerType: "7-Car Auto Carrier",
      totalSlots: 7,
      loadedSlots: 3,
      currentRoute: "Philadelphia -> Newark Bay Yard",
      grossWeightLbs: 42000,
      maxWeightLbs: 72000,
      status: "Loading",
      slots: [
        { position: 1, deck: "Upper Deck", vehicle: "2024 Hyundai Tucson", vin: "KM8JN72DXNU209182", weight: 3500, destination: "Newark Yard" },
        { position: 2, deck: "Upper Deck", vehicle: "2023 Tesla Model Y", vin: "7SAYGDEE9PF189201", weight: 4400, destination: "Newark Yard" },
        { position: 3, deck: "Lower Deck", vehicle: "2024 Honda CR-V", vin: "7FARW2H88RE091827", weight: 3600, destination: "Newark Yard" },
        { position: 4, deck: "Lower Deck", vehicle: null, vin: null, weight: null, destination: null },
        { position: 5, deck: "Lower Deck", vehicle: null, vin: null, weight: null, destination: null },
        { position: 6, deck: "Lower Deck", vehicle: null, vin: null, weight: null, destination: null },
        { position: 7, deck: "Lower Deck", vehicle: null, vin: null, weight: null, destination: null },
      ],
    },
  ]);

  const activeTruck = trucks.find((t) => t.id === selectedTruckId) || trucks[0];

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 min-w-0 h-full min-h-0">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            Car Hauler Load Builder
            <span className="px-2.5 py-0.5 rounded-full bg-[#dff75b] text-[#111615] text-xs font-bold shadow-xs">
              {trucks.length} Trucks Active
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Multi-car trailer deck assignment, weight distribution compliance, and digital e-BOLs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Digital e-BOL generated for " + activeTruck.truckNumber)}
            className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <FileCheck className="w-4 h-4 text-[#dff75b]" />
            <span>Generate e-BOL</span>
          </button>
        </div>
      </header>

      {/* Truck Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
        {trucks.map((truck) => {
          const isSelected = selectedTruckId === truck.id;
          const loadPercent = Math.round((truck.loadedSlots / truck.totalSlots) * 100);

          return (
            <div
              key={truck.id}
              onClick={() => setSelectedTruckId(truck.id)}
              className={`rounded-[22px] p-3.5 border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#111615] text-white border-transparent shadow-lg scale-[1.02]"
                  : "bg-[#f7faf7] hover:bg-white text-[#111615] border-white/80 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-white/10 text-[#dff75b]" : "bg-white text-gray-700 shadow-xs"
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs">{truck.truckNumber}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-[#dff75b] text-[#111615]"
                      : truck.status === "En Route"
                      ? "bg-sky-100 text-sky-900"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {truck.status}
                </span>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between text-xs">
                <span className={isSelected ? "text-white/70" : "text-gray-500 font-medium"}>
                  {truck.driverName}
                </span>
                <span className="font-extrabold">
                  {truck.loadedSlots}/{truck.totalSlots} Loaded ({loadPercent}%)
                </span>
              </div>

              <div className="mt-2 w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
                <div
                  style={{ width: `${loadPercent}%` }}
                  className={`h-full rounded-full ${isSelected ? "bg-[#dff75b]" : "bg-[#111615]"}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Deck Visualizer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0 items-stretch">
        
        {/* Left: Trailer Deck Slots (8 Cols) */}
        <div className="xl:col-span-8 bg-[#f7faf7] rounded-[26px] p-4 border border-white/80 shadow-xs flex flex-col justify-between min-h-0 overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 shrink-0">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-700" />
              <h2 className="text-sm sm:text-base font-bold text-[#111615]">
                Trailer Deck Layout ({activeTruck.trailerType})
              </h2>
            </div>
            <span className="text-xs font-semibold text-gray-500">{activeTruck.currentRoute}</span>
          </div>

          {/* Slots visual list */}
          <div className="overflow-y-auto flex-1 py-2 divide-y divide-gray-100">
            {activeTruck.slots.map((slot) => (
              <div
                key={slot.position}
                className={`py-2.5 px-3 rounded-2xl my-1 flex items-center justify-between transition-all ${
                  slot.vehicle
                    ? "bg-white shadow-xs border border-gray-200/60"
                    : "bg-gray-100/70 border border-dashed border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      slot.vehicle ? "bg-[#111615] text-[#dff75b]" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    #{slot.position}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {slot.deck}
                      </span>
                      {slot.vehicle ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                          Loaded & Strapped
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          Empty Slot
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-[#111615] mt-0.5">
                      {slot.vehicle || "Ready for Vehicle Assignment"}
                    </div>

                    {slot.vin && (
                      <div className="text-[11px] text-gray-500 font-mono">
                        VIN: {slot.vin} • Destination: <strong>{slot.destination}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {slot.weight ? (
                    <div className="text-xs font-bold text-gray-800">{slot.weight.toLocaleString()} lbs</div>
                  ) : (
                    <button className="px-3 py-1 rounded-full bg-[#111615] text-white text-[11px] font-bold hover:bg-black">
                      + Assign Car
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Driver & Weight Compliance (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col justify-between gap-3 min-h-0">
          
          {/* Driver Info Card */}
          <div className="bg-[#111615] text-white rounded-[24px] p-4 shadow-sm flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#dff75b]">Assigned Driver</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-base text-white border border-white/20">
                {activeTruck.driverName.charAt(0)}
              </div>
              <div>
                <h3 className="font-extrabold text-sm">{activeTruck.driverName}</h3>
                <p className="text-xs text-white/60 font-mono">{activeTruck.driverPhone}</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60">CDL Class A Verified</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* DOT Weight & Axle Compliance */}
          <div className="bg-[#f7faf7] rounded-[24px] p-4 border border-white/80 shadow-xs flex-1 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-700" />
                <span className="text-xs font-bold text-[#111615]">DOT Weight Compliance</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                PASSED
              </span>
            </div>

            <div className="mt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#111615]">
                  {activeTruck.grossWeightLbs.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  / {activeTruck.maxWeightLbs.toLocaleString()} lbs Max
                </span>
              </div>

              <div className="mt-2 w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  style={{ width: `${(activeTruck.grossWeightLbs / activeTruck.maxWeightLbs) * 100}%` }}
                  className="h-full rounded-full bg-[#111615]"
                />
              </div>
            </div>

            <div className="mt-2 text-[11px] text-gray-500 leading-tight">
              Axle weights balanced within Georgia DOT & Port Authority limits.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
