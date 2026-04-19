import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Book, Phone, Mail, ChevronRight } from 'lucide-react';
import { Teacher } from '../types/teacher';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface TeacherCardProps {
  teacher: Teacher;
  onClick: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col border-emerald-100 hover:shadow-xl hover:shadow-emerald-100 transition-all cursor-pointer" onClick={() => onClick(teacher)}>
        <div className="relative h-48 overflow-hidden group">
          <img 
            src={teacher.profile_image_url} 
            alt={teacher.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-emerald-600/90 text-white backdrop-blur-sm border-none">
              {teacher.region}
            </Badge>
          </div>
        </div>

        <CardContent className="pt-5 flex-grow">
          <h3 className="text-xl font-bold text-slate-800 mb-1">{teacher.name}</h3>
          <p className="text-emerald-700 font-medium text-sm mb-3 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {teacher.school_name}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {teacher.subjects.map((subject, idx) => (
              <Badge key={idx} variant="secondary" className="bg-amber-50 text-amber-800 border-amber-100 text-[10px] px-2 py-0">
                {subject}
              </Badge>
            ))}
          </div>

          <p className="text-slate-600 text-sm line-clamp-2 italic">
            "{teacher.biography}"
          </p>
        </CardContent>

        <CardFooter className="border-t border-slate-50 pt-4 flex flex-col gap-3">
          <div className="w-full flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {teacher.phone_number}
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              Contact
            </div>
          </div>
          <Button variant="ghost" className="w-full text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 group">
            View Profile
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};