/* eslint-disable @typescript-eslint/no-namespace */
import * as React from 'react'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gds-data-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'gds-page-header': React.DetailedHTMLProps<GdsPageHeaderAttributes, HTMLElement>
      'gds-section-header': React.DetailedHTMLProps<GdsSectionHeaderAttributes, HTMLElement>
      'gds-chips': React.DetailedHTMLProps<GdsChipsAttributes, HTMLElement>
      'gds-select-box': React.DetailedHTMLProps<GdsSelectBoxAttributes, HTMLElement>
      'gds-textarea': React.DetailedHTMLProps<GdsTextareaAttributes, HTMLElement>
      'gds-input-field': React.DetailedHTMLProps<GdsInputFieldAttributes, HTMLElement>
      'gds-stroke-separator': React.DetailedHTMLProps<GdsStrokeAttributes, HTMLElement>
    }
  }
}
interface GdsPageHeaderAttributes extends React.HTMLAttributes<HTMLElement> {
  iconType?: string
}

interface GdsSectionHeaderAttributes extends React.HTMLAttributes<HTMLElement> {
  iconType?: string
}

interface GdsChipsAttributes extends React.HTMLAttributes<HTMLElement> {
  type?: 'success' | 'generic' | 'warning' | 'alert' | 'neutral'
}

interface GdsSelectBoxAttributes extends React.HTMLAttributes<HTMLElement> {
  id: string
  name?: string
  disabled?: boolean
  errorMessage?: string
}

interface GdsTextareaAttributes extends React.HTMLAttributes<HTMLElement> {
  id: string
  name?: string
  placeholder?: string
  textareaValue?: string
  countdown?: boolean
  countdownLabel?: string
  countdownMax?: number
  disabled?: boolean
  errorMessage?: string
  maxlength?: number
  dataQmAllow?: boolean
}

interface GdsInputFieldAttributes extends React.HTMLAttributes<HTMLElement> {
  id: string
  required?: boolean
  name?: string
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  pattern?: string
  maxlength?: number
  inputSize?: 'small' | 'medium' | 'large' | number
}

interface GdsStrokeAttributes extends React.HTMLAttributes<HTMLElement> {
  variation: 'horizontal' | 'vertical'
}
