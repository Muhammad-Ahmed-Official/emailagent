'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Archive, ArchiveX, Clock, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmailDisplay from "./email-display";

export default function ThreadDisplay() {

const thread = [
    {
        id: 1,
        email: "Ali@gmail.com",
        name: "Ali Mehar",
        ago: "2 hours ago",
        senAt: "2024-10-25",
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

return (
    <div className="flex flex-col h-full">
        {/* buttons rows */}
        <div className="flex items-center p-2">
            <div className="flex items-center gap-2">
                {/* disabled={!data} */}
                <Button variant={'ghost'} size='icon'> <Archive className="size-4" /> </Button>
                <Button variant={'ghost'} size='icon'> <ArchiveX className="size-4" /> </Button>
                <Button variant={'ghost'} size='icon'> <Trash2 className="size-4" /> </Button>
            </div>
            <Separator orientation="vertical" className="h-full ml-2" />
            <Button className="ml-2" variant={'ghost'} size='icon'> <Clock className="size-4" /> </Button>
            <div className="flex items-center ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button className="ml-2" variant={'ghost'} size='icon'> <MoreVertical className="size-4" /> </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Make as unread</DropdownMenuItem>
                        <DropdownMenuItem>Star thread</DropdownMenuItem>
                        <DropdownMenuItem>Add label</DropdownMenuItem>
                        <DropdownMenuItem>Mute thread</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <Separator />
    {
        thread ? (
            <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center p-4 shrink-0">
                <div className="flex items-center gap-4 text-sm">
                <Avatar>
                    <AvatarImage alt="avatar" />
                    <AvatarFallback>
                    {thread[0]?.name?.split(" ").map(w => w.charAt(0)).join("").toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="grid gap-1">
                    <div className="font-semibold">{thread[0].name}</div>
                        <div className="text-xs line-clamp-1">{thread[0].subject}</div>
                        <div className="text-xs line-clamp-1">
                        <span className="font-medium">Reply-To:</span> {thread[0].email}
                    </div>
                </div>

                </div>
                {thread[0].senAt && ( <div className="ml-auto text-xs text-muted-foreground"> {thread[0].senAt} </div> )}
            </div>

            <Separator />

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4 flex flex-col gap-4">
                {thread.map(email => (
                    <EmailDisplay key={email.id} email={email} />
                ))}
                </div>
            </div>

            <Separator />

            {/* Reply box */}
            <div className="shrink-0 p-4">
                Reply box
            </div>

            </div>
        ) : (
            <div className="p-8 text-center text-muted-foreground">
            No message selected
            </div>
        )
    }
    </div>
  )
}
