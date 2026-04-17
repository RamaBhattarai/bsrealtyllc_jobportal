export function QuickInsightCard() {
  return (
    <div className="flex w-full flex-col gap-[8px] rounded-[12px] border-l-[4px] border-l-[#4F46E5] bg-white px-[20px] py-[12px] shadow-[0px_0.5px_4px_0px_rgba(0,0,0,0.06)]">
      <span className="text-body-lg font-medium leading-[1.5] text-[#000000]">Quick Insight</span>
      <span className="text-[14px] font-medium leading-[1.429] text-[#575858]">
        12 hires completed this month
      </span>
    </div>
  )
}
