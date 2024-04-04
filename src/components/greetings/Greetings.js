import React from 'react'

const Greetings = () => {
  const userName = localStorage.getItem("userName")
  return (
    <div className='container'>
      <h1>Hello {userName}</h1>
    </div>
  )
}

export default Greetings
