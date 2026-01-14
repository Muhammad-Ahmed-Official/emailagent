import { cn } from '@/lib/utils';
import { Letter } from 'react-letter';

const data = {
  from: 'Ali',
  email: "ali@gmail.com",
  ago: "2 hours ago",
  body: "good to go"
}

export default function EmailDisplay({email}: any) {
  const isMe = false;
  
  return (
    <div className={cn('border rounded-md p-4 transition-all hover:translate-x-2', {'border-l-gray-900 dark:border-l-white': isMe })}>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center justify-between gap-2'>
          {!isMe && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10  rounded-full bg-linear-to-br from-red-600 via-red-700 to-rose-800 flex items-center justify-center text-white font-semibold text-sm select-none">
                {data.from?.charAt(1)}
              </div>
              <span className='font-medium'> {isMe ? 'Me' : data?.email} </span>
            </div>
          )}
        </div>
          <p className='text-xs text-muted-foreground'>{`about ${data.ago}`}</p>
      </div>
      <div className='h-4'></div>
      <Letter html={data?.body ?? ''} className='bg-white rounded-md text-black' />
    </div>
  )
}