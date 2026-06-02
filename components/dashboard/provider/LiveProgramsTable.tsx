import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { t } from '@/lib/i18n';
import { DashboardTopProgram } from '@/services/provider.service';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatShortDate } from '@/utils/formatters';

interface LiveProgramsTableProps {
    programs: DashboardTopProgram[];
}

export function LiveProgramsTable({ programs }: LiveProgramsTableProps) {
    const hasPrograms = programs.length > 0;

    return (
        <div className="bg-bgCard border border-borderCard rounded-lg overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
                <div>
                    <h2 className="text-white text-lg font-semibold">
                        {t('providerDashboard.livePrograms.title')}
                    </h2>
                    <p className="text-textSidebarMuted text-xs mt-1">
                        {t('providerDashboard.livePrograms.subtitle')}
                    </p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-textSecondary hover:text-white">
                    <Link href="/dashboard/programs">
                        {t('providerDashboard.livePrograms.seeAll')}
                    </Link>
                </Button>
            </div>

            <div className="flex-1 overflow-auto">
                <Table>
                    <TableHeader className="bg-[#0f172a] sticky top-0 z-10">
                        <TableRow className="border-none hover:bg-transparent">
                            {[
                                { key: 'program', label: t('providerDashboard.livePrograms.columns.program'), className: 'pl-6' },
                                { key: 'dates', label: t('providerDashboard.livePrograms.columns.dates'), className: '' },
                                { key: 'enrolled', label: t('providerDashboard.livePrograms.columns.enrolled'), className: 'text-center' },
                                { key: 'fill', label: t('providerDashboard.livePrograms.columns.fill'), className: 'text-right pr-6' }
                            ].map((col) => (
                                <TableHead
                                    key={col.key}
                                    className={`text-textSidebarMuted text-[10px] font-bold tracking-wider ${col.className}`}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!hasPrograms ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-64 text-center">
                                    <p className="text-textSidebarMuted text-sm">
                                        {t('programme.empty')}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            programs.map((program) => {
                                const fillPercentage = program.fillRate;
                                return (
                                    <TableRow
                                        key={program._id}
                                        className="border-borderCard hover:bg-bgStatCard transition-colors"
                                    >
                                        <TableCell className="text-textSecondary text-sm font-normal pl-6 py-4">
                                            {program.title}
                                        </TableCell>
                                        <TableCell className="text-textSidebarMuted text-xs font-normal py-4">
                                            {formatShortDate(program.startDate)}
                                        </TableCell>
                                        <TableCell className="text-textSecondary text-sm font-normal py-4 text-center">
                                            {program.enrolledCount} / {program.maxParticipants}
                                        </TableCell>
                                        <TableCell className="text-right pr-6 py-4">
                                            <div className="flex items-center justify-end gap-2 min-w-[80px]">
                                                <Progress
                                                    value={fillPercentage}
                                                    className="h-1.5 w-16 bg-[#1e293b]"
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
