import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function Dropzone (props) {
  const { handleFiles, withDrag, ...rest } = props
  const onDrop = useCallback(acceptedFiles => {
    handleFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const { children: childrenWithDrag, ...restWithDrag } = withDrag(isDragActive) || {}

  return (
    <div {...getRootProps({ ...rest, ...restWithDrag })}>
      <input {...getInputProps()} />
      {childrenWithDrag || props.children}
    </div>
  )
}

Dropzone.propTypes = {
  handleFiles: PropTypes.func.isRequired,
  withDrag: PropTypes.func,
  children: PropTypes.element
}

export default Dropzone
