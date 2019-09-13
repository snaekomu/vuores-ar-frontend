import getConfig from 'next/config'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Layout from '../layouts/Layout'
import UploadForm from '../components/UploadForm'

import 'sanitize.css'
import '../styles/tailwind.css'
import '../styles/slick.css'
import '../styles/slick-theme.css'

import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const api = publicRuntimeConfig.apiUri

function ReadFile (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = () => reject(new Error('file reading was aborted'))
    reader.onerror = () => reject(new Error('file reading has failed'))
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

function Upload (props) {
  const [files, setFiles] = useState()

  function handleFiles (files) {
    Promise.all(files.map(file => ReadFile(file)))
      .then(res => {
        console.log(res)
        setFiles(files.map((f, i) => ({
          name: f.name,
          data: res[i]
        })))
      })
      .catch(err => console.error(err))
  }

  const forms = files && files.map((f, i) => (
    <UploadForm
      handleFiles={handleFiles}
      collections={props.collections}
      file={f}
      key={i}
      formId={'form-' + i}
    />
  ))

  return (
    <Layout
      header="Upload"
    >
      { files
        ? forms
        : <UploadForm
          handleFiles={handleFiles}
          collections={props.collections}
          formId="form"
        />
      }
    </Layout>
  )
}

Upload.getInitialProps = async function () {
  const res = await axios.get(`${api}/galleries`)
  return {
    collections: res.data
  }
}

Upload.propTypes = {
  collections: PropTypes.array
}

export default Upload
