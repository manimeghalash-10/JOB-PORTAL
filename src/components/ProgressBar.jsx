function ProgressBar({ completed }) {
  return (
    <div>
      <h3>Profile Completion</h3>

      <div className='progress-container'>
        <div
          className='progress-fill'
          style={{ width: `${completed}%` }}
        >
          {completed}%
        </div>
      </div>
    </div>
  )
}

export default ProgressBar