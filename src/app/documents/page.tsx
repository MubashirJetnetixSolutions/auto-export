"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  ShieldCheck,
  FileSpreadsheet,
  FolderOpen,
} from "lucide-react";

interface ExportDoc {
  id: string;
  docType: "Certificate of Title" | "Bill of Lading (OBL)" | "AES ITN Filing" | "Dock Receipt" | "Commercial Invoice";
  title: string;
  vin: string;
  bookingOrContainer: string;
  status: "Verified & Customs Cleared" | "72-Hr Customs Hold" | "Pending Upload" | "Action Required";
  fileSize: string;
  uploadedAt: string;
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [documents, setDocuments] = useState<ExportDoc[]>([
    {
      id: "DOC-9921",
      docType: "Certificate of Title",
      title: "Georgia Clean Title - 2024 Mercedes GLE 450",
      vin: "4JGDA5HB1PA109283",
      bookingOrContainer: "MSCU-8921034",
      status: "Verified & Customs Cleared",
      fileSize: "2.4 MB (PDF)",
      uploadedAt: "Oct 04, 2026",
    },
    {
      id: "DOC-9920",
      docType: "AES ITN Filing",
      title: "Automated Export System ITN #X20261005918231",
      vin: "WBS43AZ01PFP98214",
      bookingOrContainer: "MSCU-8921034",
      status: "Verified & Customs Cleared",
      fileSize: "840 KB (PDF)",
      uploadedAt: "Oct 05, 2026",
    },
    {
      id: "DOC-9919",
      docType: "Certificate of Title",
      title: "Texas Salvage Certificate - 2023 BMW M4",
      vin: "WBS43AZ01PFP98214",
      bookingOrContainer: "MSCU-8921034",
      status: "72-Hr Customs Hold",
      fileSize: "1.9 MB (PDF)",
      uploadedAt: "Yesterday, 03:20 PM",
    },
    {
      id: "DOC-9918",
      docType: "Bill of Lading (OBL)",
      title: "Ocean Bill of Lading - MSC Isabella VOY-2410E",
      vin: "Multiple (4 VINs)",
      bookingOrContainer: "MSCU-8921034",
      status: "Verified & Customs Cleared",
      fileSize: "3.8 MB (PDF)",
      uploadedAt: "Oct 03, 2026",
    },
    {
      id: "DOC-9917",
      docType: "Dock Receipt",
      title: "Savannah Port Terminal Gate In Receipt #DR-9018",
      vin: "2T3P1RFV5PW339182",
      bookingOrContainer: "MAEU-4091823",
      status: "Verified & Customs Cleared",
      fileSize: "1.1 MB (PDF)",
      uploadedAt: "2 days ago",
    },
    {
      id: "DOC-9916",
      docType: "Certificate of Title",
      title: "Florida Title with Lien Release - 2022 Porsche 911",
      vin: "WP0AB2A99NS249102",
      bookingOrContainer: "HLCU-9918201",
      status: "Action Required",
      fileSize: "2.8 MB (PDF)",
      uploadedAt: "3 days ago",
    },
  ]);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bookingOrContainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || doc.docType === typeFilter;
    const matchesStatus = statusFilter === "All" || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-4 min-w-0 h-full min-h-0">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101514] flex items-center gap-2.5">
            Export Documentation & Titles
            <span className="px-2.5 py-0.5 rounded-full bg-[#dff75b] text-[#111615] text-xs font-bold shadow-xs">
              {filteredDocs.length} Documents
            </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Automated US Customs AES ITN filings, original vehicle titles, dock receipts, and ocean bills of lading.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="h-10 sm:h-11 px-5 rounded-full bg-[#111615] hover:bg-[#1f2725] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <UploadCloud className="w-4 h-4 text-[#dff75b]" />
            <span>Upload Document</span>
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Customs Cleared</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">148 Docs</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">72-Hr Title Hold</span>
            <div className="text-2xl font-extrabold text-[#111615] mt-0.5">6 Vehicles</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#f7faf7] rounded-[22px] p-3.5 border border-white/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Action Required</span>
            <div className="text-2xl font-extrabold text-rose-700 mt-0.5">2 Holds</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#111615] text-white rounded-[22px] p-3.5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">AES Direct ITN Compliance</span>
            <div className="text-2xl font-extrabold text-[#dff75b] mt-0.5">100% Valid</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#dff75b] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white/80 backdrop-blur-xs rounded-[24px] p-2 sm:p-3 border border-gray-200/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-2.5 shrink-0">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search document, title, VIN, container..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-[#111615] focus:ring-2 focus:ring-[#111615] outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full md:w-auto">
          {["All", "Certificate of Title", "Bill of Lading (OBL)", "AES ITN Filing", "Dock Receipt"].map((tp) => (
            <button
              key={tp}
              onClick={() => setTypeFilter(tp)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                typeFilter === tp
                  ? "bg-[#111615] text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-[#f7faf7] rounded-[26px] border border-white/80 shadow-xs flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1 p-2 sm:p-3 divide-y divide-gray-100">
          {filteredDocs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <FileText className="w-12 h-12 stroke-[1.2] mb-2 text-gray-300" />
              <p className="font-bold text-sm text-gray-600">No documents found</p>
              <p className="text-xs text-gray-400">Upload a new title or AES filing.</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="py-3 px-3 sm:px-4 rounded-2xl hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-[#eef4ee] border border-gray-200 flex items-center justify-center text-[#111615] shrink-0 font-bold group-hover:bg-[#dff75b] transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-gray-800">{doc.id}</span>
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-semibold">
                        {doc.docType}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          doc.status === "Verified & Customs Cleared"
                            ? "bg-emerald-100 text-emerald-900"
                            : doc.status === "72-Hr Customs Hold"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-rose-100 text-rose-900"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#111615] mt-1">{doc.title}</h3>

                    <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mt-0.5 flex-wrap">
                      <span>VIN: <code className="font-mono text-gray-700">{doc.vin}</code></span>
                      <span>Ref / Container: <strong>{doc.bookingOrContainer}</strong></span>
                      <span>Size: {doc.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <button
                    onClick={() => alert(`Previewing document: ${doc.title}`)}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading PDF: ${doc.title}`)}
                    className="px-3.5 py-1.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#dff75b] flex items-center justify-center text-[#111615]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111615]">Upload Export Document</h3>
                  <p className="text-xs text-gray-500">PDF, scanned title or dock receipt</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors">
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-xs font-bold text-gray-700">Drag & drop files here or browse</p>
              <p className="text-[10px] text-gray-400 mt-1">Supports PDF, PNG, JPEG up to 25MB</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Document uploaded and submitted for US Customs verification!");
                  setShowUploadModal(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[#111615] hover:bg-black text-white text-xs font-bold shadow-md"
              >
                Submit Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
