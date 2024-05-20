import React from 'react'
import { auth } from '../lib/auth'

const page =async () => {
  const session=await auth()
  return (
    <div>
       <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome , {session?.user?.name?.split(' ')[0]}
      </h2>
    </div>
  )
}

export default page
