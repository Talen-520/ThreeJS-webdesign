import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import Model from './model.tsx'
import Footer from './footer.tsx'
import Header from './header.tsx'
export function App() {


  return (
    <div>
      <Header/>
      <Model />
      <Footer />
    </div>
  )
}
