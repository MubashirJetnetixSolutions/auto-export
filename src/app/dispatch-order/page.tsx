"use client";

import React, { useState } from "react";
import {
  Truck,
  Search,
  Plus,
  Filter,
  MapPin,
  ArrowRight,
  Clock,
  Car,
  Trash2,
  Paperclip,
  Check,
  Copy,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Container as ContainerIcon,
  FileText,
  Sparkles,
  Edit3,
  X,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

export interface DispatchOrderItem {
  id: string;
  customer: string;
  type: "RORO" | "Container";
  warehouse: string;
  terminal: string;
  vin: string;
  notes: string;
  status: "To Be Listed" | "Listed" | "Driver Assigned" | "Picked Up" | "In Transit";
  vehicle?: string;
  rate?: number;
  date?: string;
  carrier?: string;
  pickupState?: string;
  pickupCity?: string;
  portOfDestination?: string;
  deliveryTerminal?: string;
  containerNumber?: string;
  vins?: string[];
}

export default function DispatchOrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DispatchOrderItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [docSearchTerm, setDocSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Form states for creating a new dispatch order
  const [newOrderId, setNewOrderId] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newType, setNewType] = useState<"RORO" | "Container">("RORO");
  const [newWarehouse, setNewWarehouse] = useState("Houston");
  const [newTerminal, setNewTerminal] = useState("Houston");
  const [newVin, setNewVin] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newStatus, setNewStatus] = useState<"To Be Listed" | "Listed" | "Driver Assigned" | "Picked Up" | "In Transit">("To Be Listed");
  const [newVehicle, setNewVehicle] = useState("");
  const [newRate, setNewRate] = useState("420");

  // Initial Data directly populated from Image 1 (+ additional records for pagination)
  const [orders, setOrders] = useState<DispatchOrderItem[]>([
    {
      id: "D45118",
      customer: "Annette Black",
      type: "RORO",
      warehouse: "Houston",
      terminal: "Houston",
      vin: "KNDJD73385308242",
      notes: "User reports that their night vision will sometimes cut to a black screen for a split second (though this is rare).",
      status: "To Be Listed",
      vehicle: "2024 Mercedes-Benz GLE 450",
      rate: 380,
      carrier: "Falcon Auto Transport",
      date: "Today, 08:30 AM",
      pickupState: "Oklahoma",
      pickupCity: "Oklahoma City",
      portOfDestination: "Damam",
      deliveryTerminal: "Damam International Terminal",
      containerNumber: "UVRU48595126",
      vins: ["5J6RM4H73EL043445", "5J6RE4H72BL060004", "FEDLE40F0VHC93333"],
    },
    {
      id: "W45118",
      customer: "Kristin Watson",
      type: "Container",
      warehouse: "Sugar Land",
      terminal: "Gate 11",
      vin: "1FDKF37GOVEC48752",
      notes: "With so many technological advancements, express ocean dispatch container priority loading confirmed.",
      status: "Listed",
      vehicle: "2023 BMW M4 Competition",
      rate: 420,
      carrier: "Apex Logistics LLC",
      date: "Today, 09:15 AM",
      pickupState: "Texas",
      pickupCity: "Houston",
      portOfDestination: "Port Said",
      deliveryTerminal: "Port Said Container Terminal",
      containerNumber: "BYUA11991542",
      vins: ["1FDKF37GOVEC48752", "4JGDA5HB1PA109283", "2T3P1RFV5PW339182"],
    },
    {
      id: "D45118-2",
      customer: "Brooklyn Simmons",
      type: "RORO",
      warehouse: "West Covina",
      terminal: "Virginia",
      vin: "5XXGR4A62DG124189",
      notes: "Standard inland delivery checklist completed. No damages noted during yard inspection.",
      status: "Driver Assigned",
      vehicle: "2024 Toyota RAV4 Hybrid",
      rate: 290,
      carrier: "Liberty Haulers",
      date: "Yesterday",
      pickupState: "California",
      pickupCity: "Los Angeles",
      portOfDestination: "Damam",
      deliveryTerminal: "Damam Port Gate 3",
      containerNumber: "HLGW77171846",
      vins: ["5XXGR4A62DG124189", "3VWDX7AJ0CM358484"],
    },
    {
      id: "D45118-3",
      customer: "Robert Fox",
      type: "RORO",
      warehouse: "West Jordan",
      terminal: "Baltimore",
      vin: "3VWDX7AJ0CM358484",
      notes: "You've heard this before - high-value sports vehicle requiring enclosed transport and photo confirmation.",
      status: "Picked Up",
      vehicle: "2022 Porsche 911 Carrera S",
      rate: 310,
      carrier: "SunCoast Express",
      date: "Yesterday",
      pickupState: "Utah",
      pickupCity: "Salt Lake City",
      portOfDestination: "Baltimore Port",
      deliveryTerminal: "Baltimore Marine Terminal Gate 1",
      containerNumber: "MSCU88192014",
      vins: ["3VWDX7AJ0CM358484", "WP0AB2A99NS249102"],
    },
    {
      id: "D45118-4",
      customer: "Eleanor Pena",
      type: "RORO",
      warehouse: "Olathe",
      terminal: "Virginia",
      vin: "2G1WG5E38C1105778",
      notes: "Developments in pre-carriage electric haulage. Battery maintained at 80% charge level for export.",
      status: "In Transit",
      vehicle: "2023 Ford F-150 Lightning EV",
      rate: 850,
      carrier: "Great Lakes Haulage",
      date: "Oct 9, 09:00 AM",
      pickupState: "Kansas",
      pickupCity: "Kansas City",
      portOfDestination: "Damam",
      deliveryTerminal: "Damam Marine Terminal Gate 4",
      containerNumber: "UVRU48595126",
      vins: ["2G1WG5E38C1105778", "1FT6W1EV4NW189201"],
    },
    {
      id: "D45118-5",
      customer: "Cody Fisher",
      type: "RORO",
      warehouse: "Dallas",
      terminal: "Houston",
      vin: "4JGDA5HB1PA109283",
      notes: "Urgent express transport required. Priority container loading schedule requested.",
      status: "Driver Assigned",
      vehicle: "2024 Lexus RX 350 AWD",
      rate: 410,
      carrier: "Falcon Auto Transport",
      date: "2 days ago",
      pickupState: "Texas",
      pickupCity: "Dallas",
      portOfDestination: "Damam",
      deliveryTerminal: "Damam Port Gate 1",
      containerNumber: "UVRU48595126",
      vins: ["4JGDA5HB1PA109283"],
    },
    {
      id: "W45118-2",
      customer: "Guy Hawkins",
      type: "Container",
      warehouse: "Savannah",
      terminal: "Savannah Port Gate 2",
      vin: "WA1VAFGE9PD019284",
      notes: "Container loading schedule confirmed with MSC ocean freight carrier.",
      status: "Listed",
      vehicle: "2023 Audi Q8 Quattro",
      rate: 520,
      carrier: "Apex Logistics LLC",
      date: "3 days ago",
      pickupState: "Georgia",
      pickupCity: "Savannah",
      portOfDestination: "Port Said",
      deliveryTerminal: "Port Said East Terminal",
      containerNumber: "BYUA11991542",
      vins: ["WA1VAFGE9PD019284"],
    },
  ]);

  // Copy handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Status update handler
  const handleUpdateStatus = (id: string, newSt: DispatchOrderItem["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newSt } : ord))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newSt });
    }
  };

  // Warehouse update in Offcanvas
  const handleUpdateWarehouse = (id: string, warehouse: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, warehouse } : ord))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, warehouse });
    }
  };

  // Terminal update in Offcanvas
  const handleUpdateTerminal = (id: string, terminal: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, terminal } : ord))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, terminal });
    }
  };

  // Delete handler
  const handleDeleteOrder = (id: string) => {
    if (confirm(`Are you sure you want to remove Order ${id}?`)) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(null);
      }
    }
  };

  // Create Order submit
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer || !newVin) return;

    const autoId = newOrderId.trim() || `D${Math.floor(45120 + Math.random() * 500)}`;
    const newRecord: DispatchOrderItem = {
      id: autoId,
      customer: newCustomer,
      type: newType,
      warehouse: newWarehouse,
      terminal: newTerminal,
      vin: newVin.toUpperCase(),
      notes: newNotes || "No notes recorded.",
      status: newStatus,
      vehicle: newVehicle || "2024 Vehicle Unit",
      rate: Number(newRate) || 400,
      carrier: "Falcon Auto Transport",
      date: "Just now",
      pickupState: "Oklahoma",
      pickupCity: "Oklahoma City",
      portOfDestination: "Damam",
      deliveryTerminal: "Damam International Terminal",
      containerNumber: "UVRU48595126",
      vins: [newVin.toUpperCase()],
    };

    setOrders([newRecord, ...orders]);
    setShowCreateModal(false);
    setNewOrderId("");
    setNewCustomer("");
    setNewVin("");
    setNewNotes("");
    setNewVehicle("");
  };

  // Filtered orders list
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.terminal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.vehicle && order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesType = typeFilter === "All" || order.type === typeFilter;
    const matchesWarehouse = warehouseFilter === "All" || order.warehouse === warehouseFilter;

    return matchesSearch && matchesStatus && matchesType && matchesWarehouse;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status Styling Helper
  const getStatusBadge = (status: DispatchOrderItem["status"]) => {
    switch (status) {
      case "To Be Listed":
        return {
          bg: "bg-gray-200 text-gray-800",
          dot: "bg-gray-500",
        };
      case "Listed":
        return {
          bg: "bg-amber-100 text-amber-900 border border-amber-300/40",
          dot: "bg-amber-500",
        };
      case "Driver Assigned":
        return {
          bg: "bg-orange-100 text-orange-900 border border-orange-300/40",
          dot: "bg-orange-500",
        };
      case "Picked Up":
        return {
          bg: "bg-blue-100 text-blue-900 border border-blue-300/40",
          dot: "bg-blue-600",
        };
      case "In Transit":
        return {
          bg: "bg-sky-100 text-sky-900 border border-sky-300/40",
          dot: "bg-sky-600",
        };
      default:
        return {
          bg: "bg-gray-100 text-gray-700",
          dot: "bg-gray-400",
        };
    }
  };

  // Mock Document Thumbnails from Image 2
  const docList = [
    { name: "one", label: "Front Left Quarter", isCar: true },
    { name: "two", label: "Front Right Quarter", isCar: true },
    { name: "three", label: "Bill of Lading Doc", isCar: false },
    { name: "four", label: "Rear View Angle", isCar: true },
    { name: "five", label: "Customs Clearance Form", isCar: false },
    { name: "six", label: "Dock Receipt", isCar: false },
    { name: "seven", label: "Side Profile", isCar: true },
    { name: "eight", label: "Inspection Report", isCar: false },
    { name: "nine", label: "Title Certificate", isCar: false },
    { name: "ten", label: "Carrier Handover Form", isCar: false },
  ];

  const filteredDocs = docList.filter((d) =>
    d.name.toLowerCase().includes(docSearchTerm.toLowerCase()) ||
    d.label.toLowerCase().includes(docSearchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 min-w-0 h-full min-h-0 overflow-y-auto pb-1">
      
      {/* ================= HEADER ================= */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            Dispatch Order
            <span className="px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-xs font-bold shadow-xs">
              {filteredOrders.length} Ready
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Orders that are ready to dispatch
          </p>
        </div>

        {/* Top Action Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
          >
            <Plus className="w-4 h-4 text-[#bfe830] group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
            <span>Create Order</span>
          </button>
        </div>
      </header>

      {/* ================= 4 SUMMARY KPI CARDS (THEMED) ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {/* Card 1: Units To Be Listed */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Units To Be Listed</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">
              1,174
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Assigned Not Yet Delivered */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Assigned Not Yet Delivered</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">
              1,174
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-900 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: In Transit */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">In Transit</span>
            <div className="text-2xl font-extrabold text-sky-700 mt-0.5">
              {orders.filter((o) => o.status === "In Transit").length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Total Active Fleet */}
        <div className="bg-[#111615] text-white rounded-[22px] p-3.5 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Total Active Fleet</span>
            <div className="text-2xl font-extrabold text-[#bfe830] mt-0.5">
              {orders.length} Units
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#bfe830] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ================= TOOLBAR: SEARCH, STATUS TABS, AND FILTERS ================= */}
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
              placeholder="Search vehicle, VIN, customer, location..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden"
            />
          </div>

          {/* Status Tabs Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {["All", "In Transit", "Pending Pickup", "Assigned", "Delivered", "To Be Listed", "Listed"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? "bg-[#111615] text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Filters Button */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                showFilters
                  ? "bg-[#111615] text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Collapsible Filter Bar */}
        {showFilters && (
          <div className="pt-2.5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-in fade-in duration-150">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Freight Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-800 outline-hidden"
              >
                <option value="All">All Types (RORO & Container)</option>
                <option value="RORO">RORO Only</option>
                <option value="Container">Container Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Origin Warehouse</label>
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
                <option value="Dallas">Dallas</option>
                <option value="Savannah">Savannah</option>
                <option value="Orlando">Orlando</option>
                <option value="Atlanta">Atlanta</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setTypeFilter("All");
                  setWarehouseFilter("All");
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

      {/* ================= MAIN ROW CARDS LIST CONTAINER ================= */}
      <div className="bg-[#f7faf7] rounded-[26px] border border-white/80 shadow-xs flex-1 min-h-0 overflow-hidden flex flex-col justify-between">
        <div className="overflow-y-auto flex-1 p-2.5 sm:p-3.5 space-y-2.5">
          {paginatedOrders.length === 0 ? (
            <div className="h-full min-h-[260px] flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <Truck className="w-12 h-12 stroke-[1.2] mb-2 text-gray-300" />
              <p className="font-bold text-sm text-gray-600">No dispatch orders found</p>
              <p className="text-xs text-gray-400">Try adjusting your search criteria or create a new order.</p>
            </div>
          ) : (
            paginatedOrders.map((order) => {
              const statusStyle = getStatusBadge(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white/95 hover:bg-white rounded-[22px] p-3.5 sm:p-4 border border-gray-200/70 shadow-xs hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 group"
                >
                  {/* Left Column: Icon + Badges + Customer + VIN (Clickable to open Offcanvas) */}
                  <div
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1 cursor-pointer"
                  >
                    {/* Vehicle/Type Icon */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#f0f4ef] border border-gray-200/70 flex items-center justify-center text-[#111615] shrink-0 font-bold group-hover:bg-[#bfe830] transition-colors shadow-xs">
                      {order.type === "Container" ? (
                        <ContainerIcon className="w-5 h-5 text-gray-800" />
                      ) : (
                        <Car className="w-5 h-5 text-gray-800" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Top Badges Row: Order ID, Type, Status */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-extrabold text-[#111615] tracking-tight">
                          {order.id}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            order.type === "RORO"
                              ? "bg-purple-100 text-purple-900 border border-purple-200/50"
                              : "bg-sky-100 text-sky-900 border border-sky-200/50"
                          }`}
                        >
                          {order.type}
                        </span>

                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="relative inline-block"
                        >
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateStatus(
                                order.id,
                                e.target.value as DispatchOrderItem["status"]
                              )
                            }
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer outline-hidden transition-all ${statusStyle.bg}`}
                          >
                            <option value="To Be Listed">● To Be Listed</option>
                            <option value="Listed">● Listed</option>
                            <option value="Driver Assigned">● Driver Assigned</option>
                            <option value="Picked Up">● Picked Up</option>
                            <option value="In Transit">● In Transit</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Name & Vehicle (Opens Offcanvas on Click) */}
                      <div className="flex items-center gap-2 mt-1">
                        <h3 className="text-xs sm:text-sm font-bold text-[#111615] hover:text-black hover:underline transition-colors truncate">
                          {order.customer}
                        </h3>
                        {order.vehicle && (
                          <span className="text-[11px] text-gray-500 font-medium hidden sm:inline truncate">
                            • {order.vehicle}
                          </span>
                        )}
                      </div>

                      {/* VIN with Copy Button */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-[11px] text-gray-500 font-mono mt-0.5"
                      >
                        <span>
                          VIN: <strong className="text-gray-800">{order.vin}</strong>
                        </span>
                        <button
                          onClick={() => handleCopy(order.vin)}
                          title="Copy VIN"
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          {copiedText === order.vin ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Route (Warehouse -> Terminal) */}
                  <div
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 px-3 py-2 bg-gray-50/90 rounded-2xl border border-gray-200/50 max-w-md shrink-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 truncate text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{order.warehouse}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1.5 truncate text-gray-900 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{order.terminal}</span>
                    </div>
                  </div>

                  {/* Notes Column */}
                  <div
                    onClick={() => setSelectedOrder(order)}
                    className="hidden md:flex flex-col text-xs text-gray-500 max-w-[200px] shrink-0 truncate cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Notes</span>
                    <span className="truncate italic font-medium text-gray-600" title={order.notes}>
                      {order.notes}
                    </span>
                  </div>

                  {/* Right Column: Carrier/Rate & Action Buttons */}
                  <div className="flex items-center justify-between xl:justify-end gap-3 shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-gray-100">
                    {order.rate && (
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-extrabold text-[#111615]">${order.rate}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{order.date}</div>
                      </div>
                    )}

                    {/* Action buttons (Offcanvas trigger, Delete, Track) */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        title="View Order Details (Off-Canvas)"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        title="Delete Order"
                        className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedOrder(order)}
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

      {/* ================= CREATE ORDER MODAL ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateOrder}
            className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">Create Dispatch Order</h3>
                  <p className="text-xs text-gray-500">Add a new unit to the inland dispatch pipeline</p>
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
                <label className="text-xs font-bold text-gray-700">Order ID</label>
                <input
                  type="text"
                  value={newOrderId}
                  onChange={(e) => setNewOrderId(e.target.value)}
                  placeholder="e.g. D45119"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  placeholder="e.g. Annette Black"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Freight Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as "RORO" | "Container")}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="RORO">RORO</option>
                  <option value="Container">Container</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Listing Status</label>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(
                      e.target.value as DispatchOrderItem["status"]
                    )
                  }
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="To Be Listed">To Be Listed</option>
                  <option value="Listed">Listed</option>
                  <option value="Driver Assigned">Driver Assigned</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Transit">In Transit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Origin Warehouse</label>
                <input
                  type="text"
                  value={newWarehouse}
                  onChange={(e) => setNewWarehouse(e.target.value)}
                  placeholder="e.g. Houston"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Destination Terminal</label>
                <input
                  type="text"
                  value={newTerminal}
                  onChange={(e) => setNewTerminal(e.target.value)}
                  placeholder="e.g. Houston or Virginia"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Notes</label>
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Add any specific transport instructions..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#111615] outline-hidden"
              />
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
                Create Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= EXACT OFF-CANVAS DRAWER (IMAGE 1 & 2 MOCKUP) ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedOrder(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over Panel from Right */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-gray-200/80 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              {/* Drawer Content */}
              <div className="p-6 sm:p-7 space-y-6 flex-1">
                
                {/* 1. Header: Order Details, ID & Action Buttons (Image 1) */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#111615] tracking-tight">
                      Order Details
                    </h2>
                    <p className="text-xs font-mono text-gray-500 font-bold mt-0.5">
                      ID: {selectedOrder.id}
                    </p>
                  </div>

                  {/* Actions: Edit, Delete, Close */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Edit mode enabled for Order ${selectedOrder.id}`)}
                      className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteOrder(selectedOrder.id)}
                      className="px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>

                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2. Top Controls Row: Warehouse, Terminal, Listing Status (Image 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Warehouse</label>
                    <select
                      value={selectedOrder.warehouse}
                      onChange={(e) => handleUpdateWarehouse(selectedOrder.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-bold text-xs text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden cursor-pointer"
                    >
                      <option value="Houston">Houston</option>
                      <option value="Sugar Land">Sugar Land</option>
                      <option value="West Covina">West Covina</option>
                      <option value="West Jordan">West Jordan</option>
                      <option value="Olathe">Olathe</option>
                      <option value="Dallas">Dallas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Terminal</label>
                    <select
                      value={selectedOrder.terminal}
                      onChange={(e) => handleUpdateTerminal(selectedOrder.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-bold text-xs text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden cursor-pointer"
                    >
                      <option value="Gate 11">Gate 11</option>
                      <option value="Houston">Houston Port</option>
                      <option value="Virginia">Virginia Port</option>
                      <option value="Baltimore">Baltimore Port</option>
                      <option value="Damam International Terminal">Damam International Terminal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Listing Status</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as DispatchOrderItem["status"])}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-bold text-xs text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden cursor-pointer"
                    >
                      <option value="Listed">Listed</option>
                      <option value="To Be Listed">To Be Listed</option>
                      <option value="Driver Assigned">Driver Assigned</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="In Transit">In Transit</option>
                    </select>
                  </div>
                </div>

                {/* 3. Section: Dispatch Details Card (Image 1) */}
                <div className="bg-[#f7faf7] rounded-[22px] p-4 sm:p-5 border border-gray-200/80 space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Dispatch Details
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500 font-medium">Customer</span>
                      <span className="font-bold text-gray-900">{selectedOrder.customer}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500 font-medium">Dispatch Order Type</span>
                      <span className="font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                        {selectedOrder.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500 font-medium">Pickup State</span>
                      <span className="font-bold text-gray-900">{selectedOrder.pickupState || "Oklahoma"}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500 font-medium">Pickup City (Optional)</span>
                      <span className="font-bold text-gray-900">{selectedOrder.pickupCity || "Oklahoma City"}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500 font-medium">Port of Destination</span>
                      <span className="font-bold text-gray-900">{selectedOrder.portOfDestination || "Damam"}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-gray-200/50">
                      <span className="text-gray-500 font-medium">Delivery Terminal</span>
                      <span className="font-bold text-gray-900">{selectedOrder.deliveryTerminal || "Damam International Terminal"}</span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-gray-500 font-medium">Container Number</span>
                      <span className="font-mono font-bold text-gray-900">{selectedOrder.containerNumber || "UVRU48595126"}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Section: Vehicle VINs Card (Image 1 & 2) */}
                <div className="bg-[#f7faf7] rounded-[22px] p-4 sm:p-5 border border-gray-200/80 space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Vehicle VINs
                  </h3>

                  <div className="space-y-2 text-xs">
                    {(selectedOrder.vins && selectedOrder.vins.length > 0
                      ? selectedOrder.vins
                      : [selectedOrder.vin, "5J6RE4H72BL060004", "FEDLE40F0VHC93333"]
                    ).map((v, idx) => (
                      <div
                        key={`vin-row-${idx}`}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-200/60"
                      >
                        <span className="text-gray-500 font-semibold">Vehicle {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-gray-900">{v}</span>
                          <button
                            onClick={() => handleCopy(v)}
                            title="Copy VIN"
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            {copiedText === v ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Section: Notes Card (Image 1 & 2) */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Notes
                  </h3>
                  <div className="bg-[#f7faf7] rounded-[22px] p-4 border border-gray-200/80 text-xs text-gray-800 leading-relaxed italic">
                    {selectedOrder.notes || "No special transport notes recorded."}
                  </div>
                </div>

                {/* 6. Section: Documents / Photos Card (Image 2) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Documents
                    </h3>
                    <span className="text-[11px] font-bold text-[#111615] bg-[#bfe830] px-2 py-0.5 rounded-full">
                      {filteredDocs.length} Files
                    </span>
                  </div>

                  {/* Documents Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={docSearchTerm}
                      onChange={(e) => setDocSearchTerm(e.target.value)}
                      placeholder="Search documents name..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:ring-2 focus:ring-[#111615] outline-hidden"
                    />
                  </div>

                  {/* Document Thumbnails Grid (Image 2) */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1">
                    {filteredDocs.map((doc, idx) => (
                      <div
                        key={`doc-${idx}`}
                        className="bg-[#f7faf7] hover:bg-white rounded-2xl p-2 border border-gray-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className="w-full aspect-square rounded-xl bg-gray-200/80 overflow-hidden flex items-center justify-center relative mb-1.5 group-hover:bg-[#eef8bb] transition-colors">
                          {doc.isCar ? (
                            <Car className="w-6 h-6 text-gray-700 group-hover:text-black" />
                          ) : (
                            <FileText className="w-6 h-6 text-gray-700 group-hover:text-black" />
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-gray-800 truncate w-full">{doc.name}</span>
                        <span className="text-[9px] text-gray-400 truncate w-full">{doc.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  Status: <strong className="text-gray-900">{selectedOrder.status}</strong>
                </span>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
                >
                  Close Drawer
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
