import classNames from 'classnames'

import './index.scss'

const Arrow = ({ className, dataTestId, direction }: Props) => {
  const classes = classNames({
    [`arrow-icon-${direction}`]: true,
    ...className && {
      [className]: true
    }
  })

  return (
    <svg
      className={classes}
      data-test-id={dataTestId}
      xmlns='http://www.w3.org/2000/svg'
      width='14px'
      height='14px'
      viewBox='0 0 24 24'
      fill='none'
    >
        <path
          d='M12 5V19M12 5L6 11M12 5L18 11'
          stroke='#000000'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
    </svg>
  )
}

type Props = {
  className?: string
  dataTestId?: string
  direction: 'up' | 'down'
}

export default Arrow
