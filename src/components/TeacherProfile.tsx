import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, Phone, Mail, MapPin, Book, 
  GraduationCap, Calendar, Edit3, Trash2 
} from 'lucide-react';
import { Teacher } from '../types/teacher';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TeacherProfileProps {
  teacher: Teacher;
  onClose: () => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ 
  teacher, 
  onClose, 
  onEdit,
  onDelete
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Left Side: Image & Key Info */}
        <div className="md:w-1/3 bg-emerald-900 relative">
          <img 
            src={teacher.profile_image_url} 
            alt={teacher.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all md:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-3xl font-bold mb-1">{teacher.name}</h2>
            <p className="text-emerald-200 flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4" />
              {teacher.region}
            </p>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto bg-slate-50">
          <div className="hidden md:flex justify-end mb-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-emerald-100 rounded-full text-emerald-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2">
                <Book className="h-4 w-4" />
                Teaching Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Current Institution</p>
                  <p className="font-semibold text-slate-800">{teacher.school_name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map(s => (
                      <Badge key={s} className="bg-amber-100 text-amber-800 border-none">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Qualifications
              </h3>
              <p className="text-slate-700 bg-white p-4 rounded-2xl border border-emerald-50">
                {teacher.qualifications}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Biography
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {teacher.biography}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${teacher.phone_number}`} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-emerald-300 hover:bg-emerald-50 transition-all text-slate-700">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  {teacher.phone_number}
                </a>
                <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-emerald-300 hover:bg-emerald-50 transition-all text-slate-700">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  {teacher.email}
                </a>
              </div>
            </section>

            <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-3">
              <Button 
                onClick={() => onEdit(teacher)}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onDelete(teacher.id)}
                className="text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <div className="flex-1"></div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined: {new Date(teacher.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};