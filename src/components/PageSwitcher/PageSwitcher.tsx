import React from 'react'

import { Route, Switch } from 'react-router'

import NotFound from '../../pages/NotFound'
import pageRender from './PageRender'

export interface PageRouteDesc {
  path: string
  page: string
}

export interface PageSwitcherProps {
  routes: PageRouteDesc[]
  loadingComponent: JSX.Element
  forceLoadingMs?: number
  timeoutMs?: number
}

// Switches between routes that render dynamically loaded pages from the list.
const PageSwitcher: React.FC<PageSwitcherProps> = ({
  routes,
  loadingComponent,
  forceLoadingMs = 100,
  timeoutMs = 20000,
}) => (
  <Switch>
    {[
      ...routes.map(({ path, page }: PageRouteDesc) => (
        <Route
          exact={!path.includes(':')}
          path={path}
          key={path}
          render={pageRender({
            page,
            timeoutMs,
            loadingComponent,
            forceLoadingMs,
          })}
        />
      )),

      // The last "catch-all" entry defaults to "NotFound" page
      <Route exact key="notfound" component={NotFound} />,
    ]}
  </Switch>
)

export default PageSwitcher
