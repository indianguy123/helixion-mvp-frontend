import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={className ?? "mb-6"}>
      <h1 className="text-xl font-semibold text-foreground">
        {title}
      </h1>

      {description && (
        <p className="text-sm text-textSidebarMuted mt-0.5">
          {description}
        </p>
      )}
    </div>
  );
}