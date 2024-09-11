import { forwardRef, ReactNode, useId, useImperativeHandle, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

interface GdrTimeProps {
  children?: ReactNode
  label: string
  type: string
  hour: string
  minute: string
  period: string
  disabled?: boolean
}

type timInput = {
  focus: () => void
  hour: HTMLSelectElement
  minutes: HTMLSelectElement
  amPm: HTMLSelectElement
}

// TODO Fix this composite component, make otherProps work and model value to be passed to parent
export const GdrTime = forwardRef<timInput, GdrTimeProps>((props, ref) => {
  const { label, type, hour, minute, period, disabled } = props
  const { register } = useFormContext()
  const fieldId = useId().replace(/:/g, '-')
  const hourSelectRef = useRef<HTMLSelectElement | null>(null)
  const minSelectRef = useRef<HTMLSelectElement | null>(null)
  const amPmSelectRef = useRef<HTMLSelectElement | null>(null)
  const { formState } = useFormContext()

  useImperativeHandle(ref, () => ({
    focus: () => {
      hourSelectRef.current?.focus()
    },
    get hour() {
      return hourSelectRef.current!
    },
    get minutes() {
      return minSelectRef.current!
    },
    get amPm() {
      return amPmSelectRef.current!
    }
  }))

  const hourError = formState.errors[type + 'Hour']

  const minuteError = formState.errors[type + 'Minute']

  const periodError = formState.errors[type + 'Period']
  return (
    <div className="time-select-box">
      <label htmlFor={fieldId} className="text">
        {label}
      </label>
      <div className={'form-field select-box' + (hourError ? ' form-field--error' : '')}>
        <select
          disabled={disabled}
          id={fieldId}
          defaultValue=""
          {...register(`${type}Hour`, {
            required: true,
            value: hour
          })}
        >
          <option value="" disabled>
            Hour
          </option>
          <option value="1">01</option>
          <option value="2">02</option>
          <option value="3">03</option>
          <option value="4">04</option>
          <option value="5">05</option>
          <option value="6">06</option>
          <option value="7">07</option>
          <option value="8">08</option>
          <option value="9">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>
      <span>:</span>
      <div className={'form-field select-box' + (minuteError ? ' form-field--error' : '')}>
        <select
          disabled={disabled}
          id={fieldId + 'minutes'}
          {...register(`${type}Minute`, {
            required: true,
            value: minute
          })}
        >
          <option value="" disabled>
            Minute
          </option>
          <option value="0">00</option>
          <option value="1">01</option>
          <option value="2">02</option>
          <option value="3">03</option>
          <option value="4">04</option>
          <option value="5">05</option>
          <option value="6">06</option>
          <option value="7">07</option>
          <option value="8">08</option>
          <option value="9">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
          <option value="47">47</option>
          <option value="48">48</option>
          <option value="49">49</option>
          <option value="50">50</option>
          <option value="51">51</option>
          <option value="52">52</option>
          <option value="53">53</option>
          <option value="54">54</option>
          <option value="55">55</option>
          <option value="56">56</option>
          <option value="57">57</option>
          <option value="58">58</option>
          <option value="59">59</option>
        </select>
      </div>
      <div className={'form-field select-box' + (periodError ? ' form-field--error' : '')}>
        <select
          disabled={disabled}
          id={fieldId + 'am-pm'}
          {...register(`${type}Period`, {
            required: true,
            value: period
          })}
        >
          <option value="" disabled>
            AM/PM
          </option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  )
})
