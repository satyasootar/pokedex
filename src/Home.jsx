import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Info, Search, Moon, Sun } from 'lucide-react';

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
      const data = await res.json();

      const pokemonData = data.results.map(async (currentPokemon) => {
        const res = await fetch(currentPokemon.url);
        return await res.json();
      });

      const pokemons = await Promise.all(pokemonData);
      setPokemon(pokemons);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [limit]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Header Section */}
      <header className="text-center mb-8 relative">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
           tracking-tighter mb-4 font-['Orbitron'] drop-shadow-md">
          Pokédex
        </h1>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:scale-105 transition-transform"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      {/* Search and Controls Section */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="relative mb-8">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-3">
            <Search className="w-6 h-6 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-lg dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setLimit(1118)}
              disabled={limit === 1118 || isLoading}
              className={`px-8 py-3 rounded-xl shadow-md transition-all ${limit === 1118 || isLoading
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                } text-white font-medium flex items-center gap-2`}
            >
              {isLoading && limit === 1118 ? (
                <>
                  <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="tail-spin-loading"
                  />
                  Loading...
                </>
              ) : limit === 1118 ? (
                'All Pokémon Loaded!'
              ) : (
                'Load All Pokémon'
              )}
            </button>
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <Info className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-help" />
              {showTooltip && (
                <div className="absolute left-0 bottom-full mb-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 text-sm 
                   text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                  <div className="absolute -bottom-1 left-4 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 border-b 
                     border-r border-gray-100 dark:border-gray-700"></div>
                  Loading all 1118 Pokémon might take some time depending on your connection speed.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pokémon Grid */}
      {pokemon.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4">
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
                  imageUrl={ele?.sprites.other['official-artwork'].front_default}
                />
              </Link>
            ))}
          </div>
          {limit !== 1118 && filteredPokemon.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-8 text-lg">
              No Pokémon found matching your search
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <TailSpin
            visible={true}
            height="90"
            width="90"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
          />
        </div>
      )}
    </div>
  );
}

export default Home;