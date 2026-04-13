import { EllipsisHorizontalIcon, CodeBracketIcon } from '@heroicons/react/24/solid'
import type { ReactNode } from 'react'

interface JobCardProps {
  title: string
  icon?: ReactNode
  tags: string[]
  applicantCount: number
  onMenuClick?: () => void
}

export function JobCard({ title, icon, tags, applicantCount, onMenuClick }: JobCardProps) {
  return (
    <div className="flex w-[284px] flex-col gap-[12px] rounded-xl border border-[#E6E6E6] bg-white p-[20px]">

      {/* Top section */}
      <div className="flex flex-col gap-[12px]">

        {/* Title row — icon + title + 3-dots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            {/*  icon */}
            <div className="flex items-center justify-center rounded-lg bg-[#C8C6F7] p-[4px]">
              {icon ?? <CodeBracketIcon className="size-[20px] text-primary" />}
            </div>
            <span className="text-body-lg font-medium text-slateblue-darker">
              {title}
            </span>
          </div>
          <button
            onClick={onMenuClick}
            className="shrink-0 text-gray-800"
            aria-label="Job options"
          >
            <EllipsisHorizontalIcon className="size-[16px]" />
          </button>
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-[8px]">
          {tags.map(tag => (
            <span
              key={tag}
              className="rounded-lg bg-primary-light px-[8px] py-[4px] text-body-sm font-medium text-bg-gray-dark-active"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* Applicants count */}
      <span className="text-body-lg font-medium text-whites-darker">
        {applicantCount} Applicants
      </span>

    </div>
  )
}
