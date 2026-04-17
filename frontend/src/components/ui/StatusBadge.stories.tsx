import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

export const Active: Story = {
  args: { status: 'Active' },
}

export const Pending: Story = {
  args: { status: 'Pending' },
}

export const Draft: Story = {
  args: { status: 'Draft' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3">
      <StatusBadge status="Active" />
      <StatusBadge status="Pending" />
      <StatusBadge status="Draft" />
    </div>
  ),
}
