import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"

type Prop = {
    isCollapsed: boolean
}

const data = [
   {
    id: '1',
    email: "ali"
   },
   {
    id: '2',
    email: "hamza"
   },
]

export default function AccountSwitcher({ isCollapsed } : Prop) {
    const [accountId, setAccountId] = useLocalStorage('accountId', '')
  return (
   <Select defaultValue={accountId} onValueChange={setAccountId}>
    <SelectTrigger aria-label="Select account"
    className={cn( "flex w-full flex-1 items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0", isCollapsed && "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden" )}> 
        <SelectValue placeholder='Select an Account'>
            <span className={cn({ 'hidden': !isCollapsed })}> 
                {data.find((account) => account.id === accountId)?.email?.slice(0, 2) ?? ''}
            </span>
            <span className={cn({ 'hidden': isCollapsed, 'ml-2': true })}> 
                {data.find((account) => account.id === accountId)?.email ?? ''}
            </span>
        </SelectValue>
    </SelectTrigger>
    <SelectContent>
        {data.map((account) => {
            return (
                 <SelectItem key={account.id} value={account.id}> {account.email} </SelectItem>
            )
        })}
        <div className="flex relative hover:bg-gray-50 w-full cursor-pointer items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline:none focus:bg-accent"> 
            <Plus className="size-4 mr-1" /> Add account 
        </div>
    </SelectContent>
   </Select>
  )
}
