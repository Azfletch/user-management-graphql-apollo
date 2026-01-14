import './index.scss';

const Loading = () => (
  <svg
    className='loading-icon'
    data-test-id='loading-icon'
  >
    <circle
      className='loading-icon-circle'
      cx='50%'
      cy='50%'
      r='45%'
    />

    <circle
      className='loading-icon-indicator'
      cx='50%'
      cy='50%'
      r='45%'
    />
  </svg>
)

export default Loading
