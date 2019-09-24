import React, { useState, useEffect, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'
import axios from 'axios'
import ActivityIndicator from './ActivityIndicator'
import getConfig from 'next/config'
import { func } from 'prop-types'

const { publicRuntimeConfig } = getConfig()
const api = publicRuntimeConfig.apiUri

function NewCollection (props) {
  const [sel, setSel] = useState(false)
  const [name, setName] = useState('')
  const textInput = React.createRef()
  useEffect(() => { if (sel) textInput.current.focus() }, [sel])

  /* const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(element => {
      console.log(element)
    })
  }, []) */

  function handleNameChange (e) {
    setName(e.currentTarget.value)
  }

  function handleSubmit (e) {
    axios.post(
      `${api}/collection`,
      {
        name
      }
    )
      .then(res => {
        props.func.setCollections([...props.collections, res])
      })
  }

  return (
    <div
      className={`w-68 h-56 border-dashed border-4 m-4 rounded-lg
        ${false
          ? 'text-green-400 border-green-400'
          : 'text-blue-400 border-blue-400'}
      `}
      onClick={() => { setSel(true) }}
      onBlur={() => { if (textInput.current.value === '') setSel(false) }}
    >
      <div className='w-full h-full flex flex-wrap content-center justify-middle text-center align-middle'>
        <div className={sel ? 'hidden' : 'w-full'}>
          <FiPlus className='text-6xl w-full' />
          <p className='w-full'>
            Create new collection
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className={sel ? 'w-full px-8 text-left' : 'hidden'}
        >
          <label
            htmlFor='colname'
            className='text-xs'
          >Name:</label>
          <div className='w-full mt-1 bg-blue-100 text-blue-400 text-center rounded'>
            <input
              id='colname'
              type='text'
              className='bg-transparent text-center py1 pl-1'
              ref={textInput}
              onChange={handleNameChange}
              value={name}
            />
            <input
              type='submit'
              value='+'
              className='bg-transparent py-1 px-2'
            />
          </div>
        </form>
      </div>
    </div >
  )
}

export default NewCollection
