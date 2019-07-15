import React from 'react'

export function List (props) {
  const fields = props.fields.map(field => { <th>{field}</th> })
  return (
    <div className='container'>
      <h2>{props.name}</h2>
      <table>
        <thead>
          <tr>{fields}</tr>
        </thead>
      </table>
    </div>
  )
}
