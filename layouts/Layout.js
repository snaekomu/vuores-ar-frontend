import PropTypes from 'prop-types'

import Header from '../components/Header'
import Menu from '../components/Menu'

function Layout (props) {
  return (
    <div className='container p-8 m-auto text-gray-700'>
      <Header header={props.header} />
      <Menu />
      {props.children}
    </div>
  )
}

Layout.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element
}

export default Layout
