import { useEffect, useRef } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

interface DraggableProps {
  segmentAttributeName: string
  segmentAttributeId: string
}

export function Draggable(props: DraggableProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      return draggable({
        element
      })
    }
  }, [])

  return (
    <div ref={ref} id={props.segmentAttributeId}>
      <strong>{props.segmentAttributeName}</strong>
    </div>
  )
}
