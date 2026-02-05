import React from 'react'
import clsx from 'clsx'

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray' | 'info'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
  info: 'bg-blue-100 text-blue-800',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
}

export function Badge({ variant = 'gray', size = 'sm', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// Status badge helper
export function StatusBadge({ status }: { status: string }) {
  const getVariant = () => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
      case 'COMPLETED':
      case 'APPROVED':
      case 'SENT':
      case 'PAID':
        return 'success'
      case 'PENDING':
      case 'DRAFT':
      case 'SCHEDULED':
        return 'warning'
      case 'CANCELLED':
      case 'REJECTED':
      case 'DROPPED':
      case 'OVERDUE':
        return 'danger'
      case 'IN_PROGRESS':
        return 'info'
      default:
        return 'gray'
    }
  }

  return (
    <Badge variant={getVariant()}>
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}
