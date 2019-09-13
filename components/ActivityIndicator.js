import React from 'react'

export default function (elem, classes) {
  return <span className={'text-sm mr-4 align-baseline ' + classes || ''}>{elem}</span>
}
