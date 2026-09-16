import React from 'react'

const page = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden  px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-100 opacity-60 blur-3xl" />
      </div>

    

      <span className="relative rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-800">
        Under Construction
      </span>
      <h1 className="relative text-3xl font-bold text-gray-900">Coming Soon</h1>
      <p className="relative max-w-md text-gray-600">
        This page is currently being built and will be available soon. Please check back later.
      </p>
    </div>
  )
}

export default page
