import React, { useState } from 'react'

export interface Tab {
  id: string
  label: string
}

export interface Props {
  tabs: Tab[]
  onTabClick: (tabId: string) => void
  tabId?: string
}

export const HueTabs: React.FC<Props> = ({ tabs, onTabClick, tabId }) => {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0]?.id)
  return (
    <div id={tabId} className="tabs">
      <div className="tabs-container">
        {tabs.map(tab => (
          <a
            key={tab.id}
            id={tab.id}
            className={`tab ${selectedTabId === tab.id ? 'active' : ''}`}
            href="#"
            role="tab"
            aria-controls={`panel-${tab.id}`}
            onClick={e => {
              e.preventDefault()
              setSelectedTabId(tab.id)
              onTabClick(tab.id)
            }}
          >
            <span>{tab.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
