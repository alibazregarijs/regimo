import React from 'react'
import Hero from '@/components/RootComponents/Hero'
import Navbar from '@/components/RootComponents/Navbar'
const page = () => {
  return (
    <div className='text-light-100'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default page