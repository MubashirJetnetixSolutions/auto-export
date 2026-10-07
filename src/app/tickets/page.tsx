"use client";

import React, { useState } from "react";
import {
  Ticket,
  Search,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Edit3,
  Eye,
  Check,
  ShieldAlert,
  Sparkles,
  Columns3,
  User,
  Phone,
  Mail,
  Car,
  Filter,
} from "lucide-react";

interface InternalTicket {
  id: string;
  customer: string;
  phone: string;
  email: string;
  type: "RORO" | "Container";
  booking: string;
  vin: string;
  creationDate: string;
  assignedTo: string;
  status: "Quote Request" | "Documentation request" | "Customer follow up" | "General task";
}

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters State
  const [customerFilter, setCustomerFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Visible Columns
  const [columns, setColumns] = useState({
    customer: true,
    phone: true,
    email: true,
    type: true,
    booking: true,
    vin: true,
    creationDate: true,
    assignTo: true,
    status: true,
  });

  // Modal Form State
  const [newCustomer, setNewCustomer] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newType, setNewType] = useState<"RORO" | "Container">("RORO");
  const [newBooking, setNewBooking] = useState("From: - To: Dammam");
  const [newVin, setNewVin] = useState("");
  const [newAssigned, setNewAssigned] = useState("Kathryn Murphy");
  const [newStatus, setNewStatus] = useState<any>("Quote Request");

  // Initial Tickets Data from Image 1, 2, 3
  const [ticketsList, setTicketsList] = useState<InternalTicket[]>([
    {
      id: "TCK-1001",
      customer: "Annette Black",
      phone: "(270) 555-0117",
      email: "curtis.weaver@example.com",
      type: "RORO",
      booking: "From: - To: Dammam",
      vin: "KNOJ0733835098242",
      creationDate: "May 9, 2014",
      assignedTo: "Kathryn Murphy",
      status: "Quote Request",
    },
    {
      id: "TCK-1002",
      customer: "Kristin Watson",
      phone: "(505) 555-0125",
      email: "deanna.curtis@example.com",
      type: "Container",
      booking: "From: Oklahoma To: Port Said",
      vin: "1FDKF37C0VEC48752",
      creationDate: "February 29, 2012",
      assignedTo: "Darrell Steward",
      status: "Documentation request",
    },
    {
      id: "TCK-1003",
      customer: "Brooklyn Simmons",
      phone: "(704) 555-0127",
      email: "michelle.rivera@example.com",
      type: "RORO",
      booking: "From: - To: Dammam",
      vin: "5XXGR4A62DG124189",
      creationDate: "April 28, 2016",
      assignedTo: "Arlene McCoy",
      status: "Customer follow up",
    },
    {
      id: "TCK-1004",
      customer: "Robert Fox",
      phone: "(225) 555-0118",
      email: "jessica.hanson@example.com",
      type: "RORO",
      booking: "From: - To: Dammam",
      vin: "3VWDX7AJ0CM358484",
      creationDate: "October 25, 2019",
      assignedTo: "Annette Black",
      status: "General task",
    },
    {
      id: "TCK-1005",
      customer: "Devon Lane",
      phone: "(302) 555-0107",
      email: "devon.lane@example.com",
      type: "Container",
      booking: "From: Savannah To: Jebel Ali",
      vin: "4JGDA5HB1PA109283",
      creationDate: "November 14, 2023",
      assignedTo: "Marcus Vance",
      status: "Quote Request",
    },
    {
      id: "TCK-1006",
      customer: "Theresa Webb",
      phone: "(601) 555-0199",
      email: "theresa.webb@example.com",
      type: "Container",
      booking: "From: Houston To: Klaipeda",
      vin: "WBS43AZ01PFP98214",
      creationDate: "December 02, 2024",
      assignedTo: "Elena Rostova",
      status: "Documentation request",
    },
  ]);

  // Filter logic
  const filteredTickets = ticketsList.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.booking.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.phone.includes(searchTerm);

    const matchesCustomer = customerFilter === "All" || ticket.customer === customerFilter;
    const matchesType = typeFilter === "All" || ticket.type === typeFilter;
    const matchesAssigned = assignedFilter === "All" || ticket.assignedTo === assignedFilter;
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;

    return matchesSearch && matchesCustomer && matchesType && matchesAssigned && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTickets.length / pageSize) || 1;
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSelectAll = () => {
    if (selectedTickets.length === paginatedTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(paginatedTickets.map((t) => t.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedTickets.includes(id)) {
      setSelectedTickets(selectedTickets.filter((item) => item !== id));
    } else {
      setSelectedTickets([...selectedTickets, id]);
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer) return;

    const newTicket: InternalTicket = {
      id: `TCK-${Math.floor(1007 + Math.random() * 9000)}`,
      customer: newCustomer,
      phone: newPhone || "(555) 000-1234",
      email: newEmail || `${newCustomer.toLowerCase().replace(" ", ".")}@example.com`,
      type: newType,
      booking: newBooking,
      vin: newVin || "1HGCR2F83HA029182",
      creationDate: "Today",
      assignedTo: newAssigned,
      status: newStatus,
    };

    setTicketsList([newTicket, ...ticketsList]);
    setShowCreateModal(false);
    setNewCustomer("");
    setNewPhone("");
    setNewEmail("");
    setNewVin("");
  };

  const updateTicketStatus = (id: string, newSt: any) => {
    setTicketsList(ticketsList.map((t) => (t.id === id ? { ...t, status: newSt } : t)));
  };

  const updateTicketAssignee = (id: string, newAss: string) => {
    setTicketsList(ticketsList.map((t) => (t.id === id ? { ...t, assignedTo: newAss } : t)));
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 min-w-0 h-full min-h-0 overflow-y-auto">

      {/* Header: Title + Subtitle + Top Action Button */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            Internal Ticket System
            <span className="px-2.5 py-0.5 rounded-full bg-[#bfe830] text-[#111615] text-xs font-bold shadow-xs">
              {filteredTickets.length} Active
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            All your customer and internal tickets are here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
          >
            <Plus className="w-4 h-4 text-[#bfe830] group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
            <span> Open New Ticket</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Row (Image 1 + Image 4 layout) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {/* Card 1: Open Quote Request */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Open Quote Request</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">15</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Urgent Documentation Issue */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Urgent Documentation Issue</span>
            <div className="text-2xl font-extrabold text-rose-700 mt-0.5">74</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Resolved Today */}
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Resolved Today</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">28</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#eef8bb] text-[#111615] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Avg Resolution */}
        <div className="bg-[#111615] text-white rounded-[22px] p-3.5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Avg Resolution</span>
            <div className="text-2xl font-extrabold text-[#bfe830] mt-0.5">1.8 hrs</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#bfe830] flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Toolbar: Columns Dropdown, Search Input, Filters Toggle Button */}
      <div className="bg-white/80 backdrop-blur-xs rounded-[24px] p-2.5 sm:p-3 border border-gray-200/60 shadow-xs flex flex-col gap-2.5 shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer, phone, email, VIN..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-[#111615] focus:outline-hidden focus:ring-2 focus:ring-[#111615]"
            />
          </div>

          {/* Right Action Tools: Columns Dropdown + Filters Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto relative">

            {/* Columns Dropdown Toggle (Image 2) */}
            <div className="relative">
              <button
                onClick={() => setShowColumnsMenu(!showColumnsMenu)}
                className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors"
              >
                <Columns3 className="w-3.5 h-3.5 text-gray-500" />
                <span>Columns</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {/* Columns Selector Menu (Image 2) */}
              {showColumnsMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-[#18201e] text-white rounded-2xl p-3 shadow-2xl border border-white/10 z-50 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-bold text-white/50 px-2 pb-1 border-b border-white/10">
                    Toggle Table Columns
                  </div>
                  {Object.keys(columns).map((key) => {
                    const colKey = key as keyof typeof columns;
                    return (
                      <label
                        key={key}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded-lg cursor-pointer text-xs font-semibold capitalize transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={columns[colKey]}
                          onChange={(e) => setColumns({ ...columns, [colKey]: e.target.checked })}
                          className="w-4 h-4 accent-[#bfe830] rounded cursor-pointer"
                        />
                        <span>{key.replace(/([A-Z])/g, " $1")}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filters Toggle Button (Image 3) */}
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

        {/* Expanded Filters Row (Image 3) */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-gray-100 animate-in fade-in duration-150">
            {/* Filter 1: Customer */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer</label>
              <select
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 outline-hidden focus:ring-2 focus:ring-[#111615]"
              >
                <option value="All">Select All</option>
                {Array.from(new Set(ticketsList.map((t) => t.customer))).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Filter 2: Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 outline-hidden focus:ring-2 focus:ring-[#111615]"
              >
                <option value="All">Select All</option>
                <option value="RORO">RORO</option>
                <option value="Container">Container</option>
              </select>
            </div>

            {/* Filter 3: Assigned To */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Assigned To</label>
              <select
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 outline-hidden focus:ring-2 focus:ring-[#111615]"
              >
                <option value="All">Select All</option>
                {Array.from(new Set(ticketsList.map((t) => t.assignedTo))).map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Filter 4: Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 outline-hidden focus:ring-2 focus:ring-[#111615]"
              >
                <option value="All">Select All</option>
                <option value="Quote Request">Quote Request</option>
                <option value="Documentation request">Documentation request</option>
                <option value="Customer follow up">Customer follow up</option>
                <option value="General task">General task</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Internal Ticket Table Container (Image 1, 2, 3 data with Image 4 theme) */}
      <div className="bg-[#f7faf7] rounded-[26px] border border-white/80 shadow-xs flex-1 min-h-0 overflow-hidden flex flex-col justify-between">

        {/* Table View */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200/80 text-gray-500 font-bold text-[11px] uppercase tracking-wider select-none bg-white/40">
                <th className="py-3 px-3.5 text-center w-10">
                  <input
                    type="checkbox"
                    checked={selectedTickets.length === paginatedTickets.length && paginatedTickets.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-[#111615] rounded cursor-pointer"
                  />
                </th>
                {columns.customer && <th className="py-3 px-3">Customer</th>}
                {columns.phone && <th className="py-3 px-3">Phone</th>}
                {columns.email && <th className="py-3 px-3">Email</th>}
                {columns.type && <th className="py-3 px-3">Type</th>}
                {columns.booking && <th className="py-3 px-3">Booking</th>}
                {columns.vin && <th className="py-3 px-3">VIN</th>}
                {columns.creationDate && <th className="py-3 px-3">Creation Date</th>}
                {columns.assignTo && <th className="py-3 px-3">Assign To</th>}
                {columns.status && <th className="py-3 px-3">Status</th>}
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedTickets.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-gray-400">
                    <Ticket className="w-10 h-10 mx-auto stroke-[1.2] mb-2 text-gray-300" />
                    <p className="font-bold text-sm text-gray-600">No tickets found</p>
                    <p className="text-xs text-gray-400">Try adjusting your filters or keywords.</p>
                  </td>
                </tr>
              ) : (
                paginatedTickets.map((ticket) => {
                  const isChecked = selectedTickets.includes(ticket.id);

                  return (
                    <tr
                      key={ticket.id}
                      className={`hover:bg-white transition-colors duration-150 ${isChecked ? "bg-white/90 font-medium" : ""
                        }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(ticket.id)}
                          className="w-4 h-4 accent-[#111615] rounded cursor-pointer"
                        />
                      </td>

                      {/* Customer */}
                      {columns.customer && (
                        <td className="py-3.5 px-3 font-bold text-[#111615] whitespace-nowrap">
                          {ticket.customer}
                        </td>
                      )}

                      {/* Phone */}
                      {columns.phone && (
                        <td className="py-3.5 px-3 text-gray-600 font-mono whitespace-nowrap">
                          {ticket.phone}
                        </td>
                      )}

                      {/* Email */}
                      {columns.email && (
                        <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap">
                          {ticket.email}
                        </td>
                      )}

                      {/* Type */}
                      {columns.type && (
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${ticket.type === "RORO"
                                ? "bg-purple-100 text-purple-900"
                                : "bg-sky-100 text-sky-900"
                              }`}
                          >
                            {ticket.type}
                          </span>
                        </td>
                      )}

                      {/* Booking */}
                      {columns.booking && (
                        <td className="py-3.5 px-3 text-gray-700 whitespace-nowrap font-medium text-[11px]">
                          {ticket.booking}
                        </td>
                      )}

                      {/* VIN */}
                      {columns.vin && (
                        <td className="py-3.5 px-3 font-mono text-[11px] text-gray-800 whitespace-nowrap font-semibold">
                          {ticket.vin}
                        </td>
                      )}

                      {/* Creation Date */}
                      {columns.creationDate && (
                        <td className="py-3.5 px-3 text-gray-500 whitespace-nowrap text-[11px]">
                          {ticket.creationDate}
                        </td>
                      )}

                      {/* Assign To Dropdown (Image 1) */}
                      {columns.assignTo && (
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <select
                            value={ticket.assignedTo}
                            onChange={(e) => updateTicketAssignee(ticket.id, e.target.value)}
                            className="px-2.5 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 border-none text-xs font-semibold text-gray-800 cursor-pointer outline-hidden transition-colors"
                          >
                            <option value="Kathryn Murphy">Kathryn Murphy</option>
                            <option value="Darrell Steward">Darrell Steward</option>
                            <option value="Arlene McCoy">Arlene McCoy</option>
                            <option value="Annette Black">Annette Black</option>
                            <option value="Marcus Vance">Marcus Vance</option>
                            <option value="Elena Rostova">Elena Rostova</option>
                          </select>
                        </td>
                      )}

                      {/* Status Dropdown (Image 1) */}
                      {columns.status && (
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <select
                            value={ticket.status}
                            onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer outline-hidden transition-colors border-none ${ticket.status === "Quote Request"
                                ? "bg-gray-200 text-gray-800"
                                : ticket.status === "Documentation request"
                                  ? "bg-amber-100 text-amber-900"
                                  : ticket.status === "Customer follow up"
                                    ? "bg-orange-100 text-orange-900"
                                    : "bg-blue-100 text-blue-900"
                              }`}
                          >
                            <option value="Quote Request">● Quote Request</option>
                            <option value="Documentation request">● Documentation request</option>
                            <option value="Customer follow up">● Customer follow up</option>
                            <option value="General task">● General task</option>
                          </select>
                        </td>
                      )}

                      {/* Action Button (Image 1) */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => alert(`Opening ticket: ${ticket.id} (${ticket.customer})`)}
                          className="p-1.5 rounded-xl bg-gray-100 hover:bg-[#111615] hover:text-white text-gray-700 transition-colors shadow-xs"
                          title="Edit / View Ticket"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (Image 1) */}
        <div className="px-4 py-3 bg-white/60 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 cursor-pointer outline-hidden"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-xs text-gray-500 font-medium">rows per page</span>
          </div>

          {/* Current Page Text */}
          <div className="text-xs font-bold text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-gray-700 flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-gray-700 flex items-center gap-1 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal: Open New Ticket */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateTicket}
            className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-4 text-[#111615]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#bfe830] flex items-center justify-center text-[#111615]">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Open New Support Ticket</h3>
                  <p className="text-xs text-gray-500">Internal & customer service ticket</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  placeholder="e.g. Annette Black"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="RORO">RORO</option>
                  <option value="Container">Container</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Booking Route</label>
                <input
                  type="text"
                  value={newBooking}
                  onChange={(e) => setNewBooking(e.target.value)}
                  placeholder="From: - To: Dammam"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">VIN Number</label>
                <input
                  type="text"
                  value={newVin}
                  onChange={(e) => setNewVin(e.target.value)}
                  placeholder="17-char VIN"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#111615] outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Assign To</label>
                <select
                  value={newAssigned}
                  onChange={(e) => setNewAssigned(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Kathryn Murphy">Kathryn Murphy</option>
                  <option value="Darrell Steward">Darrell Steward</option>
                  <option value="Arlene McCoy">Arlene McCoy</option>
                  <option value="Annette Black">Annette Black</option>
                  <option value="Marcus Vance">Marcus Vance</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:ring-2 focus:ring-[#111615] outline-hidden"
                >
                  <option value="Quote Request">Quote Request</option>
                  <option value="Documentation request">Documentation request</option>
                  <option value="Customer follow up">Customer follow up</option>
                  <option value="General task">General task</option>
                </select>
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
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
