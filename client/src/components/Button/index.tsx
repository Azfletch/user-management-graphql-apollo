import classNames from 'classnames'

import './index.scss'
import type React from 'react';

const Button = ({children, className, dataTestId = 'button', isSecondary, isDanger, isDisabled, onClick, type}: Props) => {
  const buttonClassNames = classNames({
    'button': true,
    'button-primary': !isSecondary,
    'button-secondary': isSecondary,
    'button-danger': isDanger,
    ...className && {
      [className]: true
    }
  });

  return (
    <button
      className={buttonClassNames}
      data-test-id={dataTestId}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

type Props = {
  children: string | React.ReactElement
  className?: string
  dataTestId?: string
  isDisabled?: boolean
  isSecondary?: boolean
  isDanger?: boolean
  onClick?: (x: unknown) => unknown | Promise<unknown>;
  type?: 'button' | 'submit' | undefined
}

export default Button
