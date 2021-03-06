import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Slick from 'react-slick'
import { useDrop } from 'react-dnd-cjs'
import { FiTrash2, FiEdit3 } from 'react-icons/fi'
import PT from 'prop-types'

import TargetLabel from './TargetLabel'

const NextArrow = ({ className, style, onClick }) => <div className={className + ' absolute z-10 right-0 mr-2'} style={style} onClick={onClick} />
const PrevArrow = ({ className, style, onClick }) => <div className={className + ' absolute z-10 left-0 ml-2'} style={style} onClick={onClick} />

const unmutableConfig = {
  infinite: true,
  slidesToShow: 1,
  dotsClass: 'absolute bottom-0 slick-dots',
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
}

function CollectionsCell (props) {
  const { id, i, contents } = props
  // const { editCollection, swapTargets } = props.func

  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState('')
  const [editing, setEditing] = useState(false)
  const [dots, setDots] = useState(false)
  const [arrows, setArrows] = useState(false)
  const [name, setName] = useState(props.name)

  const visibilityStyle = useMemo(() => visible ? 'visible' : 'invisible', [visible])
  const opacityStyle = useMemo(() => opacity === 100 ? '' : 'opacity-' + opacity, [opacity])
  const slickConf = useMemo(() => ({
    ...unmutableConfig,
    dots: dots,
    arrows: arrows
  }), [dots, arrows])

  const textInput = React.createRef()

  const [, drop] = useDrop({
    accept: 'target',
    drop: (item, monitor) => {
      swapTargets(item.id, id)
    }
  })

  function handleMouseEnter () {
    setDots(false)
    setArrows(true)
    setOpacity(50)
    setVisible(true)
  }

  function handleMouseLeave (e) {
    setDots(false)
    setArrows(true)
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
    props.func.updateName(name, i)
  }

  useEffect(() => { if (editing) textInput.current.focus() }, [editing])

  // Render
  // ------
  const renderContents = typeof contents !== 'object' ? undefined : Object.keys(contents).map((key, i) => (
    <img
      key={i}
      src={contents[key].file && contents[key].file.url}
      className={`w-76 h-56 object-cover ${opacityStyle}`}
    />
  ))

  return (
    <div
      className='w-68 h-56 mx-4 my-4 relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={drop}
    >
      {/* Name */}
      <div className={`absolute top-0 left-0 my-4 px-4 z-10 w-full text-white ${visibilityStyle}`}>{
        !editing
          ? <p className='text-shadow w-full'>{name}</p>
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
      }</div>

      {/* Actions */}
      <div className={`absolute bottom-0 left-0 m-4 z-10 text-white scale-110 svg-shadow ${visibilityStyle}`}>
        <button
          className='text-white'
          onClick={deleteThis}
        >
          <FiTrash2 className='content-box opacity-75 mr-2 hover:opacity-100' />
        </button>
        <button
          className='text-white'
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
      <Link href="/collection/[id]" as={`/collection/${props.slug || props.id}`}>
        <div
          className='rounded-lg overflow-hidden bg-dark-grey'
          // ref={drop}
        >
          <Slick {...slickConf}>
            {renderContents}
          </Slick>
        </div>
      </Link>
    </div>
  )
}

CollectionsCell.prototype.swapTargets = function () {
  console.log(this)
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
