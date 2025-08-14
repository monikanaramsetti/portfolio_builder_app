import * as React from "react"
import { cn } from "../../lib/utils"

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Dialog({ open, onOpenChange, className, children, ...props }: DialogProps) {
  if (!open) return null
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50", className)} {...props}>
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 flex justify-end gap-2", className)} {...props} />
} 