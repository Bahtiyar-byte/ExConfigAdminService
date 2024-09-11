import { forwardRef, ReactNode, useId } from 'react'

interface GdrFieldInputProps {
  children?: ReactNode
  label: string
  type?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  errorMessage?: string
}
export const GdrFieldInput = forwardRef<HTMLInputElement, GdrFieldInputProps>((props, ref) => {
  const { label, errorMessage, description, type, placeholder, disabled, ...otherProps } = props
  const fieldId = useId().replace(/:/g, '-')

  return (
    <div className={'form-field' + (errorMessage ? ' form-field--error' : '')}>
      <label htmlFor={fieldId}>{label}</label>
      <div className="description"> {description ? description : ''}</div>
      <input
        disabled={disabled}
        {...otherProps}
        type={type ? type : 'text'}
        placeholder={placeholder ? placeholder : 'Input Field'}
        ref={ref}
        id={fieldId}
        style={{ width: '100%' }}
      />
      {errorMessage && <span className="form-message">{errorMessage}</span>}
    </div>
  )
})
