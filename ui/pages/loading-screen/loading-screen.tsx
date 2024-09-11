import '@gdk/loader/dist/styles/gdk-loader.min.css'
import { GdkLoader } from '@gdk/loader'
import { useEffect, useRef } from 'react'
import axios from 'axios'

export const LoadingScreen = () => {
  /// FOR REQUESTS...
  axios.interceptors.request.use(
    async req => {
      gdkLoaderRef.current?.show()
      console.log('gdkLoaderRef====', gdkLoaderRef.current?.show())
      console.log('request', req)
      return req
    },
    err => {
      gdkLoaderRef.current?.hide()
      console.log('Error in handling axios request', err)
      return Promise.reject(err)
    }
  )
  /// FOR REQUESTS...
  axios.interceptors.response.use(
    res => {
      gdkLoaderRef.current?.hide()
      return res
    },
    err => {
      gdkLoaderRef.current?.hide()
      console.log('Error in handling axios response:', err)
      return err
    }
  )

  const gdkLoaderRef = useRef<GdkLoader>()
  useEffect(() => {
    if (!gdkLoaderRef.current) {
      console.log('gdkLoaderRef.current====', !gdkLoaderRef.current)
      gdkLoaderRef.current = new GdkLoader({
        content: '#app-loader',
        type: 'gear-section'
      })
    }
  }, [])

  /// return
  return (
    <div id="app-loader" className="loader-container">
      <div className="loader-content">
        <div className="loader loader--animated" aria-label="Saving Experiment">
          <div className="animated-loader-copy">
            Saving Experiment{' '}
            <div className="ellipses">
              <span className="ellipses-1">.</span>
              <span className="ellipses-2">.</span>
              <span className="ellipses-3">.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
