import type { Ref } from "react"

import './index.scss'

const Input = ({ label, ref, type }: Props) => {
  return (
    <div className='input'>
      {label && <div className="input-label">{label}</div>}

      <input
        className='input-field'
        ref={ref}
        type={type}
      />
    </div>
  )
}

type Props = {
  className?: string
  label?: string
  ref: Ref<HTMLInputElement> | undefined
  type?: string
}

export default Input
