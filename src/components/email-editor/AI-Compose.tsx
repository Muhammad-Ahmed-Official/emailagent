import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Bot } from "lucide-react"
import { useState } from "react"
import { generateEmail } from "./action"
import { turndown } from "@/lib/turndown"

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
]

type Props = {
    isComposing: boolean | undefined,
    onGenerate: (token: string) => void,
}

export default function AICompose(props: Props) {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const aiGenerate = async () => {
    let context = '';
    if (!props.isComposing) {
        context = thread?.map((m:any) => `Subject: ${m.subject}\nFrom: ${m.email}\n\n${turndown.turndown(m.body ?? m.bodySnippet ?? '')}`).join('\n')
    }

    const { output } = await generateEmail(context, prompt)
        for await (const delta of output) {
            if (delta) props.onGenerate(delta)
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild> 
            <Button size='icon' variant={'outline'}> <Bot className="size-5"/> </Button> 
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>AI Smart Compose</DialogTitle>
                    <DialogDescription>AI will help you compose your email.</DialogDescription>
                    <div className="h-2"></div>
                    <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a prompt."/>
                    <div className="h-2"></div>
                    <Button onClick={() => {
                        aiGenerate()
                        setOpen(false);
                        setPrompt('');
                    }}>Generate</Button>
                </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}