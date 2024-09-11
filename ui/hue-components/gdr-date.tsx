import { forwardRef, ReactNode, useEffect, useId, useRef } from 'react'
import { GdkDatePicker } from '@gdk/datepicker'
import { useFormContext } from 'react-hook-form'

interface GdrDateProps {
  children?: ReactNode
  label: string
  errorMessage?: string
  name: string
  disabled?: boolean
}

export const GdrDate = forwardRef<HTMLInputElement, GdrDateProps>((props, ref) => {
  const { label, errorMessage, disabled, ...otherProps } = props
  const { setValue } = useFormContext()
  const fieldId = useId().replace(/:/g, '-')
  const gdkDatePicker = useRef<GdkDatePicker>()
  useEffect(() => {
    if (!gdkDatePicker.current) {
      setTimeout(() => {
        gdkDatePicker.current = new GdkDatePicker({
          content: `#${fieldId}`,
          monthYearDropdowns: true,
          dateFormatShort: false,
          minDate: new Date(),
          dateSelected: function (date) {
            setValue(props.name, date)
          },
          disabled: disabled
        })
      }, 100)
    }
  }, [fieldId])

  return (
    <div className={'form-field' + (errorMessage ? ' form-field--error' : '')}>
      <label htmlFor={fieldId} className="text">
        {label}
      </label>
      <input
        width={100}
        id={fieldId}
        className="date date-datepicker"
        type="tel"
        placeholder="MM/DD/YYYY"
        autoComplete="off"
        spellCheck="false"
        ref={ref}
        disabled={disabled}
        {...otherProps}
      />
      {errorMessage && <span className="form-message">{errorMessage}</span>}
    </div>
  )
})
