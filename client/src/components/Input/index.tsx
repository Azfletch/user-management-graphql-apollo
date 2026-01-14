import type { Ref } from 'react'

import './index.scss'

const Input = ({ label, ref, type, required = false, placeholder }: Props) => (
  <div className='input' data-test-id='input'>
    {label &&
      <div className='input-label' data-test-id='input-label'>
        {label}
      </div>
    }

    <input
      className='input-field'
      data-test-id='input-field'
      ref={ref}
      type={type}
      required={required}
      placeholder={placeholder}
    />
  </div>
)

type Props = {
  className?: string
  label?: string
  ref: Ref<HTMLInputElement> | undefined
  type?: string
  required?: boolean
  placeholder?: string
}

export default Input
