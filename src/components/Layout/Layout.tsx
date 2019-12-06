import React from 'react'

import Loading from '../../pages/Loading'
import PageSwitcher from '../PageSwitcher/PageSwitcher'
import NavigationBar from './NavigationBar'

import links from '../../links'
import routes from '../../routes'

const Layout: React.FC = () => {
  return (
    <>
      <div className="p-4">
        <NavigationBar navLinks={links} />

        <main role="main">
          <PageSwitcher routes={routes} loadingComponent={<Loading />} />
        </main>
      </div>
    </>
  )
}

export default Layout
