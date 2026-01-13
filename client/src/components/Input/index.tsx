import type { Ref } from 'react'

import './index.scss'

const Input = ({ label, ref, type }: Props) => (
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
    />
  </div>
)

type Props = {
  className?: string
  label?: string
  ref: Ref<HTMLInputElement> | undefined
  type?: string
}

export default Input
