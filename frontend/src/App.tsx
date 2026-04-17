import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RequireAuth } from './components/RequireAuth'
import { WelcomePage } from './pages/Welcome'
import { SignInPage } from './pages/SignIn'
import { RequestAccessPage } from './pages/RequestAccess'
import { RequestAccessSuccessPage } from './pages/RequestAccessSuccess'
import { DashboardPage } from './pages/Dashboard'
import { CandidatesPage } from './pages/Candidates'
import { JobsPage } from './pages/Jobs'
import { SettingsPage } from './pages/Settings'
import { CalendarPage } from './pages/Calendar'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/request-access" element={<RequestAccessPage />} />
          <Route path="/request-access/success" element={<RequestAccessSuccessPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/candidates" element={<RequireAuth><CandidatesPage /></RequireAuth>} />
          <Route path="/jobs" element={<RequireAuth><JobsPage /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
          <Route path="/calendar" element={<RequireAuth><CalendarPage /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
