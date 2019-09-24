import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropzone from '../components/Dropzone'

function UploadForm (props) {
  const [nameValue, setName] = useState('')
  const [descValue, setDesc] = useState('')
  const [checkValues, setCheckValues] = useState([])
  useEffect(() => props.file && setName(props.file.name), [props.file])
  useEffect(() => {
    props.onChange && props.onChange({
      name: nameValue,
      desc: descValue,
      collections: checkValues
    })
  }, [nameValue, descValue, checkValues])

  function handleCheckedChange (e) {
    if (e.target.checked) {
      setCheckValues([...checkValues, e.target.value])
    } else {
      setCheckValues([...checkValues].filter(v => v !== e.target.value))
    }
  }

  const checks = props.collections.map((c, i) => (
    <div key={i} className="block">
      <input
        type="checkbox"
        id={'check' + i}
        value={c.id}
        onChange={e => handleCheckedChange(e)}
        disabled={props.disabled}
      />
      <label
        htmlFor={'check' + i}
        className={`ml-2 font-normal ${props.disabled && 'text-gray-400'}`}
      >
        {c.name}
      </label>
    </div>
  ))

  return (
    <form className="flex relative" id={props.formId}>
      {props.fade &&
        <div className="bg-gradient-t-fade absolute inset-0">
          <Dropzone
            handleFiles={props.handleFiles}
            withDrag={(dragging) => ({
              className: `absolute flex inset-0 z-10 ${dragging && 'bg-transparent-blue rounded-lg'}`,
              children: (dragging &&
                <p
                  className="text-center w-full text-blue-400 text-4xl opacity-100 z-20 font-medium self-center"
                >
                  Drop files to add to upload
                </p>
              )
            })}
          />
        </div>
      }
      <div className="w-1/3 p-6">
        {props.file
          ? <img
            src={props.file.data}
            className="rounded object-cover overflow-hidden w-full h-full"
          />
          : <Dropzone
            handleFiles={props.handleFiles}
            withDrag={(dragging) => ({
              className: `w-full h-full border-dashed border-2 border-${dragging ? 'green' : 'blue'}-200 rounded mb-4`,
              children: (
                <p className={`text-center text-${dragging ? 'green' : 'blue'}-400 mt-1/2 -translate-y-1/2`}>
                  {dragging ? 'Drop files here' : 'Drag files here or click to select'}
                </p>
              )
            })}
          />
        }
      </div>
      <div className="w-1/3 p-6">
        <label
          htmlFor="nameInput"
          className={props.disabled && 'text-gray-400'}
        >File name:</label>
        <div className='flex mb-4'>
          <input
            className={`w-auto p-2 rounded flex-grow ${props.disabled ? 'bg-gray-200' : 'bg-blue-100'}`}
            name="name"
            id="nameInput"
            type="text"
            placeholder="file"
            value={nameValue}
            onChange={e => setName(e.target.value)}
            disabled={props.disabled}
          />
          <span
            className={`mx-1 self-center font-normal ${props.disabled && 'text-gray-400'}`}
          >
            {!props.file ? '.png' : '.' + props.file.name.split('.').pop()}
          </span>
        </div>
        <label
          htmlFor="descInput"
          className={props.disabled && 'text-gray-400'}
        >
          Text (optional):
        </label>
        <textarea
          name="desc"
          id="descInput"
          rows="10"
          className={`w-full rounded p-2 my-2 ${props.disabled ? 'bg-gray-200' : 'bg-blue-100'}`}
          value={descValue}
          onChange={e => setDesc(e.target.value)}
          disabled={props.disabled}
        />
      </div>
      <div className="w-1/3 p-6">
        <p className={`font-medium mb-1 ${props.disabled && 'text-gray-400'}`}>Add to collections:</p>
        {checks}
      </div>
    </form>
  )
}

UploadForm.propTypes = {
  collections: PropTypes.array,
  file: PropTypes.object,
  handleFiles: PropTypes.func,
  formId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  fade: PropTypes.bool,
  disabled: PropTypes.bool
}

export default UploadForm
