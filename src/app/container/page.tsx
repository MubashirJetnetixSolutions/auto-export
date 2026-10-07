"use client";

import React, { useState } from "react";
import {
  Container as ContainerIcon,
  Ship,
  Search,
  Plus,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2,
  Trash2,
  Paperclip,
  Check,
  Copy,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  FileText,
  Boxes,
  Sparkles,
  Anchor,
  Layers,
} from "lucide-react";

export interface ContainerRecord {
  id: string;
  containerNumber: string;
  bookingNumber: string;
  warehouse: string;
  destination: string;
  batchNumber: string;
  siDueDate: string;
  eta: string;
  shippingLine: string;
  vesselDueDate: string;
  sealNumber: string;
  requestType: "Warehouse" | "Direct";
  docStatus: string;
  status: "Active" | "Delivered" | "Pending" | "Customs Hold";
}

export default function ContainerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [shippingLineFilter, setShippingLineFilter] = useState("All");
  const [requestTypeFilter, setRequestTypeFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<ContainerRecord | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Column visibility toggles (Image 3)
  const [columns, setColumns] = useState({
    containerNumber: true,
    bookingNumber: true,
    warehouse: true,
    destination: true,
    batchNumber: true,
    siDueDate: true,
    eta: true,
    shippingLine: true,
    vesselDueDate: true,
    sealNumber: true,
    requestType: true,
    docStatus: true,
    status: true,
  });

  // Form states for creating a new container
  const [newContainerNo, setNewContainerNo] = useState("");
  const [newBookingNo, setNewBookingNo] = useState("");
  const [newWarehouse, setNewWarehouse] = useState("Houston");
  const [newDestination, setNewDestination] = useState("Dammam");
  const [newBatchNo, setNewBatchNo] = useState("2425070001717");
  const [newSiDueDate, setNewSiDueDate] = useState("May 9, 2014");
  const [newEta, setNewEta] = useState("May 9, 2014");
  const [newShippingLine, setNewShippingLine] = useState("MSC");
  const [newVesselDueDate, setNewVesselDueDate] = useState("May 9, 2014");
  const [newSealNo, setNewSealNo] = useState("US156U5429");
  const [newRequestType, setNewRequestType] = useState<"Warehouse" | "Direct">("Warehouse");
  const [newDocStatus, setNewDocStatus] = useState("-");
  const [newStatus, setNewStatus] = useState<ContainerRecord["status"]>("Active");

  // Initial Data directly populated from Image 1, 2, 3 (+ additional records for pagination)
  const [containers, setContainers] = useState<ContainerRecord[]>([
    {
      id: "cnt-1",
      containerNumber: "UVRU48505128",
      bookingNumber: "2900743",
      warehouse: "Houston",
      destination: "Dammam",
      batchNumber: "2425070001717",
      siDueDate: "May 9, 2014",
      eta: "May 9, 2014",
      shippingLine: "MSC",
      vesselDueDate: "May 9, 2014",
      sealNumber: "US156U5429",
      requestType: "Warehouse",
      docStatus: "-",
      status: "Active",
    },
    {
      id: "cnt-2",
      containerNumber: "BYLU11991543",
      bookingNumber: "1471712",
      warehouse: "Sugar Land",
      destination: "Port Said",
      batchNumber: "2425090003727",
      siDueDate: "February 29, 2012",
      eta: "February 29, 2012",
      shippingLine: "Maersk",
      vesselDueDate: "February 29, 2012",
      sealNumber: "US156U5433",
      requestType: "Warehouse",
      docStatus: "-",
      status: "Delivered",
    },
    {
      id: "cnt-3",
      containerNumber: "HLOU77171846",
      bookingNumber: "1398961",
      warehouse: "West Covina",
      destination: "Dammam",
      batchNumber: "2425090003333",
      siDueDate: "April 28, 2016",
      eta: "April 28, 2016",
      shippingLine: "Hapag Lloyd",
      vesselDueDate: "April 28, 2016",
      sealNumber: "US237647564",
      requestType: "Warehouse",
      docStatus: "-",
      status: "Active",
    },
    {
      id: "cnt-4",
      containerNumber: "KDGP37527055",
      bookingNumber: "9930950",
      warehouse: "West Jordan",
      destination: "Dammam",
      batchNumber: "2435030002222",
      siDueDate: "October 25, 2019",
      eta: "October 25, 2019",
      shippingLine: "CMA",
      vesselDueDate: "October 25, 2019",
      sealNumber: "US156U5427",
      requestType: "Direct",
      docStatus: "Aw",
      status: "Active",
    },
    {
      id: "cnt-5",
      containerNumber: "VKUO92738476",
      bookingNumber: "5766263",
      warehouse: "Olathe",
      destination: "Dammam",
      batchNumber: "2435100004242",
      siDueDate: "March 13, 2014",
      eta: "March 13, 2014",
      shippingLine: "OGM",
      vesselDueDate: "March 13, 2014",
      sealNumber: "US156U5426",
      requestType: "Direct",
      docStatus: "Aw",
      status: "Active",
    },
    {
      id: "cnt-6",
      containerNumber: "MSCU98127361",
      bookingNumber: "7821092",
      warehouse: "Houston",
      destination: "Jebel Ali",
      batchNumber: "2425080001818",
      siDueDate: "June 18, 2024",
      eta: "July 04, 2024",
      shippingLine: "MSC",
      vesselDueDate: "June 20, 2024",
      sealNumber: "US156U5499",
      requestType: "Warehouse",
      docStatus: "Approved",
      status: "Active",
    },
    {
      id: "cnt-7",
      containerNumber: "ONEU78219482",
      bookingNumber: "3491028",
      warehouse: "West Covina",
      destination: "Klaipeda",
      batchNumber: "2425090004949",
      siDueDate: "August 12, 2024",
      eta: "September 02, 2024",
      shippingLine: "ONE",
      vesselDueDate: "August 15, 2024",
      sealNumber: "US156U5510",
      requestType: "Direct",
      docStatus: "Approved",
      status: "Delivered",
    },
  ]);

  // Copy handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Status update
  const handleUpdateStatus = (id: string, status: ContainerRecord["status"]) => {
    setContainers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  // Delete handler
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this container?")) {
      setContainers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Create Standalone Container submit
  const handleCreateContainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContainerNo || !newBookingNo) return;

    const newRecord: ContainerRecord = {
      id: `cnt-${Date.now()}`,
      containerNumber: newContainerNo.toUpperCase(),
      bookingNumber: newBookingNo,
      warehouse: newWarehouse,
      destination: newDestination,
      batchNumber: newBatchNo || "2425070001717",
      siDueDate: newSiDueDate,
      eta: newEta,
      shippingLine: newShippingLine,
      vesselDueDate: newVesselDueDate,
      sealNumber: newSealNo || `US${Math.floor(10000000 + Math.random() * 90000000)}`,
      requestType: newRequestType,
      docStatus: newDocStatus,
      status: newStatus,
    };

    setContainers([newRecord, ...containers]);
    setShowCreateModal(false);
    setNewContainerNo("");
    setNewBookingNo("");
  };

  // Filtered list
  const filteredContainers = containers.filter((cnt) => {
    const matchesSearch =
      cnt.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnt.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnt.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnt.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnt.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnt.shippingLine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnt.sealNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && cnt.status === "Active") ||
      (statusFilter === "Delivered" && cnt.status === "Delivered") ||
      (statusFilter === "Warehouse" && cnt.requestType === "Warehouse") ||
      (statusFilter === "Direct" && cnt.requestType === "Direct");

    const matchesWarehouse = warehouseFilter === "All" || cnt.warehouse === warehouseFilter;
    const matchesShippingLine =
      shippingLineFilter === "All" || cnt.shippingLine === shippingLineFilter;
    const matchesRequestType =
      requestTypeFilter === "All" || cnt.requestType === requestTypeFilter;

    return matchesSearch && matchesStatus && matchesWarehouse && matchesShippingLine && matchesRequestType;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredContainers.length / itemsPerPage) || 1;
  const paginatedContainers = filteredContainers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status Style Helper
  const getStatusBadgeStyle = (status: ContainerRecord["status"]) => {
    switch (status) {
      case "Active":
        return "bg-sky-100 text-sky-900 border border-sky-300/40";
      case "Delivered":
        return "bg-emerald-100 text-emerald-900 border border-emerald-300/40";
      case "Pending":
        return "bg-amber-100 text-amber-900 border border-amber-300/40";
      case "Customs Hold":
        return "bg-rose-100 text-rose-900 border border-rose-300/40";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 min-w-0 h-full min-h-0 overflow-y-auto pb-1">

      {/* ================= HEADER: TITLE + ACTION BUTTON ================= */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            Container
            <span className="px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-xs font-bold shadow-xs">
              {filteredContainers.length} Active
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Create and manage your Container flows
          </p>
        </div>

        {/* Top Action Button (Image 1, 2, 3) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
          >
            <Plus className="w-4 h-4 text-[#bfe830] group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
            <span> Standalone Container</span>
          </button>
        </div>
      </header>

      {/* ================= 4 KPI SUMMARY CARDS (FROM IMAGE 1, 2, 3 & 4) ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {/* Card 1: Active But Not Delivered (Image 1: 16) */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Active But Not Delivered</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">16</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
            <Ship className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Delivered But Not Billed (Image 1: 50) */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Delivered But Not Billed</span>
            <div className="text-2xl font-extrabold text-amber-800 mt-0.5">50</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: SI Due Today But Not Submitted (Image 1: 20) */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">SI Due Today Not Submitted</span>
            <div className="text-2xl font-extrabold text-rose-700 mt-0.5">20</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Total Container Flow (Themed Dark Card) */}
        <div className="bg-[#111615] text-white rounded-[22px] p-3.5 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Active Inventory Flow</span>
            <div className="text-2xl font-extrabold text-[#bfe830] mt-0.5">
              86 Units
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#bfe830] flex items-center justify-center font-bold">
            <ContainerIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ================= TOOLBAR: SEARCH, STATUS TABS, COLUMNS & FILTERS ================= */}
      <div className="bg-white/80 backdrop-blur-xs rounded-[24px] p-2.5 sm:p-3 border border-gray-200/60 shadow-xs flex flex-col gap-2.5 shrink-0">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Container, Booking, Line, Warehouse..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden"
            />
          </div>

          {/* Quick Filter Tabs (Image 4) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {["All", "Warehouse", "Direct", "Active", "Delivered"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${statusFilter === st
                    ? "bg-[#111615] text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Columns & Filters Buttons (Image 1, 2, 3) */}
          <div className="flex items-center gap-2 self-end lg:self-auto relative">
            {/* Columns Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowColumnsMenu(!showColumnsMenu)}
                className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Columns</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {showColumnsMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-30 flex flex-col gap-1 text-xs">
                  <div className="px-2 py-1 font-bold text-gray-400 text-[10px] uppercase">Toggle Columns</div>
                  {Object.entries(columns).map(([colKey, isVisible]) => (
                    <label
                      key={colKey}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-50 cursor-pointer font-medium text-gray-700 capitalize"
                    >
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={() =>
                          setColumns((prev) => ({
                            ...prev,
                            [colKey]: !prev[colKey as keyof typeof columns],
                          }))
                        }
                        className="rounded-sm text-[#111615] focus:ring-[#111615]"
                      />
                      <span>{colKey.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filters Toggle Button (Image 2) */}
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

        {/* Collapsible Filter Bar (Image 2: Warehouse, Destination, Status, Shipping Line) */}
        {showFilters && (
          <div className="pt-2.5 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs animate-in fade-in duration-150">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Warehouse</label>
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

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Shipping Line</label>
              <select
                value={shippingLineFilter}
                onChange={(e) => setShippingLineFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-800 outline-hidden"
              >
                <option value="All">All Shipping Lines</option>
                <option value="MSC">MSC</option>
                <option value="Maersk">Maersk</option>
                <option value="Hapag Lloyd">Hapag Lloyd</option>
                <option value="CMA">CMA</option>
                <option value="OGM">OGM</option>
                <option value="ONE">ONE</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Request Type</label>
              <select
                value={requestTypeFilter}
                onChange={(e) => setRequestTypeFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-800 outline-hidden"
              >
                <option value="All">All Types</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Direct">Direct</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setWarehouseFilter("All");
                  setShippingLineFilter("All");
                  setRequestTypeFilter("All");
                  setStatusFilter("All");
                  setSearchTerm("");
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MAIN ROW CARDS LIST CONTAINER (EXACT IMAGE 4 UI) ================= */}
      <div className="bg-[#f7faf7] rounded-[26px] border border-white/80 shadow-xs flex-1 min-h-0 overflow-hidden flex flex-col justify-between">
        <div className="overflow-y-auto flex-1 p-2.5 sm:p-3.5 space-y-2.5">
          {paginatedContainers.length === 0 ? (
            <div className="h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <Ship className="w-12 h-12 stroke-[1.2] mb-2 text-gray-300" />
              <p className="font-bold text-sm text-gray-600">No containers found</p>
              <p className="text-xs text-gray-400">Try adjusting your filters or create a standalone container.</p>
            </div>
          ) : (
            paginatedContainers.map((cnt) => {
              const statusBadgeStyle = getStatusBadgeStyle(cnt.status);

              return (
                <div
                  key={cnt.id}
                  className="bg-white/95 hover:bg-white rounded-[22px] p-3.5 sm:p-4 border border-gray-200/70 shadow-xs hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 group"
                >
                  {/* Left Column: Icon + Badges + Container Info */}
                  <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                    {/* Container Icon Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0f4ef] border border-gray-200/70 flex items-center justify-center text-[#111615] shrink-0 font-bold group-hover:bg-[#bfe830] transition-colors shadow-xs">
                      <ContainerIcon className="w-5 h-5 text-gray-800" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Top Badges Row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Container Number */}
                        <span className="font-mono text-xs font-extrabold text-[#111615] tracking-tight">
                          {cnt.containerNumber}
                        </span>

                        {/* Booking Number */}
                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200/50 text-[10px] font-bold font-mono">
                          Booking: {cnt.bookingNumber}
                        </span>

                        {/* Batch Number */}
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 text-[10px] font-bold font-mono">
                          Batch: {cnt.batchNumber}
                        </span>

                        {/* Seal Number */}
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-bold font-mono">
                          Seal: {cnt.sealNumber}
                        </span>

                        {/* Shipping Line */}
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                          {cnt.shippingLine}
                        </span>

                        {/* Request Type */}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${cnt.requestType === "Warehouse"
                              ? "bg-indigo-100 text-indigo-900 border border-indigo-200/50"
                              : "bg-sky-100 text-sky-900 border border-sky-200/50"
                            }`}
                        >
                          {cnt.requestType}
                        </span>

                        {/* Status Dropdown */}
                        <div className="relative inline-block">
                          <select
                            value={cnt.status}
                            onChange={(e) =>
                              handleUpdateStatus(
                                cnt.id,
                                e.target.value as ContainerRecord["status"]
                              )
                            }
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer outline-hidden transition-all ${statusBadgeStyle}`}
                          >
                            <option value="Active">● Active</option>
                            <option value="Delivered">● Delivered</option>
                            <option value="Pending">● Pending</option>
                            <option value="Customs Hold">● Customs Hold</option>
                          </select>
                        </div>
                      </div>

                      {/* Main Title: Container & Shipping Line */}
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-xs sm:text-sm font-bold text-[#111615] truncate">
                          Container #{cnt.containerNumber}
                        </h3>
                        <span className="text-[11px] text-gray-500 font-medium hidden sm:inline truncate">
                          • {cnt.shippingLine} Ocean Line
                        </span>
                      </div>

                      {/* Due Dates & ETA */}
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium mt-0.5 flex-wrap">
                        <span>SI Due: <strong className="text-gray-800">{cnt.siDueDate}</strong></span>
                        <span>•</span>
                        <span>Vessel Due: <strong className="text-gray-800">{cnt.vesselDueDate}</strong></span>
                        <span>•</span>
                        <span>ETA: <strong className="text-gray-800">{cnt.eta}</strong></span>
                        <button
                          onClick={() => handleCopy(cnt.containerNumber)}
                          title="Copy Container Number"
                          className="text-gray-400 hover:text-black transition-colors ml-1"
                        >
                          {copiedText === cnt.containerNumber ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Route (Warehouse -> Destination Port) */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 px-3 py-2 bg-gray-50/90 rounded-2xl border border-gray-200/50 max-w-md shrink-0">
                    <div className="flex items-center gap-1.5 truncate text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{cnt.warehouse} Yard</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1.5 truncate text-gray-900 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{cnt.destination} Port</span>
                    </div>
                  </div>

                  {/* Doc Status Pill */}
                  {cnt.docStatus !== "-" && (
                    <div className="hidden lg:flex flex-col text-xs text-gray-500 max-w-[120px] shrink-0">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Doc Status</span>
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        {cnt.docStatus}
                      </span>
                    </div>
                  )}

                  {/* Right Column: Action Buttons */}
                  <div className="flex items-center justify-between xl:justify-end gap-3 shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedContainer(cnt)}
                        title="View Details & Documents"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(cnt.id)}
                        title="Delete Container Record"
                        className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedContainer(cnt)}
                        className="px-4 py-1.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ================= PAGINATION BAR (FROM IMAGE 1, 2, 3) ================= */}
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
              Page {currentPage} of {totalPages}
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
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded-full bg-[#111615] text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center gap-1 transition-colors shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CREATE STANDALONE CONTAINER MODAL ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateContainer}
            className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <ContainerIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">Add Standalone Container</h3>
                  <p className="text-xs text-gray-500">Record an export shipping container shipment</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Container Number *</label>
                <input
                  type="text"
                  required
                  value={newContainerNo}
                  onChange={(e) => setNewContainerNo(e.target.value)}
                  placeholder="e.g. UVRU48505128"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono uppercase font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Booking Number *</label>
                <input
                  type="text"
                  required
                  value={newBookingNo}
                  onChange={(e) => setNewBookingNo(e.target.value)}
                  placeholder="e.g. 2900743"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Origin Warehouse</label>
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
                  placeholder="e.g. Dammam or Port Said"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Shipping Line</label>
                <select
                  value={newShippingLine}
                  onChange={(e) => setNewShippingLine(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="MSC">MSC</option>
                  <option value="Maersk">Maersk</option>
                  <option value="Hapag Lloyd">Hapag Lloyd</option>
                  <option value="CMA">CMA</option>
                  <option value="OGM">OGM</option>
                  <option value="ONE">ONE</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Request Type</label>
                <select
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value as "Warehouse" | "Direct")}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Warehouse">Warehouse</option>
                  <option value="Direct">Direct</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Seal Number</label>
                <input
                  type="text"
                  value={newSealNo}
                  onChange={(e) => setNewSealNo(e.target.value)}
                  placeholder="e.g. US156U5429"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono uppercase focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Batch Number</label>
                <input
                  type="text"
                  value={newBatchNo}
                  onChange={(e) => setNewBatchNo(e.target.value)}
                  placeholder="e.g. 2425070001717"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">SI Due Date</label>
                <input
                  type="text"
                  value={newSiDueDate}
                  onChange={(e) => setNewSiDueDate(e.target.value)}
                  placeholder="e.g. May 9, 2014"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Vessel Due Date</label>
                <input
                  type="text"
                  value={newVesselDueDate}
                  onChange={(e) => setNewVesselDueDate(e.target.value)}
                  placeholder="e.g. May 9, 2014"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Add Container
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= CONTAINER DETAILS MODAL ================= */}
      {selectedContainer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <ContainerIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">
                    Container #{selectedContainer.containerNumber}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Line: {selectedContainer.shippingLine} • Request: {selectedContainer.requestType}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContainer(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Booking Number:</span>
                <span className="font-mono font-bold text-gray-900">{selectedContainer.bookingNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Batch Number:</span>
                <span className="font-mono font-bold text-gray-900">{selectedContainer.batchNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Seal Number:</span>
                <span className="font-mono font-bold text-gray-900">{selectedContainer.sealNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Origin Warehouse:</span>
                <span className="font-bold text-gray-900">{selectedContainer.warehouse} Yard</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Destination Port:</span>
                <span className="font-bold text-gray-900">{selectedContainer.destination} Port</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">SI Due Date:</span>
                <span className="font-bold text-gray-900">{selectedContainer.siDueDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Vessel Due Date:</span>
                <span className="font-bold text-gray-900">{selectedContainer.vesselDueDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Estimated Arrival (ETA):</span>
                <span className="font-bold text-gray-900">{selectedContainer.eta}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-semibold">Documentation Status:</span>
                <span className="font-bold text-indigo-700">{selectedContainer.docStatus || "Approved"}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedContainer(null)}
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
