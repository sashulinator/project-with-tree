import React from 'react'

export default function NotFound(): JSX.Element {
  return (
    <main
      className='Main NotFound'
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}
    >
      ERROR 404
      <br /> go to file src/app/layout to change layout
    </main>
  )
}
