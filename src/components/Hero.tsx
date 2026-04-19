import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8ecf82f4-c648-4f32-be0b-0b0473e7aae2/school-hero-13aae68b-1776560461866.webp"
          alt="School Hero"
          className="w-full h-full object-cover opacity-15 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full">
            The National Educator Directory
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Connecting <span className="text-emerald-600">Ethiopia's</span> Finest <br />
            Educational Minds
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            A centralized platform to manage, search, and connect with qualified teachers across all regions of Ethiopia.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 text-slate-700 font-medium"
        >
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-4 py-2 rounded-lg border border-white/20">
            <Search className="h-5 w-5 text-emerald-500" />
            <span>Smart Search</span>
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-4 py-2 rounded-lg border border-white/20">
            <MapPin className="h-5 w-5 text-amber-500" />
            <span>Regional Access</span>
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-4 py-2 rounded-lg border border-white/20">
            <GraduationCap className="h-5 w-5 text-emerald-500" />
            <span>Verified Talent</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};