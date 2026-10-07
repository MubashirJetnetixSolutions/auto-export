"use client";

import React, { useState } from "react";
import {
  Warehouse,
  Boxes,
  Plus,
  Search,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  Car,
  ChevronRight,
  ChevronLeft,
  Filter,
  Check,
  Copy,
  Trash2,
  Paperclip,
  Sparkles,
  Container as ContainerIcon,
  FileText,
  AlertCircle,
  Building2,
  Calendar,
} from "lucide-react";

export interface WarehouseVehicleItem {
  id: string;
  vin: string;
  batchNumber: string;
  year: number;
  make: string;
  model: string;
  customer: string;
  warehouse: string;
  destination: string;
  title: "Yes" | "No" | "Lien" | "Doc Issue";
  status: "Ready" | "Received" | "Batched" | "Incoming";
}

export interface BatchItem {
  id: string;
  batchNumber: string;
  warehouse: string;
  destination: string;
  bookingNumber: string;
  containerNumber: string;
  creationDate: string;
  vehiclesCount: number;
}

export default function WarehouseBatchesPage() {
  const [activeTab, setActiveTab] = useState<"Warehouse" | "Batches">("Warehouse");
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Modals
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<WarehouseVehicleItem | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null);
  const [copiedVin, setCopiedVin] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // ================= DATA FROM IMAGE 1 & IMAGE 2 (WAREHOUSE INVENTORY) =================
  const [inventory, setInventory] = useState<WarehouseVehicleItem[]>([
    {
      id: "veh-1",
      vin: "KNDJD73385308242",
      batchNumber: "-",
      year: 2018,
      make: "GMC",
      model: "Cabriolet",
      customer: "Annette Black",
      warehouse: "Houston",
      destination: "Damam",
      title: "Yes",
      status: "Ready",
    },
    {
      id: "veh-2",
      vin: "1FDKF37GOVEC48752",
      batchNumber: "-",
      year: 2020,
      make: "BMW",
      model: "Coupe Quattro",
      customer: "Kristin Watson",
      warehouse: "Sugar Land",
      destination: "Port Said",
      title: "No",
      status: "Received",
    },
    {
      id: "veh-3",
      vin: "5XXGR4A62DG124189",
      batchNumber: "2425090003333",
      year: 1964,
      make: "Mercedes-Benz",
      model: "PB18 e-tron",
      customer: "Brooklyn Simmons",
      warehouse: "West Covina",
      destination: "Damam",
      title: "Lien",
      status: "Batched",
    },
    {
      id: "veh-4",
      vin: "3VWDX7AJ0CM358484",
      batchNumber: "2425080002222",
      year: 2020,
      make: "Isuzu",
      model: "A5",
      customer: "Robert Fox",
      warehouse: "West Jordan",
      destination: "Damam",
      title: "Doc Issue",
      status: "Batched",
    },
    {
      id: "veh-5",
      vin: "2G1WG5E38C1105778",
      batchNumber: "-",
      year: 2018,
      make: "Hyundai",
      model: "A1 Trail Quattro",
      customer: "Eleanor Pena",
      warehouse: "Olathe",
      destination: "Damam",
      title: "Yes",
      status: "Ready",
    },
    {
      id: "veh-6",
      vin: "4JGDA5HB1PA109283",
      batchNumber: "2425070001717",
      year: 2024,
      make: "Mercedes-Benz",
      model: "GLE 450",
      customer: "Cody Fisher",
      warehouse: "Houston",
      destination: "Damam",
      title: "Yes",
      status: "Ready",
    },
    {
      id: "veh-7",
      vin: "WA1VAFGE9PD019284",
      batchNumber: "2425090003737",
      year: 2023,
      make: "Audi",
      model: "Q8 Quattro",
      customer: "Guy Hawkins",
      warehouse: "Sugar Land",
      destination: "Port Said",
      title: "Yes",
      status: "Batched",
    },
  ]);

  // ================= DATA FROM IMAGE 3 (BATCHES) =================
  const [batches, setBatches] = useState<BatchItem[]>([
    {
      id: "bat-1",
      batchNumber: "2425070001717",
      warehouse: "Houston",
      destination: "Damam",
      bookingNumber: "2980743",
      containerNumber: "UVRU48595126",
      creationDate: "May 9, 2014",
      vehiclesCount: 7,
    },
    {
      id: "bat-2",
      batchNumber: "2425090003737",
      warehouse: "Sugar Land",
      destination: "Port Said",
      bookingNumber: "1471712",
      containerNumber: "BYUA11991542",
      creationDate: "February 28, 2012",
      vehiclesCount: 11,
    },
    {
      id: "bat-3",
      batchNumber: "2425090003333",
      warehouse: "West Covina",
      destination: "Damam",
      bookingNumber: "1398961",
      containerNumber: "HLGW77171846",
      creationDate: "April 28, 2016",
      vehiclesCount: 15,
    },
    {
      id: "bat-4",
      batchNumber: "2425080002222",
      warehouse: "West Jordan",
      destination: "Damam",
      bookingNumber: "3892019",
      containerNumber: "MSCU88192014",
      creationDate: "August 14, 2022",
      vehiclesCount: 9,
    },
  ]);

  // New Vehicle form state
  const [newVin, setNewVin] = useState("");
  const [newBatchNumber, setNewBatchNumber] = useState("-");
  const [newYear, setNewYear] = useState("2024");
  const [newMake, setNewMake] = useState("Toyota");
  const [newModel, setNewModel] = useState("RAV4 Hybrid");
  const [newCustomer, setNewCustomer] = useState("");
  const [newWarehouse, setNewWarehouse] = useState("Houston");
  const [newDestination, setNewDestination] = useState("Damam");
  const [newTitle, setNewTitle] = useState<WarehouseVehicleItem["title"]>("Yes");
  const [newStatus, setNewStatus] = useState<WarehouseVehicleItem["status"]>("Ready");

  // New Batch form state
  const [newBatchNo, setNewBatchNo] = useState("");
  const [newBatchWarehouse, setNewBatchWarehouse] = useState("Houston");
  const [newBatchDest, setNewBatchDest] = useState("Damam");
  const [newBookingNo, setNewBookingNo] = useState("");
  const [newContainerNo, setNewContainerNo] = useState("");
  const [newVehicleCount, setNewVehicleCount] = useState("4");

  // Handlers
  const handleCopyVin = (vin: string) => {
    navigator.clipboard.writeText(vin);
    setCopiedVin(vin);
    setTimeout(() => setCopiedVin(null), 2000);
  };

  const handleUpdateStatus = (id: string, status: WarehouseVehicleItem["status"]) => {
    setInventory((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm("Are you sure you want to remove this vehicle record?")) {
      setInventory((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleDeleteBatch = (id: string) => {
    if (confirm("Are you sure you want to remove this batch?")) {
      setBatches((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVin || !newCustomer) return;

    const newVeh: WarehouseVehicleItem = {
      id: `veh-${Date.now()}`,
      vin: newVin.toUpperCase(),
      batchNumber: newBatchNumber,
      year: Number(newYear) || 2024,
      make: newMake,
      model: newModel,
      customer: newCustomer,
      warehouse: newWarehouse,
      destination: newDestination,
      title: newTitle,
      status: newStatus,
    };

    setInventory([newVeh, ...inventory]);
    setShowAddVehicleModal(false);
    setNewVin("");
    setNewCustomer("");
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedBatchNo =
      newBatchNo.trim() || `24250${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newBat: BatchItem = {
      id: `bat-${Date.now()}`,
      batchNumber: generatedBatchNo,
      warehouse: newBatchWarehouse,
      destination: newBatchDest,
      bookingNumber: newBookingNo || `${Math.floor(1000000 + Math.random() * 9000000)}`,
      containerNumber: newContainerNo || `MSCU${Math.floor(10000000 + Math.random() * 90000000)}`,
      creationDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      vehiclesCount: Number(newVehicleCount) || 4,
    };

    setBatches([newBat, ...batches]);
    setShowCreateBatchModal(false);
    setNewBatchNo("");
    setNewBookingNo("");
    setNewContainerNo("");
  };

  // Filtered Warehouse Data
  const filteredVehicles = inventory.filter((item) => {
    const matchesSearch =
      item.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWarehouse = warehouseFilter === "All" || item.warehouse === warehouseFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  // Filtered Batches Data
  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.containerNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWarehouse = warehouseFilter === "All" || batch.warehouse === warehouseFilter;

    return matchesSearch && matchesWarehouse;
  });

  // Pagination for Vehicles
  const totalVehPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination for Batches
  const totalBatPages = Math.ceil(filteredBatches.length / itemsPerPage) || 1;
  const paginatedBatches = filteredBatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status Styling
  const getVehicleStatusStyle = (status: WarehouseVehicleItem["status"]) => {
    switch (status) {
      case "Ready":
        return "bg-emerald-100 text-emerald-900 border border-emerald-300/50";
      case "Received":
        return "bg-amber-100 text-amber-900 border border-amber-300/50";
      case "Batched":
        return "bg-blue-100 text-blue-900 border border-blue-300/50";
      case "Incoming":
        return "bg-gray-100 text-gray-800 border border-gray-300/50";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTitleBadgeStyle = (title: WarehouseVehicleItem["title"]) => {
    switch (title) {
      case "Yes":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "No":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Lien":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Doc Issue":
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 min-w-0 h-full min-h-0 overflow-y-auto pb-1">

      {/* ================= HEADER: TITLE + SEGMENTED SWITCHER + ACTION BUTTON ================= */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            {activeTab === "Warehouse" ? "Warehouse Inventory" : "Batches"}
            <span className="px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-xs font-bold shadow-xs">
              {activeTab === "Warehouse" ? `${filteredVehicles.length} Units` : `${filteredBatches.length} Batches`}
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {activeTab === "Warehouse"
              ? "Manage your inventory in your warehouses"
              : "Create and manage your batches of vehicles"}
          </p>
        </div>

        {/* Center: Segmented Tab Switcher */}
        <div className="flex items-center p-1 bg-white/90 border border-gray-200/80 rounded-full shadow-xs self-start lg:self-center">
          <button
            onClick={() => {
              setActiveTab("Warehouse");
              setCurrentPage(1);
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "Warehouse"
                ? "bg-[#111615] text-white shadow-sm"
                : "text-gray-600 hover:text-black"
              }`}
          >
            Warehouse
          </button>
          <button
            onClick={() => {
              setActiveTab("Batches");
              setCurrentPage(1);
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === "Batches"
                ? "bg-[#111615] text-white shadow-sm"
                : "text-gray-600 hover:text-black"
              }`}
          >
            Batches
          </button>
        </div>

        {/* Top Right Action Button */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          {activeTab === "Warehouse" ? (
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <Plus className="w-4 h-4 text-[#bfe830] group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
              <span> Add Vehicle</span>
            </button>
          ) : (
            <button
              onClick={() => setShowCreateBatchModal(true)}
              className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <Boxes className="w-4 h-4 text-[#bfe830] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
              <span>Create Batch</span>
            </button>
          )}
        </div>
      </header>

      {/* ================= 4 KPI METRIC CARDS (FROM IMAGE 1, 2, 3) ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {/* Units Ready At Warehouse */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Units Ready At Warehouse</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">50</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Units Received At Warehouse */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Units Received At Warehouse</span>
            <div className="text-2xl font-extrabold text-amber-800 mt-0.5">57</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Batched Units for Container Loading */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Batched Units</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-0.5">
              {inventory.filter((v) => v.status === "Batched").length + 38}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        {/* Total Active Yard Capacity */}
        <div className="bg-[#111615] text-white rounded-[22px] p-3.5 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Active Inventory</span>
            <div className="text-2xl font-extrabold text-[#bfe830] mt-0.5">
              107 Units
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#bfe830] flex items-center justify-center font-bold">
            <Warehouse className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ================= TOOLBAR: SEARCH & FILTERS ================= */}
      <div className="bg-white/80 backdrop-blur-xs rounded-[24px] p-2.5 sm:p-3 border border-gray-200/60 shadow-xs flex flex-col gap-2.5 shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={
                activeTab === "Warehouse"
                  ? "Search VIN, Make, Model, Customer, Warehouse..."
                  : "Search Batch, Booking, Container, Destination..."
              }
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {activeTab === "Warehouse" && (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {["All", "Ready", "Received", "Batched"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${statusFilter === st
                        ? "bg-[#111615] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${showFilters
                  ? "bg-[#111615] text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Collapsible Filter Dropdown Panel */}
        {showFilters && (
          <div className="pt-2.5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Filter by Warehouse</label>
              <select
                value={warehouseFilter}
                onChange={(e) => setWarehouseFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-800 outline-hidden"
              >
                <option value="All">All Warehouses</option>
                <option value="Houston">Houston</option>
                <option value="Sugar Land">Sugar Land</option>
                <option value="West Covina">West Covina</option>
                <option value="West Jordan">West Jordan</option>
                <option value="Olathe">Olathe</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setWarehouseFilter("All");
                  setStatusFilter("All");
                  setSearchTerm("");
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MAIN ROW CARDS LIST CONTAINER (EXACT IMAGE MOCKUP UI) ================= */}
      <div className="bg-[#f7faf7] rounded-[26px] border border-white/80 shadow-xs flex-1 min-h-0 overflow-hidden flex flex-col justify-between">

        {activeTab === "Warehouse" ? (
          /* ================= VIEW 1: WAREHOUSE ROW CARDS ================= */
          <div className="overflow-y-auto flex-1 p-2.5 sm:p-3.5 space-y-2.5">
            {paginatedVehicles.length === 0 ? (
              <div className="h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center text-gray-400">
                <Car className="w-12 h-12 stroke-[1.2] mb-2 text-gray-300" />
                <p className="font-bold text-sm text-gray-600">No warehouse vehicles found</p>
                <p className="text-xs text-gray-400">Add a vehicle or adjust your filters.</p>
              </div>
            ) : (
              paginatedVehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="bg-white/95 hover:bg-white rounded-[22px] p-3.5 sm:p-4 border border-gray-200/70 shadow-xs hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 group"
                >
                  {/* Left Column: Icon + Badges + Customer & Vehicle + VIN */}
                  <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0f4ef] border border-gray-200/70 flex items-center justify-center text-[#111615] shrink-0 font-bold group-hover:bg-[#bfe830] transition-colors shadow-xs">
                      <Car className="w-5 h-5 text-gray-800" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Batch Number */}
                        <span className="font-mono text-xs font-bold text-gray-800">
                          {veh.batchNumber === "-" ? "Unbatched" : `Batch: ${veh.batchNumber}`}
                        </span>

                        {/* Title Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getTitleBadgeStyle(
                            veh.title
                          )}`}
                        >
                          Title: {veh.title}
                        </span>

                        {/* Vehicle Status Dropdown */}
                        <div className="relative inline-block">
                          <select
                            value={veh.status}
                            onChange={(e) =>
                              handleUpdateStatus(
                                veh.id,
                                e.target.value as WarehouseVehicleItem["status"]
                              )
                            }
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer outline-hidden transition-all ${getVehicleStatusStyle(
                              veh.status
                            )}`}
                          >
                            <option value="Ready">● Ready</option>
                            <option value="Received">● Received</option>
                            <option value="Batched">● Batched</option>
                            <option value="Incoming">● Incoming</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer & Vehicle Info */}
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-xs sm:text-sm font-bold text-[#111615] truncate">
                          {veh.customer}
                        </h3>
                        <span className="text-[11px] text-gray-500 font-medium hidden sm:inline truncate">
                          • {veh.year} {veh.make} {veh.model}
                        </span>
                      </div>

                      {/* VIN with Copy */}
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono mt-0.5">
                        <span>
                          VIN: <strong className="text-gray-800">{veh.vin}</strong>
                        </span>
                        <button
                          onClick={() => handleCopyVin(veh.vin)}
                          title="Copy VIN"
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          {copiedVin === veh.vin ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Warehouse -> Destination Route */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 px-3 py-2 bg-gray-50/90 rounded-2xl border border-gray-200/50 max-w-md shrink-0">
                    <div className="flex items-center gap-1.5 truncate text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{veh.warehouse} Yard</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1.5 truncate text-gray-900 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{veh.destination} Port</span>
                    </div>
                  </div>

                  {/* Right Column: Action Buttons */}
                  <div className="flex items-center justify-between xl:justify-end gap-3 shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedVehicle(veh)}
                        title="View Vehicle Details"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteVehicle(veh.id)}
                        title="Delete Vehicle Record"
                        className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedVehicle(veh)}
                        className="px-4 py-1.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* ================= VIEW 2: BATCHES ROW CARDS ================= */
          <div className="overflow-y-auto flex-1 p-2.5 sm:p-3.5 space-y-2.5">
            {paginatedBatches.length === 0 ? (
              <div className="h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center text-gray-400">
                <Boxes className="w-12 h-12 stroke-[1.2] mb-2 text-gray-300" />
                <p className="font-bold text-sm text-gray-600">No vehicle batches found</p>
                <p className="text-xs text-gray-400">Create a batch or adjust your filters.</p>
              </div>
            ) : (
              paginatedBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-white/95 hover:bg-white rounded-[22px] p-3.5 sm:p-4 border border-gray-200/70 shadow-xs hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 group"
                >
                  {/* Left Column: Icon + Batch details */}
                  <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0f4ef] border border-gray-200/70 flex items-center justify-center text-[#111615] shrink-0 font-bold group-hover:bg-[#bfe830] transition-colors shadow-xs">
                      <Boxes className="w-5 h-5 text-gray-800" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-extrabold text-[#111615] tracking-tight">
                          #{batch.batchNumber}
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200/50 text-[10px] font-bold font-mono">
                          Booking: {batch.bookingNumber}
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-200/50 text-[10px] font-bold font-mono">
                          Container: {batch.containerNumber}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-[10px] font-extrabold">
                          {batch.vehiclesCount} Vehicles Staged
                        </span>
                      </div>

                      {/* Batch title & Date */}
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-xs sm:text-sm font-bold text-[#111615]">
                          Vehicle Export Batch
                        </h3>
                        <span className="text-[11px] text-gray-500 font-medium">
                          • Created on {batch.creationDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Route */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 px-3 py-2 bg-gray-50/90 rounded-2xl border border-gray-200/50 max-w-md shrink-0">
                    <div className="flex items-center gap-1.5 truncate text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{batch.warehouse} Yard</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1.5 truncate text-gray-900 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{batch.destination} Port</span>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center justify-between xl:justify-end gap-3 shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedBatch(batch)}
                        title="View Batch Details"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteBatch(batch.id)}
                        title="Delete Batch"
                        className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedBatch(batch)}
                        className="px-4 py-1.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                      >
                        View Batch
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= PAGINATION BAR ================= */}
        <div className="bg-white/90 border-t border-gray-100 px-4 py-2.5 rounded-b-[26px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-500">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-100 font-bold text-gray-800 border-none outline-hidden cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">
              Page {currentPage} of {activeTab === "Warehouse" ? totalVehPages : totalBatPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                disabled={
                  currentPage === (activeTab === "Warehouse" ? totalVehPages : totalBatPages)
                }
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(activeTab === "Warehouse" ? totalVehPages : totalBatPages, p + 1)
                  )
                }
                className="px-3 py-1 rounded-full bg-[#111615] text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1 transition-colors shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ADD VEHICLE MODAL ================= */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <form
            onSubmit={handleAddVehicle}
            className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">Add Warehouse Vehicle</h3>
                  <p className="text-xs text-gray-500">Record a new vehicle in yard inventory</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddVehicleModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">VIN Number *</label>
              <input
                type="text"
                required
                value={newVin}
                onChange={(e) => setNewVin(e.target.value)}
                placeholder="17-character VIN e.g. KNDJD73385308242"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono uppercase focus:ring-2 focus:ring-[#111615] outline-hidden"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Year</label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="2024"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Make</label>
                <input
                  type="text"
                  value={newMake}
                  onChange={(e) => setNewMake(e.target.value)}
                  placeholder="e.g. GMC"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Model</label>
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="e.g. Cabriolet"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Customer *</label>
                <input
                  type="text"
                  required
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  placeholder="e.g. Annette Black"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Batch Number</label>
                <input
                  type="text"
                  value={newBatchNumber}
                  onChange={(e) => setNewBatchNumber(e.target.value)}
                  placeholder="e.g. 2425090003333 or -"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Warehouse</label>
                <select
                  value={newWarehouse}
                  onChange={(e) => setNewWarehouse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Houston">Houston</option>
                  <option value="Sugar Land">Sugar Land</option>
                  <option value="West Covina">West Covina</option>
                  <option value="West Jordan">West Jordan</option>
                  <option value="Olathe">Olathe</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Destination Port</label>
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="e.g. Damam or Port Said"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Title Status</label>
                <select
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value as WarehouseVehicleItem["title"])
                  }
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Yes">Yes (Clean Title)</option>
                  <option value="No">No (Missing)</option>
                  <option value="Lien">Lien</option>
                  <option value="Doc Issue">Doc Issue</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Vehicle Status</label>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(e.target.value as WarehouseVehicleItem["status"])
                  }
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Ready">Ready</option>
                  <option value="Received">Received</option>
                  <option value="Batched">Batched</option>
                  <option value="Incoming">Incoming</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddVehicleModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Save Vehicle
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= CREATE BATCH MODAL ================= */}
      {showCreateBatchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateBatch}
            className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">Create Vehicle Batch</h3>
                  <p className="text-xs text-gray-500">Group warehouse vehicles for container shipment</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateBatchModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Batch Number</label>
                <input
                  type="text"
                  value={newBatchNo}
                  onChange={(e) => setNewBatchNo(e.target.value)}
                  placeholder="Auto-generated if blank"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Warehouse</label>
                <select
                  value={newBatchWarehouse}
                  onChange={(e) => setNewBatchWarehouse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Houston">Houston</option>
                  <option value="Sugar Land">Sugar Land</option>
                  <option value="West Covina">West Covina</option>
                  <option value="West Jordan">West Jordan</option>
                  <option value="Olathe">Olathe</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Destination Port</label>
                <input
                  type="text"
                  value={newBatchDest}
                  onChange={(e) => setNewBatchDest(e.target.value)}
                  placeholder="e.g. Damam or Port Said"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">No. of Vehicles</label>
                <input
                  type="number"
                  value={newVehicleCount}
                  onChange={(e) => setNewVehicleCount(e.target.value)}
                  placeholder="e.g. 7"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Booking Number</label>
                <input
                  type="text"
                  value={newBookingNo}
                  onChange={(e) => setNewBookingNo(e.target.value)}
                  placeholder="e.g. 2980743"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Container Number</label>
                <input
                  type="text"
                  value={newContainerNo}
                  onChange={(e) => setNewContainerNo(e.target.value)}
                  placeholder="e.g. UVRU48595126"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono uppercase focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateBatchModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Create Batch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VEHICLE DETAILS MODAL ================= */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Customer: {selectedVehicle.customer}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">VIN:</span>
                <span className="font-mono font-bold text-gray-900">{selectedVehicle.vin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Batch Number:</span>
                <span className="font-mono font-bold text-gray-900">{selectedVehicle.batchNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Title Status:</span>
                <span className="font-bold text-gray-900">{selectedVehicle.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Vehicle Status:</span>
                <span className="font-bold text-gray-900">{selectedVehicle.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Origin Warehouse:</span>
                <span className="font-bold text-gray-900">{selectedVehicle.warehouse} Yard</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-semibold">Destination Port:</span>
                <span className="font-bold text-gray-900">{selectedVehicle.destination} Port</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-6 py-2.5 rounded-full bg-[#111615] text-white text-xs font-bold shadow-md hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BATCH DETAILS MODAL ================= */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">
                    Batch #{selectedBatch.batchNumber}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Staged for Container Shipment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBatch(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Booking Number:</span>
                <span className="font-mono font-bold text-gray-900">{selectedBatch.bookingNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Container Number:</span>
                <span className="font-mono font-bold text-gray-900">{selectedBatch.containerNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Vehicles Staged:</span>
                <span className="font-bold text-gray-900">{selectedBatch.vehiclesCount} Units</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Origin Warehouse:</span>
                <span className="font-bold text-gray-900">{selectedBatch.warehouse} Yard</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Destination Port:</span>
                <span className="font-bold text-gray-900">{selectedBatch.destination} Port</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-semibold">Creation Date:</span>
                <span className="font-bold text-gray-900">{selectedBatch.creationDate}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBatch(null)}
                className="px-6 py-2.5 rounded-full bg-[#111615] text-white text-xs font-bold shadow-md hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
