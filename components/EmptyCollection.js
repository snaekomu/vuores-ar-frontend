import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useDrop } from 'react-dnd-cjs'
import { FiTrash2, FiEdit3 } from 'react-icons/fi'
import PT from 'prop-types'

import TargetLabel from './TargetLabel'

function CollectionsCell (props) {
  const { id, target } = props
  // const { editCollection, swapTargets } = props.func

  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState('')
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(props.name)

  const visibilityStyle = useMemo(() => visible ? 'visible' : 'invisible', [visible])
  const opacityStyle = useMemo(() => opacity === 100 ? '' : 'opacity-' + opacity, [opacity])

  const textInput = React.createRef()

  const [, drop] = useDrop({
    accept: 'target',
    drop: (item, monitor) => {
      props.func.swapTargets(item.id, props.id)
    }
  })

  function handleMouseEnter () {
    setOpacity(50)
    setVisible(true)
  }

  function handleMouseLeave (e) {
    setOpacity('')
    if (!editing) setVisible(false)
  }

  function handleNameUpdate (e) {
    setName(e.target.value)
  }

  function deleteThis () {
    setOpacity(50)
    // axios.delete(`${process.env.API_URI}/gallery/${id}`)
  }

  function saveName () {
    setEditing(false)
  }

  useEffect(() => { if (editing) textInput.current.focus() }, [editing])

  // Render
  // ------

  return (
    <div
      className='w-68 h-56 mx-4 my-4 relative bg-blue-100 rounded-lg'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={drop}
    >
      {/* Name */}
      <div className="px-4 z-10 w-full text-blue-400 text-center mt-28 -translate-y-1/2">
        <>
          {
            !editing
              ? <p className='font-bold text-xl'>{name}</p>
              : (<form onSubmit={saveName}>
                <input
                  type='text'
                  onBlur={saveName}
                  onChange={handleNameUpdate}
                  ref={textInput}
                  className='bg-white overflow-visible text-black px-1 bg-transparent-grey w-full rounded'
                  value={name}
                />
              </form>)
          }
          <p>Empty Collection</p>
        </>
      </div>

      {/* Actions */}
      <div className={`absolute bottom-0 left-0 m-4 z-10 text-blue-400 scale-110 ${visibilityStyle}`}>
        <button
          className=''
          onClick={deleteThis}
        >
          <FiTrash2 className='content-box opacity-75 mr-2 hover:opacity-100' />
        </button>
        <button
          className=''
          onClick={() => setEditing(true)}
        >
          <FiEdit3 className='content-box opacity-75 hover:opacity-100' />
        </button>
      </div>

      {/* Target */}
      <div className={'absolute bottom-0 right-0 m-4 z-10 text-white'}>{
        props.target &&
        <TargetLabel
          id={props.id}
          name={props.target.name}
          className='z-10'
          swapTargets={props.func.swapTargets}
        />
      }</div>

      {/* Image preview */}
      {/* <Link href="/collection/[id]" as={`/collection/${props.slug || props.id}`}>
      </Link> */}
    </div>
  )
}

CollectionsCell.propTypes = {
  id: PT.string.isRequired,
  name: PT.string.isRequired,
  target: PT.object,
  contents: PT.object,
  slug: PT.string,
  func: PT.object
}

export default CollectionsCell
