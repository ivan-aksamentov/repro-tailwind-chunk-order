import React from 'react'

import { Link } from 'react-router-dom'

export interface NavigationLinkProps<T> {
  active?: boolean
  content: T
  url: string
}

export default function NavigationLink<T>({ active, content, url }: NavigationLinkProps<T>) {
  return (
    <li className="mr-6">
      <Link className={active ? `text-red-600` : 'text-blue-600'} to={url}>
        {content}
      </Link>
    </li>
  )
}
