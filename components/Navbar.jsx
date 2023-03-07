import React from 'react'

function Navbar() {
  return (
    <div className='nav w-full flex justify-between items-center text-white z-10 relative py-14 px-20'>
      <a href="/" className='font-bold no-underline text-4xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-500'>Sphere</a>

      <ul className='flex  gap-7 font-semibold list-none '>
        <li className='cursor-pointer'>Explore</li>
        <li className='cursor-pointer'>Create</li>
      </ul>
      
    </div>
  )
}

export default Navbar
