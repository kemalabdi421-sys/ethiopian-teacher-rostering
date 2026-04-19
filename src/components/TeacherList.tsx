import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Teacher } from '../types/teacher';
import { TeacherCard } from './TeacherCard';
import { Empty, EmptyTitle, EmptyDescription, EmptyHeader, EmptyMedia } from './ui/empty';

interface TeacherListProps {
  teachers: Teacher[];
  onTeacherClick: (teacher: Teacher) => void;
}

export const TeacherList: React.FC<TeacherListProps> = ({ teachers, onTeacherClick }) => {
  if (teachers.length === 0) {
    return (
      <div className="py-20 flex justify-center">
        <Empty className="max-w-md">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search className="h-6 w-6" />
            </EmptyMedia>
            <EmptyTitle>No teachers found</EmptyTitle>
            <EmptyDescription>
              Try adjusting your filters or search terms to find what you're looking for.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
      <AnimatePresence mode="popLayout">
        {teachers.map((teacher) => (
          <TeacherCard 
            key={teacher.id} 
            teacher={teacher} 
            onClick={onTeacherClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};