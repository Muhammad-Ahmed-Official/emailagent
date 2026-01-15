'use client'

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { Pencil } from "lucide-react"
import EmailEditor from "./email-editor"
import { useState } from "react"
import { useLocalStorage } from "usehooks-ts"

export default function ComposeButton() {
    const [open, setOpen] = useState(false)
    const [accountId] = useLocalStorage('accountId', '')
    const [toValues, setToValues] = useState<{ label: string; value: string; }[]>([])
    const [ccValues, setCcValues] = useState<{ label: string; value: string; }[]>([])
    const [subject, setSubject] = useState<string>('')

    
  const handleSend = async (value: string) => {
    if (!value) return;
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <Button> <Pencil className="size-4"/>Compose</Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Compose Email</DrawerTitle>
            </DrawerHeader>
            <EmailEditor
                toValues={toValues}
                ccValues={ccValues}

                onToChange={(values) => {
                    setToValues(values)
                }}
                onCcChange={(values) => {
                    setCcValues(values)
                }}

                subject={subject}
                setSubject={setSubject}

                to={toValues.map(to => to.value)}
                handleSend={handleSend}
                isSending={false}

                defaultToolbarExpand
            />
        </DrawerContent>
    </Drawer>
  )
}
