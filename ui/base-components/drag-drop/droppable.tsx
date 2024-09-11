import { useEffect, useRef } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

export function DropTarget({
  targetId,
  children,
  onRuleAttributeDrop
}: {
  targetId: string
  children?: React.ReactNode
  onRuleAttributeDrop: (targetId: string) => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      return dropTargetForElements({
        element,
        getIsSticky: () => false,
        canDrop: () => true,
        onDragEnter: () => {
          console.log('is-over:', targetId)
        },
        onDragLeave: () => {
          console.log('is leaving', targetId)
        },
        onDrop: args => {
          onRuleAttributeDrop(args.source.element.getAttribute('id')!)
        }
      })
    }
  }, [onRuleAttributeDrop, targetId])

  return <div ref={ref}>{children ? children : null}</div>
}
