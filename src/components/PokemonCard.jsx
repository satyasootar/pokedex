import { Heart, Sword, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const typeColors = {
    normal: {
        gradient: 'bg-gradient-to-r from-gray-300 to-gray-400',
        badge: 'bg-gray-100 text-gray-600',
        text: 'text-gray-600',
        icon: '#A8A77A',
        border: '#6B7280'
    },
    fire: {
        gradient: 'bg-gradient-to-r from-orange-400 to-amber-500',
        badge: 'bg-orange-100 text-orange-600',
        text: 'text-orange-600',
        icon: '#F97316',
        border: '#EA580C'
    },
    water: {
        gradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
        badge: 'bg-blue-100 text-blue-600',
        text: 'text-blue-600',
        icon: '#3B82F6',
        border: '#2563EB'
    },
    electric: {
        gradient: 'bg-gradient-to-r from-amber-300 to-yellow-400',
        badge: 'bg-yellow-100 text-yellow-600',
        text: 'text-yellow-600',
        icon: '#EAB308',
        border: '#CA8A04'
    },
    grass: {
        gradient: 'bg-gradient-to-r from-emerald-400 to-green-500',
        badge: 'bg-green-100 text-green-600',
        text: 'text-green-600',
        icon: '#10B981',
        border: '#059669'
    },
    ice: {
        gradient: 'bg-gradient-to-r from-blue-200 to-blue-400',
        badge: 'bg-blue-100 text-blue-500',
        text: 'text-blue-500',
        icon: '#96D9D6',
        border: '#5BC0BE'
    },
    fighting: {
        gradient: 'bg-gradient-to-r from-rose-400 to-red-500',
        badge: 'bg-red-100 text-red-600',
        text: 'text-red-600',
        icon: '#EF4444',
        border: '#DC2626'
    },
    poison: {
        gradient: 'bg-gradient-to-r from-violet-400 to-purple-500',
        badge: 'bg-purple-100 text-purple-600',
        text: 'text-purple-600',
        icon: '#A33EA1',
        border: '#7D3C98'
    },
    ground: {
        gradient: 'bg-gradient-to-r from-yellow-700 to-yellow-900',
        badge: 'bg-yellow-100 text-yellow-700',
        text: 'text-yellow-700',
        icon: '#E2BF65',
        border: '#C4903F'
    },
    flying: {
        gradient: 'bg-gradient-to-r from-sky-300 to-sky-500',
        badge: 'bg-blue-100 text-blue-500',
        text: 'text-blue-500',
        icon: '#A890F0',
        border: '#6D6DA4'
    },
    psychic: {
        gradient: 'bg-gradient-to-r from-fuchsia-400 to-pink-500',
        badge: 'bg-purple-100 text-purple-600',
        text: 'text-purple-600',
        icon: '#9333EA',
        border: '#7E22CE'
    },
    bug: {
        gradient: 'bg-gradient-to-r from-lime-400 to-green-500',
        badge: 'bg-green-100 text-green-600',
        text: 'text-green-600',
        icon: '#A6B91A',
        border: '#6B8E23'
    },
    rock: {
        gradient: 'bg-gradient-to-r from-gray-500 to-gray-700',
        badge: 'bg-gray-100 text-gray-600',
        text: 'text-gray-600',
        icon: '#B6A136',
        border: '#8B7355'
    },
    ghost: {
        gradient: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
        badge: 'bg-indigo-100 text-indigo-600',
        text: 'text-indigo-600',
        icon: '#735797',
        border: '#5A4E7C'
    },
    dragon: {
        gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
        badge: 'bg-indigo-100 text-indigo-600',
        text: 'text-indigo-600',
        icon: '#6F35FC',
        border: '#553C9A'
    },
    dark: {
        gradient: 'bg-gradient-to-r from-gray-700 to-gray-900',
        badge: 'bg-gray-100 text-gray-700',
        text: 'text-gray-700',
        icon: '#705746',
        border: '#4D4038'
    },
    steel: {
        gradient: 'bg-gradient-to-r from-gray-400 to-gray-600',
        badge: 'bg-gray-100 text-gray-600',
        text: 'text-gray-600',
        icon: '#B7B7CE',
        border: '#8A8A9F'
    },
    fairy: {
        gradient: 'bg-gradient-to-r from-pink-300 to-pink-500',
        badge: 'bg-pink-100 text-pink-600',
        text: 'text-pink-600',
        icon: '#D685AD',
        border: '#B368A1'
    }
};

function PokemonCard({
    name,
    type,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    imageUrl
}) {
    return (
        <motion.div
            whileHover={{ y: -1 }}
            className="relative group w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
        >
            {/* Gradient Accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${typeColors[type].gradient} opacity-80`} />

            {/* Image Section */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-900 p-4">
                <motion.img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                />

                {/* Type Indicator */}
                <div
                    className={`absolute bottom-2 right-2 ${typeColors[type].badge} px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-transform hover:scale-105 shadow-sm`}
                >
                    {type}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Name */}
                <h2 className={`text-xl font-semibold text-gray-800 dark:text-gray-200 capitalize mb-4 ${typeColors[type].text}`}>
                    {name}
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <StatItem Icon={Heart} label="HP" value={hp} color={typeColors[type].icon} />
                    <StatItem Icon={Sword} label="ATK" value={attack} color={typeColors[type].icon} />
                    <StatItem Icon={Shield} label="DEF" value={defense} color={typeColors[type].icon} />
                    <StatItem Icon={Zap} label="SP.ATK" value={specialAttack} color={typeColors[type].icon} />
                </div>
            </div>

            {/* Hover Border Effect */}
            <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[${typeColors[type].border}] transition-colors duration-300 pointer-events-none`}
            />
        </motion.div>
    );
}

function StatItem({ Icon, label, value, color }) {
    return (
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Icon className="w-4 h-4" style={{ color }} />
            <span className="text-sm">{label}</span>
            <span className="ml-auto font-medium text-gray-700 dark:text-gray-300">{value}</span>
        </div>
    );
}

export default PokemonCard;
