import { forwardRef, ReactNode, useId } from 'react'

interface GdrTextareaProps {
  children?: ReactNode
  label: string
  errorMessage?: string
}

export const GdrTextarea = forwardRef<HTMLTextAreaElement, GdrTextareaProps>((props, ref) => {
  const { label, errorMessage, ...otherProps } = props
  const fieldId = useId().replace(/:/g, '-')

  return (
    <div className={'form-field' + (errorMessage ? ' form-field--error' : '')}>
      <label htmlFor={fieldId} className="text">
        {label}
      </label>
      <textarea {...otherProps} ref={ref} id={fieldId}></textarea>
      {errorMessage && <span className="form-message">{errorMessage}</span>}
    </div>
  )
})
