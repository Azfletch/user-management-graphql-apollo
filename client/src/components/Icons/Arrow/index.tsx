import './index.scss'

const Arrow = ({ direction }: Props) => (
  <svg
    className={`arrow-icon-${direction}`}
    data-test-id={`arrow-icon-${direction}`}
    xmlns='http://www.w3.org/2000/svg'
    width='18px'
    height='18px'
    viewBox='0 0 24 24'
    fill='none'
  >
    <path
      d='M12 5V19M12 5L6 11M12 5L18 11'
      stroke='#2a5fc9'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)

type Props = {
  direction: 'up' | 'down'
}

export default Arrow
