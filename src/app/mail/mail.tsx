'use client'

import { useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import AccountSwitcher from './account-switcher'
import Sidebar from './sidebar'
import { ResizeHandle } from '@/components/ui/resizable'
import Threadlist from './thread-list'
import ThreadDisplay from './thread-display'

export default function Mail({ navCollapsedSize = 5 }) {
  const [sidebarWidth, setSidebarWidth] = useState(20)
  const [listWidth, setListWidth] = useState(35)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSidebarResize = (dx: number) => {
    setSidebarWidth(prev => {
      const next = prev + dx * 0.05
      setIsCollapsed(next <= navCollapsedSize)
      return Math.min(Math.max(next, navCollapsedSize), 40)
    })
  }

  const handleListResize = (dx: number) => {
    setListWidth(prev => Math.min(Math.max(prev + dx * 0.05, 30), 60))
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen w-full overflow-hidden">

        {/* Sidebar */}
        <div
          style={{ width: `${sidebarWidth}%` }}
          className={cn(
            'transition-all duration-300 border-r',
            isCollapsed && 'min-w-12.5'
          )}
        >
          <div className="flex flex-col h-full">
            <div className={cn('flex items-center', isCollapsed ? 'h-13' : 'px-2 h-16')}>
              <AccountSwitcher isCollapsed={isCollapsed} />
            </div>
            <Separator />
            <Sidebar isCollapsed={isCollapsed} />
            <div className="mt-auto p-2">Ask AI</div>
          </div>
        </div>

        <ResizeHandle onResize={handleSidebarResize} />

        {/* Mail List */}
        <div style={{ width: `${listWidth}%` }} className="border-r">
          <Tabs defaultValue="inbox">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                <TabsTrigger value="done">Done</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            Search Bar
            <TabsContent value="inbox"> <Threadlist /> </TabsContent>
            <TabsContent value="done"> <Threadlist /> </TabsContent>
          </Tabs>
        </div>

        <ResizeHandle onResize={handleListResize} />

        {/* Thread View */}
        <div className="flex-1 p-4">
          <ThreadDisplay />
        </div>

      </div>
    </TooltipProvider>
  )
}




// 'use client'

// import { useState } from 'react'
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import {TooltipProvider } from "@/components/ui/tooltip"
// import { cn } from '@/lib/utils';
// import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import AccountSwitcher from './account-switcher';
// import Sidebar from './sidebar';

// type Prop = {
//     defaultLayout: number[] | undefined;
//     navCollapsedSize: number
// }

// export default function Mail({ defaultLayout = [20, 32, 48], navCollapsedSize } : Prop) {
//     const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <TooltipProvider delayDuration={0}>
//         <ResizablePanelGroup direction="horizontal" onLayout={(sizes: any) => { setIsCollapsed(sizes[0] <= navCollapsedSize)}} 
//         className='items-stretch h-full min-h-screen'>
//             <ResizablePanel defaultSize={defaultLayout[0]} collapsedSize={navCollapsedSize} onResize={() => { setIsCollapsed(false) }} collapsible minSize={15} maxSize={40} 
//             className={cn(isCollapsed && 'min-w-12.5 transition-all duration-300 ease-in-out')}>
//                 <div className='flex flex-col h-full flex-1'>
//                     <div className={cn('flex h-15.5 items-center justify-between', isCollapsed ? 'h-13' : 'px-2')}>
//                         {/* Account Switcher */}
//                         <AccountSwitcher isCollapsed={isCollapsed} />
//                     </div>
//                     <Separator />
//                     {/* Sidebar */}
//                     <Sidebar isCollapsed={isCollapsed}/>
//                     <div className='flex-1'></div>
//                     {/* AI */}
//                     Ask AI
//                 </div>
//             </ResizablePanel>
//             <ResizableHandle withHandle />
//             <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} >
//                 <Tabs defaultValue='inbox'>
//                     <div className='flex items-center px-4 py-2'>
//                         <h1 className='text-xl font-bold'>Inbox</h1>
//                         <TabsList className='ml-auto'>
//                             <TabsTrigger value='inbox' className='text-zinc-600 dark:text-zinc-200'> Inbox </TabsTrigger>
//                             <TabsTrigger value='done' className='text-zinc-600 dark:text-zinc-200'> Done </TabsTrigger>
//                         </TabsList>
//                     </div>
//                     <Separator />
//                     {/* Search Bar */}
//                     Search Bar
//                     <TabsContent value='inbox'> inbox </TabsContent>
//                     <TabsContent value='done'> done </TabsContent>
//                 </Tabs>
//             </ResizablePanel>
//             <ResizableHandle withHandle />
//             <ResizablePanel defaultSize={defaultLayout[2]} minSize={30} >
//                thread Display
//             </ResizablePanel>
//         </ResizablePanelGroup>
//     </TooltipProvider>
//   )
// }