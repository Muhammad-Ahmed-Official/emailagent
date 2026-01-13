'use client'

import { useEffect } from 'react'

type ResizeHandleProps = {
  onResize: (deltaX: number) => void
}

export function ResizeHandle({ onResize }: ResizeHandleProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX

    const onMouseMove = (moveEvent: MouseEvent) => {
      onResize(moveEvent.clientX - startX)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className="w-1 cursor-col-resize bg-border hover:bg-muted transition"
    />
  )
}




// "use client"

// import React from "react"
// import { GripVerticalIcon } from "lucide-react"
// import * as ResizablePrimitive from "react-resizable-panels"

// import { cn } from "@/lib/utils"

// function ResizablePanelGroup({
//   className,
//   ...props
// }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
//   return (
//     <ResizablePrimitive.PanelGroup
//       data-slot="resizable-panel-group"
//       className={cn(
//         "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function ResizablePanel({
//   ...props
// }: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
//   return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
// }

// function ResizableHandle({
//   withHandle,
//   className,
//   ...props
// }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
//   withHandle?: boolean
// }) {
//   return (
//     <ResizablePrimitive.PanelResizeHandle
//       data-slot="resizable-handle"
//       className={cn(
//         "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
//         className
//       )}
//       {...props}
//     >
//       {withHandle && (
//         <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
//           <GripVerticalIcon className="size-2.5" />
//         </div>
//       )}
//     </ResizablePrimitive.PanelResizeHandle>
//   )
// }

// export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
