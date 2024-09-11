import { GdkFooter } from '@gdk/footer'
import { useEffect, useRef } from 'react'

export const HueFooter = () => {
  const gdkFooter = useRef<GdkFooter>()

  useEffect(() => {
    setTimeout(() => {
      gdkFooter.current = new GdkFooter({
        content: '#primary-footer'
      })
    }, 1000)
  }, [])

  return (
    <>
      <footer id="primary-footer">
        <div className="footer-logo icon-geico"></div>
        <div id="footer-copyright">
          © <span id="footerDate"></span>
        </div>
      </footer>
    </>
  )
}
