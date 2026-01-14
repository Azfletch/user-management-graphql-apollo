import './index.scss'

const Arrow = ({ direction }: Props) => (
  <svg
    className={`arrow-icon-${direction}`}
    data-test-id={`arrow-icon-${direction}`}
    fill='none'
    height='18px'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    width='18px'
  >
    <path
      d='M12 5V19M12 5L6 11M12 5L18 11'
      stroke='#2a5fc9'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
    />
  </svg>
)

type Props = {
  direction: 'up' | 'down'
}

export default Arrow
