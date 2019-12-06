import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { timeout } from 'promise-timeout'

export interface LoadableProps {
  page: string
  pathname: string
  forceLoadingMs: number
  timeoutMs: number
}

const Loadable = loadable((props: LoadableProps) => {
  const { forceLoadingMs, timeoutMs } = props

  let pagePromise = import(
    /* webpackExclude: /(\.(css|scss)|(\/__tests__\/.*|([.\/])(test|spec))\.[jt]sx?)$/ */
    `../../pages/${props.page}`
  )

  // Force "Loading" component to be shown a given amount of time
  // (even if main component loads before the time elapses)
  // Useful for transition animations.
  if (forceLoadingMs > 0) {
    pagePromise = delay(pagePromise, forceLoadingMs)
  }

  // Emit error if page fails to load withing given time interval
  if (timeoutMs > 0) {
    pagePromise = timeout(pagePromise, timeoutMs)
  }

  return pagePromise
})

export default Loadable
