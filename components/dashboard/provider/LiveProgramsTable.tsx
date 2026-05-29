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

interface LiveProgramsTableProps {
    programs: DashboardTopProgram[];
}

export function LiveProgramsTable({ programs }: LiveProgramsTableProps) {
    return (
        <div className="bg-bgCard border border-borderCard rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-6">
                <div>
                    <h2 className="text-white text-lg font-semibold">
                        {t('providerDashboard.livePrograms.title')}
                    </h2>
                    <p className="text-textSidebarMuted text-xs mt-1">
                        {t('providerDashboard.livePrograms.subtitle')}
                    </p>
                </div>
                <button className="text-textSecondary hover:text-white text-sm font-medium transition-colors">
                    {t('providerDashboard.livePrograms.seeAll')}
                </button>
            </div>

            <Table>
                <TableHeader className="bg-[#0f172a]">
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="text-textSidebarMuted text-[10px] font-bold tracking-wider pl-6">
                            {t('providerDashboard.livePrograms.columns.program')}
                        </TableHead>
                        <TableHead className="text-textSidebarMuted text-[10px] font-bold tracking-wider">
                            {t('providerDashboard.livePrograms.columns.dates')}
                        </TableHead>
                        <TableHead className="text-textSidebarMuted text-[10px] font-bold tracking-wider text-center">
                            {t('providerDashboard.livePrograms.columns.enrolled')}
                        </TableHead>
                        <TableHead className="text-textSidebarMuted text-[10px] font-bold tracking-wider text-right pr-6">
                            {t('providerDashboard.livePrograms.columns.fill')}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {programs.map((program) => {
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
                                    {new Date(program.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
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
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
