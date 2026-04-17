import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import illustrationSrc from '../assets/illustration-welcome.svg'
import logoSrc from '../assets/logo-new.png'

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* ── LEFT PANEL — white, 821px ─────────────────────────────── */}
      <div className="relative flex w-[821px] shrink-0 items-center justify-center bg-white">

        {/* Logo — absolutely pinned top-left */}
        <img
          src={logoSrc}
          alt="BS Realty"
          className="absolute top-0 left-0 w-[168px] h-auto"
        />

        {/* Content column — 521px wide, centred in panel */}
        <div className="flex w-[521px] flex-col items-center gap-[36px]">

          {/* Logo — centred above card */}
          <img src={logoSrc} alt="BS Realty" className="w-[168px] h-auto" />

          {/* Card */}
          <div className="flex w-full flex-col items-center gap-6 rounded-xl bg-white px-6 py-[28px]">

            {/* Heading */}
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-headline-sm font-medium text-secondary text-center">
                Welcome
              </h1>
              <p className="w-[473px] text-center text-body-lg font-normal text-gray-900">
                This portal is for authorized GITGI hiring team members only.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex w-[302px] flex-col gap-4">
                <Button variant="primary" size="xl" className="w-full" onClick={() => navigate('/sign-in')}>
                  Sign In
                </Button>
                <Button variant="outline" size="md" className="w-full" onClick={() => navigate('/request-access')}>
                  Request Access
                </Button>
              </div>
              <p className="text-center text-body-lg font-medium text-gray-900">
                Don't have access ? Contact your HR administrator.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — indigo, flex-1, illustration centred ───── */}
      <div className="flex flex-1 items-center justify-center bg-primary">
        <img
          src={illustrationSrc}
          alt=""
          aria-hidden="true"
          width={486}
          height={511}
        />
      </div>

    </div>
  )
}
