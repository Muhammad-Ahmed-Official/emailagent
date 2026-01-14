import { File, Inbox, Send } from "lucide-react"
import { Nav } from "./nav"
import { useLocalStorage } from "usehooks-ts"

type Prop = {
    isCollapsed: boolean
}

export default function Sidebar({ isCollapsed } : Prop) {
    const [tab] = useLocalStorage("tab", "inbox")

  return (
    <Nav 
        isCollapsed={isCollapsed}
        links={[
                {
                    title: "Inbox",
                    label: "0",
                    icon: Inbox,
                    variant: tab === "inbox" ? "default" : "ghost",
                },
                {
                    title: "Drafts",
                    label:  "2",
                    icon: File,
                    variant: tab === "drafts" ? "default" : "ghost",
                },
                {
                    title: "Sent",
                    label: "6",
                    icon: Send,
                    variant: tab === "sent" ? "default" : "ghost",
                },
        ]}
    />
  )
}
