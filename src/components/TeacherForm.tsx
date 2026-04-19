import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { Teacher, Region } from '../types/teacher';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface TeacherFormProps {
  teacher?: Teacher;
  onClose: () => void;
  onSave: (teacher: Teacher) => void;
}

const REGIONS: Region[] = [
  'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa', 'Gambela', 
  'Harari', 'Oromia', 'Sidama', 'Somali', 'South West Ethiopia', 
  'Southern Nations, Nationalities, and Peoples', 'Tigray'
];

export const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Teacher>>(teacher || {
    name: '',
    email: '',
    phone_number: '',
    school_name: '',
    region: 'Addis Ababa',
    subjects: [],
    qualifications: '',
    biography: '',
    profile_image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop'
  });

  const [subjectInput, setSubjectInput] = useState('');

  const handleAddSubject = () => {
    if (subjectInput.trim() && !formData.subjects?.includes(subjectInput.trim())) {
      setFormData({
        ...formData,
        subjects: [...(formData.subjects || []), subjectInput.trim()]
      });
      setSubjectInput('');
    }
  };

  const removeSubject = (sub: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects?.filter(s => s !== sub)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required');
      return;
    }
    
    const newTeacher: Teacher = {
      ...(formData as Teacher),
      id: teacher?.id || Math.random().toString(36).substr(2, 9),
      created_at: teacher?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      subjects: formData.subjects || []
    };
    
    onSave(newTeacher);
    toast.success(teacher ? 'Teacher updated successfully' : 'Teacher added successfully');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {teacher ? 'Edit Teacher' : 'Add New Teacher'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Abebe Bikila"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="abebe@example.et"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone_number} 
                onChange={e => setFormData({...formData, phone_number: e.target.value})}
                placeholder="+251 9..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School Name</Label>
              <Input 
                id="school" 
                value={formData.school_name} 
                onChange={e => setFormData({...formData, school_name: e.target.value})}
                placeholder="Bole Secondary School"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <select 
                id="region"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.region}
                onChange={e => setFormData({...formData, region: e.target.value as Region})}
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Profile Image URL</Label>
              <div className="relative">
                <Input 
                  id="image" 
                  value={formData.profile_image_url} 
                  onChange={e => setFormData({...formData, profile_image_url: e.target.value})}
                />
                <Upload className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subjects Taught</Label>
            <div className="flex gap-2 mb-2">
              <Input 
                value={subjectInput}
                onChange={e => setSubjectInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                placeholder="Add subject..."
              />
              <Button type="button" onClick={handleAddSubject} className="bg-amber-500 hover:bg-amber-600">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.subjects?.map(s => (
                <span key={s} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-emerald-100">
                  {s}
                  <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeSubject(s)} />
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea 
              id="qualifications"
              value={formData.qualifications}
              onChange={e => setFormData({...formData, qualifications: e.target.value})}
              placeholder="e.g. BSc in Biology, Addis Ababa University"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short Biography</Label>
            <Textarea 
              id="bio"
              className="h-24"
              value={formData.biography}
              onChange={e => setFormData({...formData, biography: e.target.value})}
              placeholder="Tell us about your teaching experience..."
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12 text-lg">
              <Check className="h-5 w-5 mr-2" />
              {teacher ? 'Update Profile' : 'Create Profile'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="h-12">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};