import ThemeToggle from '@/components/theme-toggle'
import Mail from './mail'

export default function MailDashboard() {
  return (
    <>
      <div className='absolute bottom-4 left-4'>
        <ThemeToggle />
      </div>
      <Mail navCollapsedSize={4} />
    </>
  )
}

//  defaultLayout={[20, 32, 48]}