import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  href?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'green' | 'yellow' | 'red' | 'blue' | 'purple'
}

const colorStyles = {
  primary: {
    icon: 'bg-primary-100 text-primary-600',
    value: 'text-primary-600',
  },
  green: {
    icon: 'bg-green-100 text-green-600',
    value: 'text-green-600',
  },
  yellow: {
    icon: 'bg-yellow-100 text-yellow-600',
    value: 'text-yellow-600',
  },
  red: {
    icon: 'bg-red-100 text-red-600',
    value: 'text-red-600',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-600',
    value: 'text-blue-600',
  },
  purple: {
    icon: 'bg-purple-100 text-purple-600',
    value: 'text-purple-600',
  },
}

export function StatCard({
  title,
  value,
  icon: Icon,
  href,
  trend,
  color = 'primary',
}: StatCardProps) {
  const styles = colorStyles[color]

  const content = (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className={clsx('p-3 rounded-lg', styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div
            className={clsx(
              'flex items-center text-sm',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className={clsx('text-3xl font-bold mt-1', styles.value)}>{value}</p>
      </div>
      {href && (
        <div className="mt-4 flex items-center text-sm text-primary-600 font-medium">
          View details
          <ArrowRight className="h-4 w-4 ml-1" />
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link to={href}>{content}</Link>
  }

  return content
}
