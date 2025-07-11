import { Home, LogOut } from 'lucide-react'
import Image from 'next/image'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

const Avatar = () => {
  const { user, logout } = useFirebaseAuth()

  const avatarPopoverItems = [
    {
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      action: () => (window.location.href = '/')
    },
    {
      label: 'Sign Out',
      icon: <LogOut className="w-5 h-5" />,
      action: logout,
      disabled: false
    }
  ]

  // Get display name, fallback to email username, then to 'User'
  const getDisplayName = () => {
    if (user?.displayName) return user.displayName
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  return (
    <Popover>
      <PopoverTrigger className="lg:flex hidden items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100">
        <Image
          src={user?.photoURL || '/assets/images/default-avatar.webp'}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        {!user ? (
          <AvatarSkeleton />
        ) : (
          <div className="text-left">
            <p className="text-sm font-medium">{getDisplayName()}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-2 p-2"
      >
        <div className="space-y-1">
          {avatarPopoverItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              disabled={item.disabled}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function AvatarSkeleton() {
  return (
    <div className="space-y-1">
      <div className="w-30 h-5 rounded-sm animate-pulse bg-gray-300" />
      <div className="w-52 h-3 rounded-sm animate-pulse bg-gray-300" />
    </div>
  )
}

export default Avatar
