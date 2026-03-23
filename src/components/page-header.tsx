import { type FC, type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  breadcrumbs,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-2 flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-sm">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-muted-foreground">/</span>
                )}
              </div>
            ))}
          </div>
        )}
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
};
