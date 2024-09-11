import { forwardRef, ReactNode, useId } from 'react'

interface GdrSelectProps {
  children?: ReactNode
  label: string
  errorMessage?: string
  options: { value: string; label: string }[]
}

export const GdrRadio = forwardRef<HTMLInputElement, GdrSelectProps>((props, ref) => {
  const { label, errorMessage, ...otherProps } = props
  const fieldId = useId().replace(/:/g, '-')

  return (
    <fieldset
      role="radiogroup"
      className={'form-field radio-button-group margin-top' + (errorMessage ? ' form-field--error' : '')}
    >
      <legend>{label}</legend>
      <div className="radio-button-wrapper  col-2">
        {props.options.map(({ value, label }, i) => (
          <div key={i}>
            <input id={fieldId + i} type="radio" name={fieldId} value={value} ref={ref} {...otherProps} />
            <label className="radio " htmlFor={fieldId + i}>
              <span>
                <strong>{label}</strong>
              </span>
            </label>
          </div>
        ))}
      </div>
      {errorMessage && <span className="form-message">{errorMessage}</span>}
    </fieldset>
  )
})
