import ActivityItem from '@/components/ui/activity-item';
import { t } from '@/lib/i18n';
import { DashboardActivity } from '@/services/provider.service';

interface RecentActivityListProps {
    activities: DashboardActivity[];
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
    const getDotColor = (type: string) => {
        switch (type) {
            case 'published': return 'bg-accentGreen';
            case 'draft': return 'bg-accentOrange';
            case 'bulk_upload': return 'bg-primary';
            case 'enrollment': return 'bg-primary';
            case 'attendance': return 'bg-accentRed';
            default: return 'bg-textSecondary';
        }
    };

    return (
        <div className="bg-bgCard border border-borderCard rounded-lg p-6 flex flex-col h-full">
            <div className="mb-6">
                <h2 className="text-white text-lg font-semibold">
                    {t('providerDashboard.recentActivity.title')}
                </h2>
                <p className="text-textSidebarMuted text-xs mt-1">
                    {t('providerDashboard.recentActivity.subtitle')}
                </p>
            </div>

            <div className="flex flex-col flex-1">
                {activities.map((activity, index) => (
                    <ActivityItem
                        key={`${activity.type}-${index}`}
                        title={activity.message}
                        time={new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        dotColor={getDotColor(activity.type)}
                    />
                ))}
            </div>
        </div>
    );
}
