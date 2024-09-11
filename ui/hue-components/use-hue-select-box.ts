import { useEffect, RefObject } from 'react'

const useSelectBox = (selectBoxRef: RefObject<HTMLSelectElement>, setSelectedStatus: (status: string) => void) => {
  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      setSelectedStatus(event.detail.value)
    }

    const selectBoxElement = selectBoxRef.current
    if (selectBoxElement) {
      selectBoxElement.addEventListener('select-box-change', handleStatusChange as EventListener)
    }

    return () => {
      if (selectBoxElement) {
        selectBoxElement.removeEventListener('select-box-change', handleStatusChange as EventListener)
      }
    }
  }, [selectBoxRef, setSelectedStatus])
}

export default useSelectBox
