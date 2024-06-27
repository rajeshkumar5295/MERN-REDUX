import React from 'react'
import { Spinner } from 'react-bootstrap'

const Spin = () => {
  return (
    <Spinner animation="border" role="status" style={{top:"50%",right:"50%",margin:"auto", position:"absolute" }} >
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  )
}

export default Spin
