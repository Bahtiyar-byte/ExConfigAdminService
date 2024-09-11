import { useState } from 'react'

type AccordionItemProps = {
  children: React.ReactNode
  header: string
}

export const AccordionItem = (props: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false)

  const clickHandler = () => setExpanded(!expanded)

  return (
    <li onClick={clickHandler} aria-expanded={expanded}>
      <div tabIndex={0} className="accordion-headline">
        <div className="accordion-headline-content-wrapper">
          <div className="accordion-left-content-wrapper">
            <div className="heading h4">{props.header}</div>
          </div>
        </div>
      </div>
      <div className="accordion-content-container" style={{ display: expanded ? 'block' : 'none' }}>
        <div className="accordion-content">{props.children}</div>
      </div>
    </li>
  )
}
