import type { Meta, StoryObj } from '@storybook/react'
import { JobListCard } from './JobListCard'

const meta: Meta<typeof JobListCard> = {
  title: 'Components/JobListCard',
  component: JobListCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof JobListCard>

const baseArgs = {
  title: 'Senior Frontend Engineer',
  department: 'Engineering · Full-time',
  level: 'Senior',
  experienceRange: '4–6',
  tags: ['React', 'TypeScript', 'Figma'],
  applicantCount: 24,
}

export const Active: Story = {
  args: { ...baseArgs, status: 'Active' },
}

export const Pending: Story = {
  args: { ...baseArgs, status: 'Pending', title: 'Product Designer', department: 'Design · Contract' },
}

export const Draft: Story = {
  args: { ...baseArgs, status: 'Draft', title: 'Backend Engineer', department: 'Engineering · Full-time', applicantCount: 0 },
}

export const ManyTags: Story = {
  args: { ...baseArgs, tags: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'] },
}

export const NoApplicants: Story = {
  args: { ...baseArgs, status: 'Active', applicantCount: 0, title: 'New Grad Engineer' },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <JobListCard {...baseArgs} status="Active" />
      <JobListCard {...baseArgs} status="Pending" title="Product Designer" department="Design · Contract" />
      <JobListCard {...baseArgs} status="Draft" title="Backend Engineer" applicantCount={0} />
    </div>
  ),
}
