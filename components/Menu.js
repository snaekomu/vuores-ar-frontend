// import Modali, { useModali } from 'modali'

import Upload from './Upload'
// import ActivityIndicator from './ActivityIndicator'

function Menu (props) {
  /* const [uploadModal, toggleUploadModal] = useModali({
    title: 'Upload image'
  }) */

  return (
    <>
      {/* <Modali.Modal {...uploadModal}>
        <Upload collections={props.collections} />
      </Modali.Modal> */}
      <div className='my-6'>
        <div className='inline-block text-left w-1/4'>
          <button
            // onClick={toggleUploadModal}
            className='py-2 px-7 text-white bg-gradient-r-pink rounded-lg shadow-lg transition-all transition-250 xhover:shadow-xl hover:scale-110 active:scale-100 active:shadow-lg'
          >
            Upload
          </button>
        </div>
        <div className='inline-block w-3/4 text-right text-lg'>
          <ul>
            <li className='inline'>{props.status}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Menu
