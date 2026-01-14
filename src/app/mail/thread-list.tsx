import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Fragment, useState } from 'react'
const data = [
    {
        data: "2024-10-25",
    },
    {
        data: "2024-11-15",
    },
    {
        data: "2024-11-05",
    },
]

const thread = [
    {
        id: 1,
        email: "Ali@gmail.com",
        name: "Ali",
        ago: "2 hours ago",
        subject: "flue",
        body: "Hope you are good, feeling well and go to abroad in vication to Germany for 2 weeks come to Jan",
        sysLabel: [ "unread", "inbox"]
    },
    {
        id: 2,
        email: "Hamza@gmail.com",
        name: "Hamza",
        ago: "3 hours ago",
        subject: "issue",
        body: "Hope you are good",
        sysLabel: [ "unread", "inbox"]
    },
    {
        id: 3,
        email: "Ammar@gmail.com",
        name: "Ammar",
        ago: "4 hours ago",
        subject: "resolve",
        body: "Hope you are good",
        sysLabel: [ "unread", "inbox"]
    },
]

export default function Threadlist() {
const [threadId, setThreadId] = useState(0);
  return (
    <div className='max-w-full max-h-[calc(100vh-120px)] overflow-y-auto'>
        <div className='flex flex-col gap-2 p-4 pt-0'>
            {data.map((val, ind) => {
                return <Fragment key={ind}>
                    <div className='text-xs font-medium text-muted-foreground mt-5 first:mt-0'> {val.data} </div>
                    {thread.map((val, ind) => {
                        return <button onClick={() => setThreadId(val.id)} key={ind} className={cn('flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all relative', {'bg-accent' : val.id === threadId})}>
                            <div className='flex flex-col w-full gap-2'>
                                <div className='flex items-center'>
                                    <div className='flex items-center gap-2'> <div className='font-semibold'> {val.name} </div> </div>
                                    <div className={cn('ml-auto text-xs')}> {val.ago} </div>
                                </div>
                                <div className='text-xs font-medium'> {val.subject} </div>
                            </div>
                            <div className='text-xs line-clamp-2 text-muted-foreground' dangerouslySetInnerHTML={{__html: val.body}}></div>
                            {val.sysLabel?.length && (
                                <div className='flex items-center gap-2'>
                                    { val.sysLabel.map(label => { return <Badge key={label} className='text-xs bg-secondary text-black'> {label} </Badge> })}
                                </div>
                            )}
                        </button>
                    })}
                </Fragment>
            })}
        </div>
    </div>
  )
}
