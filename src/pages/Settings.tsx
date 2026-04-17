import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { Toggle } from '../components/ui/Toggle'
import {
  PencilIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'

type Tab = 'Account Settings' | 'Organization' | 'Notifications' | 'Security'

const TABS: Tab[] = ['Account Settings', 'Organization', 'Notifications', 'Security']

/* ── small helpers ───────────────────────────────────────────── */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col" style={{ width: 364 }}>
      <p className="text-body-lg font-medium text-slateblue-darker">{title}</p>
      <p className="text-body-md font-normal text-lightgray-dark-hover">{subtitle}</p>
    </div>
  )
}

function EditButton() {
  return (
    <button
      type="button"
      className="flex h-8 w-[72px] items-center justify-center gap-3 rounded-[12px] bg-accent-darker px-5 text-body-lg font-medium text-accent-light"
    >
      Edit
    </button>
  )
}

function FilledInput({ value }: { value: string }) {
  return (
    <input
      type="text"
      defaultValue={value}
      className="w-[532px] rounded-[4px] border border-lightgray-active bg-white px-5 py-4 text-body-lg font-normal text-slateblue-dark-active outline-none focus:border-primary"
    />
  )
}

function EmptyInput({ placeholder, type = 'text' }: { placeholder: string; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-[532px] rounded-[4px] border border-lightgray-active bg-white px-5 py-4 text-body-lg font-normal text-lightgray-darker placeholder:text-lightgray-darker outline-none focus:border-primary"
    />
  )
}

function DropdownInput({ value, options }: { value: string; options?: string[] }) {
  return (
    <select
      defaultValue={value}
      className="w-[532px] appearance-none rounded-[4px] border border-lightgray-active bg-white px-5 py-4 text-body-lg font-normal text-slateblue-dark-active outline-none focus:border-primary"
    >
      {(options ?? [value]).map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

function Divider() {
  return <hr className="border-t border-lightgray self-stretch" />
}

function ToggleRow({ label }: { label: string }) {
  const [on, setOn] = useState(true)
  return (
    <div className="flex items-center justify-between self-stretch py-1">
      <p className="text-body-md font-medium text-slateblue-darker">{label}</p>
      <Toggle checked={on} onChange={setOn} label={label} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   TABS
   ══════════════════════════════════════════════════════════════ */

function AccountSettingsTab() {
  return (
    <div className="flex flex-col gap-[44px]">
      {/* ── Profile Information ─────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="Profile Information"
          subtitle="Manage your personal details and account information."
        />

        <div className="flex flex-col gap-5">
          {/* Avatar row — Figma 394:3335: w-495, row, justify-between, items-center */}
          <div className="flex w-[495px] items-center justify-between">
            <p className="w-[102px] text-body-md font-medium text-slateblue-darker">Profile Picture</p>
            {/* Avatar + buttons — items-end, gap-24px (layout_WGSDB9) */}
            <div className="flex items-end gap-6">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-[#D9D9D9]">
                {/* placeholder avatar */}
              </div>
              {/* Text/Active ghost buttons — rounded-[8px], p-3, h-[36px] */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-[36px] items-center justify-center p-3 rounded-[8px] text-body-md font-medium text-primary"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="flex h-[36px] items-center justify-center p-3 rounded-[8px] text-body-md font-medium text-bg-gray-darker"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Per-row layout — each label items-center with its own input+button */}
          <div className="flex flex-col gap-5 self-stretch">
            <div className="flex items-center gap-[179px] self-stretch">
              <p className="w-[102px] shrink-0 text-body-md font-medium text-slateblue-darker">Full Name</p>
              <div className="flex items-center gap-6">
                <FilledInput value="Rijan Jones" />
                <EditButton />
              </div>
            </div>
            <div className="flex items-center gap-[179px] self-stretch">
              <p className="w-[102px] shrink-0 text-body-md font-medium text-slateblue-darker">Email Address</p>
              <div className="flex items-center gap-6">
                <EmptyInput placeholder="Email" />
                <EditButton />
              </div>
            </div>
            <div className="flex items-center gap-[179px] self-stretch">
              <p className="w-[102px] shrink-0 text-body-md font-medium text-slateblue-darker">Phone Number</p>
              <div className="flex items-center gap-6">
                <EmptyInput placeholder="Phone" />
                <EditButton />
              </div>
            </div>
            <div className="flex items-center gap-[179px] self-stretch">
              <p className="w-[102px] shrink-0 text-body-md font-medium text-slateblue-darker">Role</p>
              <div className="flex items-center gap-6">
                <DropdownInput value="Employer Admin(HR)" />
                <EditButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Login & Access ───────────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="Login & Access"
          subtitle="Manage your account access and login preferences."
        />

        {/* Group: w-812, h-160 — labels at x:0,y:14 / inputs+btn at x:280,y:0 */}
        <div className="flex w-[812px] gap-[180px]">
          {/* Labels column: w-100, h-80, justify-between, pt-14 (y:14 offset) */}
          <div className="flex w-[100px] shrink-0 flex-col justify-between pt-[14px]" style={{ height: 80 }}>
            <p className="text-body-md font-medium text-slateblue-darker">Old Password</p>
            <p className="text-body-md font-medium text-slateblue-darker">New Password</p>
          </div>

          {/* Right column: w-532, gap-12 — inputs then button */}
          <div className="flex w-[532px] flex-col gap-4">
            {/* Two inputs stacked, gap-5, NO Edit buttons */}
            <div className="flex flex-col gap-5">
              <EmptyInput placeholder="Old Password" type="password" />
              <EmptyInput placeholder="New Password" type="password" />
            </div>
            {/* Create Job button — left-aligned under inputs */}
            <button
              type="button"
              className="flex h-8 w-fit items-center justify-center gap-2 rounded-[12px] bg-primary px-4 text-body-md font-medium text-primary-light"
            >
              <PlusIcon className="h-5 w-5" />
              Create Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrganizationTab() {
  return (
    <div className="flex flex-col gap-[44px]">
      {/* ── Company Information ──────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="Company Information"
          subtitle="Manage your company details and hiring identity."
        />

        {/* Per-row layout: label items-center with its own input+button */}
        <div className="flex flex-col gap-5 self-stretch">
          <div className="flex items-center gap-[179px] self-stretch">
            <p className="w-[116px] shrink-0 text-body-md font-medium text-slateblue-darker">Company Name</p>
            <div className="flex items-center gap-6">
              <FilledInput value="Rijan Jones" />
              <EditButton />
            </div>
          </div>
          <div className="flex items-center gap-[179px] self-stretch">
            <p className="w-[116px] shrink-0 text-body-md font-medium text-slateblue-darker">Company Email</p>
            <div className="flex items-center gap-6">
              <EmptyInput placeholder="Email" />
              <EditButton />
            </div>
          </div>
          <div className="flex items-center gap-[179px] self-stretch">
            <p className="w-[116px] shrink-0 text-body-md font-medium text-slateblue-darker">Company Website</p>
            <div className="flex items-center gap-6">
              <EmptyInput placeholder="Phone" />
              <EditButton />
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Members ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between self-stretch">
          <div className="flex flex-col gap-2">
            <p className="text-body-md font-semibold text-slateblue-dark-active">Members - 2</p>
          </div>
        </div>

        {/* Member rows */}
        {[
          { name: 'Alex Johnson', email: 'alex.12@gmail.com', role: 'Software Developer', date: 'April 08,2026' },
          { name: 'Alex Johnson', email: 'alex.12@gmail.com', role: 'Software Developer', date: 'April 08,2026' },
        ].map((m, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-lightgray py-4"
          >
            <div className="flex items-center gap-4">
              {/* unchecked checkbox */}
              <div className="h-5 w-5 rounded-[4px] border border-lightgray-active bg-white" />
              <div className="flex flex-col">
                <p className="text-body-lg font-medium text-secondary">{m.name}</p>
                <p className="text-body-md font-normal text-gray-700">{m.email}</p>
              </div>
            </div>
            <p className="text-body-md font-medium text-secondary">{m.role}</p>
            <p className="text-body-md font-medium text-secondary">{m.date}</p>
            <EllipsisVerticalIcon className="h-[20px] w-[20px] text-gray-700" />
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Team Access ─────────────────────────────────── */}
      <div className="flex items-center justify-between self-stretch">
        <div className="flex flex-col gap-2">
          <p className="text-body-lg font-medium text-slateblue-darker">Team Access</p>
          <p className="text-body-md font-normal text-lightgray-dark-hover">
            Control who can access the hiring platform.
          </p>
        </div>
        <button
          type="button"
          className="flex h-8 items-center justify-center gap-2 rounded-[12px] bg-primary px-4 text-body-md font-medium text-primary-light"
        >
          <PlusIcon className="h-5 w-5" />
          Add members
        </button>
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="flex flex-col gap-[44px]">
      {/* ── Email Notifications ──────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="Email Notification"
          subtitle="Manage when you receive updates via email."
        />
        <div className="flex flex-col gap-5 self-stretch">
          <ToggleRow label="New Application Received" />
          <ToggleRow label="Interview Schedule" />
          <ToggleRow label="Candidate Status Updated" />
          <ToggleRow label="Job Posted" />
        </div>
      </div>

      <Divider />

      {/* ── System Notifications ─────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="System Notifications"
          subtitle="Control in-app notifications."
        />
        <div className="flex flex-col gap-5 self-stretch">
          <ToggleRow label="Enable Notifications" />
          <ToggleRow label="Sound Alerts" />
        </div>
      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="flex flex-col gap-[44px]">
      {/* ── Security ─────────────────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="Security"
          subtitle="Ensure your account and data are secure."
        />
        <div className="flex flex-col gap-5 self-stretch">
          <ToggleRow label="Two-Factor Authentication" />
          <ToggleRow label="Login History" />
          <ToggleRow label="Active Sessions" />
        </div>
      </div>

      <Divider />

      {/* ── Data & Privacy ───────────────────────────────── */}
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          title="Data & Privacy"
          subtitle="Manage your data and privacy preferences."
        />
        <div className="flex flex-col gap-5 self-stretch">
          <ToggleRow label="Download Data" />
          <ToggleRow label="Delete Account" />
          <ToggleRow label="Data Retention Policy" />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Account Settings')

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-gray">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">

          {/* ── Tab bar + Save Changes (Figma: 9BA93G) ──────── */}
          <div className="flex items-center justify-between py-6">
            {/* Pills */}
            <div className="flex items-center gap-4">
              {TABS.map((tab) => {
                const isActive = activeTab === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-[20px] px-4 py-3 text-body-md font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-light'
                        : 'bg-slateblue-light text-secondary'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>

            {/* Save Changes */}
            <button
              type="button"
              className="flex h-8 items-center justify-center gap-2 rounded-[12px] bg-primary px-4 text-body-md font-medium text-primary-light"
            >
              Save Changes
            </button>
          </div>

          {/* ── Content ─────────────────────────────────────── */}
          <div className="mt-2">
            {activeTab === 'Account Settings' && <AccountSettingsTab />}
            {activeTab === 'Organization' && <OrganizationTab />}
            {activeTab === 'Notifications' && <NotificationsTab />}
            {activeTab === 'Security' && <SecurityTab />}
          </div>

        </main>
      </div>
    </div>
  )
}
