import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoSrc from '../assets/logo-new.png'
import sentSuccessSrc from '../assets/sent-success.png'

export function RequestAccessSuccessPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white">

      {/* Logo — absolute top-left  x:80 y:32 */}
      <img
        src={logoSrc}
        alt="BS Realty"
        className="absolute left-20 top-8 w-44 h-auto"
      />

      {/* Decorative indigo blur — same as RequestAccess page */}
      <div className="pointer-events-none absolute -left-23 -bottom-103.25 h-113.25 w-502.5 bg-[rgba(79,70,229,0.48)] opacity-20 blur-[200px]" />

      {/* Content — Frame 15: col, alignItems center, gap 16px, centred on page */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-5">

          {/* sent 1 — 128×128 illustration */}
          <img
            src={sentSuccessSrc}
            alt="Request sent"
            width={128}
            height={128}
          />

          {/* Body/XL-emphasized — 18px 500, centered, #2D343F */}
          <p className="text-center text-body-xl font-medium text-gray-900">
            Your access request has been sent to the HR administrator.
            <br />
            You will receive an email once your access is approved.
          </p>

        </div>
      </div>

    </div>
  )
}
