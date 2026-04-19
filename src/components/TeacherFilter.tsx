import React from 'react';
import { Filter, X } from 'lucide-react';
import { Region } from '../types/teacher';

const REGIONS: Region[] = [
  'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa', 'Gambela', 
  'Harari', 'Oromia', 'Sidama', 'Somali', 'South West Ethiopia', 
  'Southern Nations, Nationalities, and Peoples', 'Tigray'
];

const SUBJECTS = [
  'Mathematics', 'Physics', 'Biology', 'Chemistry', 'English Literature', 
  'Amharic', 'Afaan Oromoo', 'History', 'Geography', 'Economics', 'Civics', 'ICT'
];

interface TeacherFilterProps {
  selectedRegion: string;
  selectedSubject: string;
  onRegionChange: (region: string) => void;
  onSubjectChange: (subject: string) => void;
  onClear: () => void;
}

export const TeacherFilter: React.FC<TeacherFilterProps> = ({
  selectedRegion,
  selectedSubject,
  onRegionChange,
  onSubjectChange,
  onClear
}) => {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-4 shadow-sm">
      <div className="flex items-center gap-2 text-emerald-800 font-semibold mr-2">
        <Filter className="h-5 w-5" />
        <span>Filters:</span>
      </div>

      <div className="flex-1 flex flex-wrap gap-4">
        <select 
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="bg-emerald-50/50 border border-emerald-200 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none transition-all"
        >
          <option value="">All Regions</option>
          {REGIONS.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select 
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="bg-emerald-50/50 border border-emerald-200 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none transition-all"
        >
          <option value="">All Subjects</option>
          {SUBJECTS.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {(selectedRegion || selectedSubject) && (
        <button 
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  );
};