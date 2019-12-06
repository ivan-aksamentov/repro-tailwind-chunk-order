import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'

import App from './components/App'

const Root = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
render(Root, document.getElementById('root'))
