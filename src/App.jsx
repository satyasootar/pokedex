import React from 'react'
import Home from './Home'
import DetailPokemon from './Pages/DetailPokemon'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<DetailPokemon />} />
            </Routes>

        </div>
    )
}

export default App