import { buttonVariants } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-80 justify-start  hover:bg-muted hover:underline'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
