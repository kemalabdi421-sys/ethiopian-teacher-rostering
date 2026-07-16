export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  subjects: string[];
  school_name: string;
  region: string;
  qualifications: string;
  biography: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

export type TeacherInput = Omit<Teacher, 'id' | 'created_at' | 'updated_at'>;