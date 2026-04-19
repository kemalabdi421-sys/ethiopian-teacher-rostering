import { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TeacherList } from './components/TeacherList';
import { TeacherFilter } from './components/TeacherFilter';
import { TeacherForm } from './components/TeacherForm';
import { TeacherProfile } from './components/TeacherProfile';
import { Teacher } from './types/teacher';
import { MOCK_TEACHERS } from './lib/mockData';
import { Toaster, toast } from 'sonner';

function App() {
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('ethio_teachers');
    return saved ? JSON.parse(saved) : MOCK_TEACHERS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>(undefined);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('ethio_teachers', JSON.stringify(teachers));
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        t.school_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !selectedRegion || t.region === selectedRegion;
      const matchesSubject = !selectedSubject || t.subjects.some(s => s === selectedSubject);

      return matchesSearch && matchesRegion && matchesSubject;
    });
  }, [teachers, searchTerm, selectedRegion, selectedSubject]);

  const handleSaveTeacher = (teacher: Teacher) => {
    if (editingTeacher) {
      setTeachers(prev => prev.map(t => t.id === teacher.id ? teacher : t));
    } else {
      setTeachers(prev => [teacher, ...prev]);
    }
    setIsFormOpen(false);
    setEditingTeacher(undefined);
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm('Are you sure you want to delete this teacher profile?')) {
      setTeachers(prev => prev.filter(t => t.id !== id));
      setViewingTeacher(undefined);
      toast.success('Teacher profile deleted');
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setViewingTeacher(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Toaster position="top-right" richColors />
      <Navbar 
        onAddTeacher={() => setIsFormOpen(true)} 
        onSearch={setSearchTerm} 
      />
      
      <main>
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <TeacherFilter 
            selectedRegion={selectedRegion}
            selectedSubject={selectedSubject}
            onRegionChange={setSelectedRegion}
            onSubjectChange={setSelectedSubject}
            onClear={() => {
              setSelectedRegion('');
              setSelectedSubject('');
            }}
          />

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Teacher Roster 
              <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {filteredTeachers.length} profiles
              </span>
            </h2>
          </div>

          <TeacherList 
            teachers={filteredTeachers} 
            onTeacherClick={setViewingTeacher} 
          />
        </div>
      </main>

      {/* Modals */}
      {isFormOpen && (
        <TeacherForm 
          teacher={editingTeacher}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTeacher(undefined);
          }}
          onSave={handleSaveTeacher}
        />
      )}

      {viewingTeacher && (
        <TeacherProfile 
          teacher={viewingTeacher}
          onClose={() => setViewingTeacher(undefined)}
          onEdit={handleEditTeacher}
          onDelete={handleDeleteTeacher}
        />
      )}

      <footer className="mt-20 py-12 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} EthioTeacher Roster Platform. Supporting Ethiopian Educators.
        </p>
      </footer>
    </div>
  );
}

export default App;