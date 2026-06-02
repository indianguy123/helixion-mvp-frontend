import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface QuickActionCardProps {
    title: string;
    description: string;
    linkText: string;
    href: string;
}

export function QuickActionCard({
    title,
    description,
    linkText,
    href,
}: QuickActionCardProps) {
    return (
        <Card className="bg-bgStatCard border-borderCard p-6 flex flex-col justify-between h-full hover:border-primary/50 transition-colors">
            <div>
                <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
                <p className="text-textSecondary text-sm leading-relaxed mb-4">
                    {description}
                </p>
            </div>
            <Link
                href={href}
                className="text-textSecondary hover:text-white text-sm font-medium transition-colors"
            >
                {linkText}
            </Link>
        </Card>
    );
}
