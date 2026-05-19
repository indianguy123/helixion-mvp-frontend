"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import en from "@/message/en.json";
import { attendanceService, Program } from "@/services/attendanceService";
import { ProgramListTable } from "@/components/dashboard/update-attendance/ProgramListTable";

export default function UpdateAttendancePage() {
  const t = en.updateAttendance;
  const router = useRouter();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPrograms();
  }, [page, limit]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await attendanceService.getPrograms(page, limit);
      // Backend returns { success, data: { programs, total, page, limit, totalPages } }
      const payload = res.data || res;
      setPrograms(payload.programs || []);
      setTotal(payload.total || 0);
    } catch (error) {
      console.error("Failed to fetch programs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedProgramId(id === selectedProgramId ? null : id);
  };

  const handleUpdateClick = () => {
    if (selectedProgramId) {
      router.push(`/dashboard/update-attendance/${selectedProgramId}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e2329] rounded-md border border-[#333b45] p-6 text-white min-h-[600px]">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-lg font-semibold">{t.pageTitle}</h2>
      </div>

      <ProgramListTable
        programs={programs}
        loading={loading}
        selectedProgramId={selectedProgramId}
        onSelectProgram={handleSelect}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
        onUpdateClick={handleUpdateClick}
        t={t}
      />
    </div>
  );
}
