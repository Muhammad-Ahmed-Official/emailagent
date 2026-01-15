import ThemeToggle from '@/components/theme-toggle'
import Mail from './mail'
import ComposeButton from '@/components/Compose-Button'

export default function MailDashboard() {
  return (
    <>
      <div className='absolute bottom-4 left-4'>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8  rounded-full bg-linear-to-br from-red-600 via-red-700 to-rose-800 flex items-center justify-center text-white font-semibold text-sm select-none">A</div>
          <ThemeToggle />
          <ComposeButton />
        </div>
      </div>
      <Mail navCollapsedSize={4} />
    </>
  )
}

//  defaultLayout={[20, 32, 48]}