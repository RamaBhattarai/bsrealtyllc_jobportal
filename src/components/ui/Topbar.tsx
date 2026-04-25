import { BellIcon, SunIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { SearchBar } from './SearchBar'
import { getProfile } from '../../services/auth'

export function Topbar() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  })

  const initial = profile?.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <header className="flex h-[68px] w-full items-center justify-between border-b border-[#E6E6E6] bg-white px-[24px] py-[12px]">

      {/* ── Search bar ────────────────────────────────────────────── */}
      <SearchBar className="w-[541px]" />

      {/* ── Right controls ────────────────────────────────────────── */}
      <div className="flex items-center gap-[8px]">

        {/* Bell */}
        <button
          type="button"
          className="relative rounded-[20px] border border-[#E6E6E6] bg-[#FDFDFE] p-[8px] transition-colors hover:bg-[#F5F5F5]"
          aria-label="Notifications"
        >
          <BellIcon className="size-[20px] text-[#575858]" />
          <span className="absolute right-[18px] top-[3px] size-[6px] rounded-full bg-[#F43F5E]" />
        </button>

        {/* Sun / theme */}
        <button
          type="button"
          className="rounded-[20px] border border-[#E6E6E6] bg-[#FDFDFE] p-[8px] transition-colors hover:bg-[#F5F5F5]"
          aria-label="Toggle theme"
        >
          <SunIcon className="size-[20px] text-[#575858]" />
        </button>

        {/* Avatar + name */}
        <div className="flex items-center gap-[8px]">
          <div className="flex size-[36px] items-center justify-center rounded-[20px] bg-[#4F46E5] px-[8px]">
            <span className="text-[16px] font-medium leading-[1.5] text-white">
              {initial}
            </span>
          </div>
          {profile?.name && (
            <span className="text-[14px] font-medium text-[#020617]">{profile.name}</span>
          )}
        </div>

      </div>
    </header>
  )
}
