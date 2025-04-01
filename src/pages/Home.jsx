// pages/Home.jsx
import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, type: 'spring' }}
        className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-200 opacity-20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, type: 'spring', delay: 0.3 }}
        className="absolute top-40 -right-20 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-200 opacity-20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Transform Your Images{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              with AI
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            High-quality image processing powered by cloud intelligence
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            <FeatureCard
              title="Fast Processing"
              icon="⚡"
              description="Get your images processed in seconds using cloud power"
              variants={itemVariants}
            />
            <FeatureCard
              title="Secure Storage"
              icon="🔒"
              description="Military-grade encryption for all your processed files"
              variants={itemVariants}
            />
            <FeatureCard
              title="Any Format"
              icon="🖼️"
              description="Supports JPG, PNG, WEBP, and more"
              variants={itemVariants}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 8px 25px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg transition-all"
          >
            Get Started - It's Free
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

const FeatureCard = ({ title, icon, description, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{ y: -10, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-default group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className="text-5xl mb-6 inline-block"
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);