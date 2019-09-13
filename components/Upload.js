import { useState, useRef } from 'react'
import Dropzone from './Dropzone'
import Slick from 'react-slick'
import UploadForm from './UploadForm'
import ActivityIndicator from './ActivityIndicator'
import axios from 'axios'

const NextArrow = ({ className, style, onClick }) => <div className={className + ' before:black mr-2'} style={style} onClick={onClick} />
const PrevArrow = ({ className, style, onClick }) => <div className={className + ' before:black ml-2'} style={style} onClick={onClick} />

const conf = {
  dots: false,
  arrows: false,
  infinite: false,
  slidesToShow: 1,
  dotsClass: 'slick-dots',
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
}

function Upload (props) {
  const [files, setFiles] = useState(null)
  const [sel, setSel] = useState(0)
  const slide = useRef()

  function upload (data) {
    axios.post(
      `${process.env.API_URI}/api/v1/files`,
      data,
      {
        params: { id: props.id }
      }
    )
      .then(res => {
        props.setLoading(ActivityIndicator(res.body, 'text-green-500'))
      })
      .catch(err => {
        props.setLoading(ActivityIndicator(err.message, 'text-red-500'))
      })
  }

  return (
    <div className='p-6 m-2 pt-4'>
      <Dropzone files={files} setFiles={setFiles} sel={sel} />
      { files &&
        <>
          <Slick {...conf}
            ref={slide}
            beforeChange={(current, next) => { setSel(next) }}
          >
            <UploadForm collections={props.collections} />
            <UploadForm collections={props.collections} />
          </Slick>
          { sel > 0 &&
            <button
              className='block mt-4 float-left py-1 px-3 bg-blue-400 text-white rounded'
              onClick={() => { slide.current.slickPrev() }}
            >
              Back
            </button>
          }
          <button
            className='block mt-4 float-right py-1 px-3 bg-blue-400 text-white rounded'
            onClick={() => { slide.current.slickNext() }}
          >
            {files.length <= 1 || sel === files.length - 1 ? 'Upload' : 'Next'}
          </button>
        </>
      }
    </div>
  )
}

export default Upload
