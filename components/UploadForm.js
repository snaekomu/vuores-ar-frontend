import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropzone from '../components/Dropzone'

function UploadForm (props) {
  const [nameValue, setName] = useState()
  useEffect(() => props.file && setName(props.file.name), [props.file])

  const checks = props.collections.map((c, i) => (
    <div key={i} className="block">
      <input type="checkbox" id={'check' + i}/>
      <label
        htmlFor={'check' + i}
        className="ml-2 font-normal"
        value={c.id}
      >
        {c.name}
      </label>
    </div>
  ))

  return (
    <form className="flex" id={props.formId}>
      <div className="w-1/3 p-6">
        {props.file
          ? <img
            src={props.file.data}
            className="rounded object-cover overflow-hidden w-full h-full"
          />
          : <Dropzone
            handleFiles={props.handleFiles}
          />
        }
      </div>
      <div className="w-1/3 p-6">
        <label htmlFor="nameInput">File:</label>
        <div className='flex mb-4'>
          <input
            className="w-auto p-2 bg-blue-100 rounded flex-grow"
            name="name"
            id="nameInput"
            type="text"
            placeholder="file"
            value={nameValue}
            onChange={e => setName(e.currentTarget.value)}
          />
          <span className="mx-1 self-center font-normal">{!props.file ? '.png' : '.' + props.file.name.split('.').pop()}</span>
        </div>
        <label
          htmlFor="descInput"
        >
          Text (optional):
        </label>
        <textarea
          name="desc"
          id="descInput"
          rows="10"
          className="w-full rounded bg-blue-100 p-2 my-2"
        />
      </div>
      <div className="w-1/3 p-6">
        <p className="font-medium mb-1">Add to collections:</p>
        {checks}
      </div>
    </form>
  )
}

UploadForm.propTypes = {
  collections: PropTypes.array,
  file: PropTypes.object,
  handleFiles: PropTypes.func,
  formId: PropTypes.string.isRequired
}

export default UploadForm
