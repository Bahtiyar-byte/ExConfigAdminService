import { useEffect, useRef } from 'react'
import { GdkNavigation } from '@gdk/navigation'
import { Link } from 'react-router-dom'
import logo from '../assets/Geico_logo.png'

export const HuePrimaryNav = () => {
  const gdkNavigation = useRef<GdkNavigation>()

  useEffect(() => {
    gdkNavigation.current = new GdkNavigation({
      content: '#primary-navigation'
    })

    /*new GdkDarkModeSwitch({
          content: "#dark-mode-section"
        })*/
  }, [])

  return (
    <>
      <a className="skip-to-content" href="#wrapper">
        Skip to main content
      </a>
      <header id="primary-header" role="banner">
        <div className="header-logo">
          <a aria-label="GEICO Home" href="/">
            <img src={logo} alt="GEICO Home" style={{ width: '8%', marginLeft: '5rem' }} />
          </a>
        </div>

        <div className="header-links">
          <ul>
            <li>
              <a data-side-panel-trigger="account example" href="/">
                <span aria-label="account menu" className="icon-profile"></span>
                <span className="header-link header-hover-link">Account</span>
              </a>
            </li>

            <li>
              <a data-side-panel-trigger="menu" className="hamburger-menu" href="/">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span className="header-link">Menu</span>
              </a>
            </li>
          </ul>
        </div>
      </header>

      <nav id="primary-navigation" role="navigation">
        <div className="nav-background"></div>

        {/* Account Panel */}
        <div className="panel-wrapper scroll-panel" data-side-panel="account example">
          <div className="nav-panel-content">
            <div className="panel-header">
              <div className="header">My Account</div>
              <button className="btn-close icon-close" type="button" aria-label="Close navigation"></button>
            </div>
          </div>

          <ul className="nav-items border-top" tabIndex={-1}>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <div className="nav-bottom-links">
            <ul className="list" tabIndex={-1}></ul>
          </div>
        </div>

        {/* Menu Panel */}
        <div className="panel-wrapper" data-side-panel="menu">
          <div className="nav-menu">
            <ul className="nav-primary-tier nav-items nav-dark-mode-switch-wrapper">
              <li>
                <Link to="/" className="nav-menu-item">
                  Experiments
                </Link>
              </li>
              <li>
                <Link to="/new-experiment" className="nav-menu-item">
                  Create Experiment
                </Link>
              </li>
              <li className="nav-additional-links">
                <div className="nav-bottom-links">
                  <ul className="list">
                    <li>
                      <Link to="/" className="nav-menu-item">
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Dark mode switch */}
              <li className="nav-dark-mode-switch">
                <div id="dark-mode-section" className="button-switch-container">
                  <div className="button-switch-label-wrapper">
                    <label htmlFor="your-dark-mode-switch-id-button-switch-checkbox" className="text">
                      Dark Mode
                    </label>
                  </div>
                  <input
                    id="your-dark-mode-switch-id-button-switch-checkbox"
                    name="your-dark-mode-switch-id-button-switch-checkbox"
                    type="checkbox"
                  />
                  <div className="button-switch"></div>
                </div>
              </li>
            </ul>

            <div className="nav-secondary-tier">
              <div className="nav-back">
                <a href="/">Back</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
