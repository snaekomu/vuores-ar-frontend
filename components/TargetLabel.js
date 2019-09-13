import { useDrag } from 'react-dnd-cjs'
import PropTypes from 'prop-types'

function TargetLabel (props) {
  const [{ dragging }, drag] = useDrag({
    item: { id: props.id, type: 'target' },
    collect: (monitor) => ({ dragging: monitor.isDragging() })
  })

  return (
    <button
      ref={drag}
      className={`p-1 text-xs text-white bg-blue-500 rounded ${dragging && 'invisible'}`}
    >
      {props.name}
    </button>
  )
}

TargetLabel.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string
}

export default TargetLabel
