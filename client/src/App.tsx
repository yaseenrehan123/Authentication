import React from 'react'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <div className='p-0 m-0 box-border'>
      <div className='w-screen h-screen flex items-center flex-col pt-2 pb-2 bg-neutral-900'>
        <Navbar />
      </div>

    </div>
  )
}

export default App