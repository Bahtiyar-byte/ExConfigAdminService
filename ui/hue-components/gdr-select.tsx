import { forwardRef, ReactNode, useId } from 'react'

interface GdrSelectProps {
  children?: ReactNode
  label: string
  description?: string
  disabled?: boolean
  errorMessage?: string
  options: { value: string; label: string }[]
}

export const GdrSelect = forwardRef<HTMLSelectElement, GdrSelectProps>((props, ref) => {
  const { label, errorMessage, description, disabled, ...otherProps } = props
  const fieldId = useId().replace(/:/g, '-')

  return (
    <div className={'form-field' + (errorMessage ? ' form-field--error' : '')}>
      <label htmlFor={fieldId}>{label}</label>
      <div className="description">{description ? description : ''}</div>

      <div className="select-box" style={{ width: '100%' }}>
        <select disabled={disabled} {...otherProps} ref={ref} defaultValue="" id={fieldId}>
          <option disabled value="">
            {' '}
            Please Select{' '}
          </option>
          {props.options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {errorMessage && <span className="form-message">{errorMessage}</span>}
    </div>
  )
})
