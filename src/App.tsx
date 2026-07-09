import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SmoothScrollProvider from './components/layout/SmoothScrollProvider'
import Home from './pages/Home'
import ModuleView from './pages/ModuleView'

export default function App() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ModuleView />} />
      </Routes>
    </SmoothScrollProvider>
  )
}
