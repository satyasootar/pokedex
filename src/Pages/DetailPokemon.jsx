import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function DetailPokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    console.log("pokemon: ", pokemon);

    const pokemonDetailFetch = async () => {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let pokemonDetail = await res.json();
        setPokemon(pokemonDetail);
    }

    useEffect(() => {
        pokemonDetailFetch();
    }, []);

    const getTypeColor = (type) => {
        const colors = {
            fire: 'bg-orange-500',
            water: 'bg-blue-500',
            grass: 'bg-green-500',
            electric: 'bg-yellow-400',
            psychic: 'bg-purple-500',
            normal: 'bg-gray-400',
            fighting: 'bg-red-700',
            flying: 'bg-blue-300',
            poison: 'bg-purple-700',
            ground: 'bg-yellow-700',
            rock: 'bg-yellow-800',
            bug: 'bg-lime-600',
            ghost: 'bg-purple-800',
            steel: 'bg-gray-400',
            dragon: 'bg-indigo-600',
            dark: 'bg-gray-800',
            fairy: 'bg-pink-400',
            ice: 'bg-cyan-400'
        };
        return colors[type] || 'bg-gray-500';
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900"
        >
            {pokemon ? (
                <div className="max-w-6xl mx-auto p-6">
                    <Link
                        to="/"
                        className="mb-4 inline-block text-blue-500 hover:text-blue-600"
                        whileHover={{ scale: 1.05 }}
                    >
                        &larr; Back to Pokedex
                    </Link>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
                    >
                        {/* Header Section */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`${getTypeColor(pokemon.types[0].type.name)} text-white rounded-2xl mb-8`}
                        >
                            <div className={`${getTypeColor(pokemon.types[0].type.name)} text-white p-6 rounded-2xl mb-8`}>
                                <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
                                <div className="flex gap-2 mt-2">
                                    {pokemon.types.map((type, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-1 rounded-full bg-white/30 backdrop-blur-sm text-sm"
                                        >
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Image Carousel */}
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    className="rounded-2xl overflow-hidden"
                                >
                                    {[
                                        pokemon.sprites.other.dream_world.front_default,
                                        pokemon.sprites.other['official-artwork'].front_default,
                                        pokemon.sprites.front_default,
                                        pokemon.sprites.back_default,
                                        pokemon.sprites.other.home.front_default,
                                        pokemon.sprites.other['official-artwork'].front_shiny,
                                    ].map((img, index) => (
                                        img && (
                                            <SwiperSlide key={index}>
                                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 h-96 flex items-center justify-center p-8">
                                                    <motion.img
                                                        src={img}
                                                        alt={pokemon.name}
                                                        className="w-full h-full object-contain"
                                                        whileHover={{ scale: 1.05 }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    ))}
                                </Swiper>
                            </motion.div>

                            {/* Details Section */}
                            <motion.div
                                variants={containerVariants}
                                className="space-y-6 dark:text-white"
                            >
                                {/* Basic Info */}
                                <motion.div
                                    variants={itemVariants}
                                    className="grid grid-cols-1 gap-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                                            <p className="text-gray-500 dark:text-gray-300">Height</p>
                                            <p className="text-xl font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                                            <p className="text-gray-500 dark:text-gray-300">Weight</p>
                                            <p className="text-xl font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Abilities */}
                                <motion.div
                                    variants={itemVariants}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl"
                                >
                                    <h2 className="text-2xl font-bold mb-4">Abilities</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {pokemon.abilities.map((ability, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="px-4 py-2 bg-white dark:bg-gray-600 rounded-full text-sm"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {ability.ability.name}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    variants={itemVariants}
                                    transition={{ delay: 0.4 }}
                                    className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl"
                                >
                                    <h2 className="text-2xl font-bold mb-4">Stats</h2>
                                    <div className="space-y-3">
                                        {pokemon.stats.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="flex justify-between mb-1">
                                                    <span className="capitalize">{stat.stat.name}</span>
                                                    <span>{stat.base_stat}</span>
                                                </div>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className={`${getTypeColor(pokemon.types[0].type.name)} h-2 rounded-full`}
                                                ></motion.div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                    ></motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default DetailPokemon;