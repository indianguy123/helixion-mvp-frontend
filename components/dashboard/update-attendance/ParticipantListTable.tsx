import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Participant } from "@/services/attendanceService";

interface ParticipantListTableProps {
  participants: Participant[];
  attendance: { [key: string]: "present" | "absent" };
  loading: boolean;
  onAttendanceChange: (participantId: string, status: "present" | "absent") => void;
  t: any;
}

export function ParticipantListTable({
  participants,
  attendance,
  loading,
  onAttendanceChange,
  t,
}: ParticipantListTableProps) {
  return (
    <div className="flex-1 overflow-auto rounded-md border border-[#333b45]">
      <Table>
        <TableHeader>
          <TableRow className="border-[#333b45] hover:bg-transparent">
            <TableHead>{t.columnName}</TableHead>
            <TableHead className="w-[100px] text-center">{t.columnPresent}</TableHead>
            <TableHead className="w-[100px] text-center">{t.columnAbsent}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-10">
                Loading...
              </TableCell>
            </TableRow>
          ) : participants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-10">
                No participants found.
              </TableCell>
            </TableRow>
          ) : (
            participants.map((p, index) => (
              <TableRow key={p.id} className="border-[#333b45] hover:bg-[#2a3038]">
                <TableCell className="font-medium text-white">
                  {index + 1}. {p.username}
                </TableCell>
                <TableCell className="align-middle text-center">
                  <div className="flex h-full w-full items-center justify-center">
                    <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded-md transition-colors">
                      <Checkbox
                        className="size-5 rounded-md border-2 border-gray-500 bg-gray-800 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
                        checked={attendance[p.id] === "present"}
                        onCheckedChange={() => onAttendanceChange(p.id, "present")}
                      />
                      <span className="text-sm font-medium text-gray-300">
                        Present
                      </span>
                    </label>
                  </div>
                </TableCell>
                <TableCell className="align-middle text-center">
                  <div className="flex h-full w-full items-center justify-center">
                    <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded-md transition-colors">
                      <Checkbox
                        className="size-5 rounded-md border-2 border-gray-500 bg-gray-800 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
                        checked={attendance[p.id] === "absent"}
                        onCheckedChange={() => onAttendanceChange(p.id, "absent")}
                      />
                      <span className="text-sm font-medium text-gray-300">
                        Absent
                      </span>
                    </label>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

