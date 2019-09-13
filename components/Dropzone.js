import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function Dropzone (props) {
  const onDrop = useCallback(acceptedFiles => {
    props.handleFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={`w-full h-full border-dashed border-2 border-${isDragActive ? 'green' : 'blue'}-200 rounded mb-4`}>
      <input {...getInputProps()} />
      <p className={`text-center text-${isDragActive ? 'green' : 'blue'}-400 mt-1/2 -translate-y-1/2`}>
        {isDragActive ? 'Drop files here' : 'Drag files here or click to select'}
      </p>
    </div>
  )
}

Dropzone.propTypes = {
  handleFiles: PropTypes.func.isRequired
}

export default Dropzone
