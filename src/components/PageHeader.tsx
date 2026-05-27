import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center py-12 md:py-16",
        className,
      )}
    >
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}