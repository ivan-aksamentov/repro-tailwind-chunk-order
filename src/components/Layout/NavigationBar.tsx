import React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import NavigationLink from './NavigationLink'

export interface NavLinkMap {
  [s: string]: string
}

export interface NavigationBarProps extends RouteComponentProps<{}> {
  navLinks: NavLinkMap
}

function NavigationBar({ navLinks, location }: NavigationBarProps) {
  return (
    <nav className="" role="navigation">
      <ul className="py-6 flex">
        {Object.entries(navLinks).map(([url, text]) => {
          return <NavigationLink key={url} url={url} content={text} active={location.pathname === url} />
        })}
      </ul>
    </nav>
  )
}

export default withRouter(NavigationBar)
