import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default function (props) {
    const [targets, setTargets] = useState(null)
    const [collections, setCollections] = useState(null)
    const [contents, setContents] = useState(null)
    const [loading, setLoading] = useState(null)

    /* function fetch () {
      const res = Promise.all([
        axios.get(`${process.env.API_URI}/targets`),
        axios.get(`${process.env.API_URI}/galleries`),
        axios.get(`${process.env.API_URI}/contents`)
      ])
        .then(([tar, col, con]) => {
          setTargets(tar.data)
          setContents(con.data)
          setCollections(col.data)
          console.log(contents)
        })
        .catch(err => {
          console.error(err)
        })
    } */

    /* function filter (dat) {
      return props.match && props.match.params && props.match.params.name
        ? /^[0-9a-fA-F]{24}$/.test(props.match.params.name)
          ? dat.filter(d => d._id === props.match.params.name)
          : dat.filter(d => d.name === props.match.params.name)
        : dat
    } */

    // useEffect(fetch, [])

    return (
      <div className='container p-8 m-auto text-gray-700'>
        <DndProvider backend={HTML5Backend}>
          {contents && collections && targets &&
            <CollectionGrid

            />
          }
        </DndProvider>
      </div>
    )
  }