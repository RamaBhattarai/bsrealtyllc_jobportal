import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  CalendarIcon,
  CogIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import logo from '../../assets/logo-new.png'

const navItems = [
  { label: 'Dashboard',  icon: HomeIcon,       path: '/dashboard'  },
  { label: 'Jobs',       icon: BriefcaseIcon,  path: '/jobs'       },
  { label: 'Candidates', icon: UsersIcon,      path: '/candidates' },
  { label: 'Calender',   icon: CalendarIcon,   path: '/calendar'   },
  { label: 'Settings',   icon: CogIcon,        path: '/settings'   },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[232px] shrink-0 flex-col border-r border-[#E6E6E6] bg-white">

      {/* ── Logo ──────────────────────────────────────────────────── */}
      <div className="flex h-[68px] items-center border-b border-[#E6E6E6] px-[24px]">
        <img src={logo} alt="Logo" className="w-[140px] h-auto" />
      </div>

      {/* ── Nav + Footer ──────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto pt-[16px]">

        {/* Nav links + Help — space-between pushes Help to bottom */}
        <div className="flex flex-1 flex-col justify-between px-[24px] pb-[24px]">

          {/* Nav items */}
          <div className="flex flex-col gap-[4px]">
            {navItems.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-[4px] rounded-[8px] px-[12px] py-[8px] transition-colors',
                    isActive
                      ? 'justify-between bg-[#EDEDFC]'
                      : 'hover:bg-[#F5F5FF]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-[4px]">
                      <Icon className="size-[20px] shrink-0 text-[#020617]" />
                      <span className="text-[16px] font-medium leading-[1.5] text-[#020617]">
                        {label}
                      </span>
                    </div>
                    {isActive && <ChevronDownIcon className="size-[20px] shrink-0 text-[#020617]" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Help button — pinned to bottom of nav area */}
          <div className="flex justify-center">
            <button
              type="button"
              className="flex w-[184px] items-center justify-center gap-[8px] rounded-[12px] bg-[#4F46E5] px-[16px] py-[12px] transition-colors hover:bg-[#3F38B7]"
            >
              <span className="text-[16px] font-medium leading-[1.5] text-[#EDEDFC]">
                Need Help?
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center border-t border-[#E0E1E2] px-[12px] py-[16px]">
          <span className="text-[14px] font-normal leading-[1.43] text-[#959697]">
            @2025 GITGI
          </span>
        </div>

      </div>
    </aside>
  )
}
