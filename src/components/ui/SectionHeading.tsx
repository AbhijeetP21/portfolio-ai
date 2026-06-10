interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-3">
        {index} — {label}
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
