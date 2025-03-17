import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

function Home() {
  const [pokemon, setPokemon] =  useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const fetchPokemon = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200&offset=0");
      const data = await res.json();

      const pokemonData = data.results.map(async (currentPokemon) => {
        const res = await fetch(currentPokemon.url);
        const data = await res.json();
        console.log("data: ", data);

        return data;
      });

      const pokemons = await Promise.all(pokemonData);
      setPokemon(pokemons);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Filter Pokémon based on searchTerm
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <h2 className='flex justify-center text-8xl dark:text-stone-50 m-10 text-black' >PokéDex</h2>
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 px-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={() => { }}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
          >
            Search
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? (
              '🌞'
            ) : (
              '🌙'
            )}
          </button>

        </div>

        {/* Pokémon Grid */}
        {pokemon.length > 0 ? (
          <div  >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
              {filteredPokemon.map((ele) => (
                <Link to={`/detail/${ele.id}`} key={ele.id} className='flex justify-center' >
                  <PokemonCard
                    name={ele.name}
                    type={ele?.types[0]?.type?.name}
                    hp={ele?.stats[0].base_stat}
                    attack={ele?.stats[1].base_stat}
                    defense={ele?.stats[2].base_stat}
                    specialAttack={ele?.stats[3].base_stat}
                    specialDefense={ele?.stats[4].base_stat}
                    imageUrl={ele?.sprites.other.dream_world.front_default}
                  />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <TailSpin
              visible={true}
              height="90"
              width="90"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
