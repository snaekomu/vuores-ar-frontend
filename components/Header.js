import PropTypes from 'prop-types'

function Header (props) {
  return (
    <header className='py-4 w-full align-middle'>
      <div className='text-left inline-block w-1/2'>
        <h1 className='text-3xl inline'>{props.header}</h1>
      </div>
      <div className='text-right inline-block w-1/2'>
        <ul className='inline text-right'>
          <li className='inline-block mx-5'>Targets</li>
          <li className='inline-block'>Users</li>
        </ul>
      </div>
    </header>
  )
}

Header.propTypes = {
  header: PropTypes.string
}

export default Header
