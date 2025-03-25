import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'

function App() {
  return (
    <div className='w-screen h-screen bg-[#1f1e24] flex'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<Trending/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/movies' element={<Movie/>}/>
        <Route path='/tvshows' element={<Tvshows/>}/>
      </Routes>
    </div>
  )
}

export default App