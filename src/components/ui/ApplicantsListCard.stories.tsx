import type { Meta, StoryObj } from '@storybook/react'
import { ApplicantsListCard } from './ApplicantsListCard'

const meta: Meta<typeof ApplicantsListCard> = {
  title: 'Components/ApplicantsListCard',
  component: ApplicantsListCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof ApplicantsListCard>

export const Default: Story = {}

export const AllStatuses: Story = {
  args: {
    total: 4,
    applicants: [
      { name: 'Alex Johnson',  email: 'alex@gmail.com',   role: 'Software Developer', date: 'Apr 08, 2026', status: 'Hired' },
      { name: 'Sara Williams', email: 'sara@gmail.com',   role: 'UI/UX Designer',     date: 'Apr 10, 2026', status: 'Screening' },
      { name: 'Chris Lee',     email: 'chris@gmail.com',  role: 'Product Manager',    date: 'Apr 12, 2026', status: 'Job Offer' },
      { name: 'Jonah Neuman',  email: 'jonah@gmail.com',  role: 'Marketing',          date: 'Apr 14, 2026', status: 'Rejected' },
    ],
  },
}

export const SingleApplicant: Story = {
  args: {
    total: 1,
    applicants: [
      { name: 'Alex Johnson', email: 'alex@gmail.com', role: 'Software Developer', date: 'Apr 08, 2026', status: 'Hired' },
    ],
  },
}

export const AllHired: Story = {
  args: {
    total: 3,
    applicants: [
      { name: 'Alice Brown',  email: 'alice@gmail.com', role: 'Frontend Engineer', date: 'Apr 01, 2026', status: 'Hired' },
      { name: 'Bob Smith',    email: 'bob@gmail.com',   role: 'Backend Engineer',  date: 'Apr 03, 2026', status: 'Hired' },
      { name: 'Carol White',  email: 'carol@gmail.com', role: 'DevOps Engineer',   date: 'Apr 05, 2026', status: 'Hired' },
    ],
  },
}

export const AllRejected: Story = {
  args: {
    total: 3,
    applicants: [
      { name: 'Dave Green',  email: 'dave@gmail.com',  role: 'Designer',        date: 'Apr 01, 2026', status: 'Rejected' },
      { name: 'Eve Black',   email: 'eve@gmail.com',   role: 'Product Manager', date: 'Apr 03, 2026', status: 'Rejected' },
      { name: 'Frank Gray',  email: 'frank@gmail.com', role: 'Marketing Lead',  date: 'Apr 05, 2026', status: 'Rejected' },
    ],
  },
}
