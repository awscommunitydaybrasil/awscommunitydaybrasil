import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = [
  { timeW: "w-20", titleW: "w-3/4", speakerW: "w-1/2", hasBadge: true },
  { timeW: "w-24", titleW: "w-2/3", speakerW: "w-2/5", hasBadge: true },
  { timeW: "w-16", titleW: "w-1/2", speakerW: "",       hasBadge: false },
  { timeW: "w-20", titleW: "w-4/5", speakerW: "w-1/3", hasBadge: true },
  { timeW: "w-24", titleW: "w-3/5", speakerW: "w-2/5", hasBadge: true },
  { timeW: "w-20", titleW: "w-1/2", speakerW: "",       hasBadge: false },
];

const ScheduleLoadingState = () => (
  <div>
    <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin text-primary" />
      <span className="text-sm font-display">Carregando programação…</span>
    </div>

    <div className="space-y-3">
      {SKELETON_ROWS.map((row, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card p-4 flex gap-4 items-start"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <Skeleton className={`h-4 ${row.timeW} mt-0.5 shrink-0`} />
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className={`h-4 ${row.titleW}`} />
            {row.speakerW && <Skeleton className={`h-3 ${row.speakerW}`} />}
            {row.hasBadge && <Skeleton className="h-5 w-24 rounded-full" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ScheduleLoadingState;
