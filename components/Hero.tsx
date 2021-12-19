import Link from "next/link"
import Script from "next/script"

export default function Hero() {
  return (
    <div className="hero" data-theme="dark">
      <Script type="text/javascript" src="/js/themeSwitcher.js" />
      <nav className="container-fluid">
        <ul>
          <li>
            <Link href="/">
              <a className="contrast">
                <strong>Aide Urgence Bénin</strong>
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" className="contrast" data-theme-switcher="auto">
              Auto
            </a>
          </li>
          <li>
            <a href="#" className="contrast" data-theme-switcher="light">
              Light
            </a>
          </li>
          <li>
            <a href="#" className="contrast" data-theme-switcher="dark">
              Dark
            </a>
          </li>
        </ul>
      </nav>
      <header className="container">
        <hgroup>
          <h1>Aide Urgence Bénin</h1>
          <h2>Non-Governmental Organization (NGO)</h2>
        </hgroup>
        <p>
          <Link href="#">
            <a
              role="button"
              onClick={/* TODO: */ () => alert("TODO: Kommt noch")}
            >
              Jetzt spenden!
            </a>
          </Link>
        </p>
      </header>
    </div>
  )
}
