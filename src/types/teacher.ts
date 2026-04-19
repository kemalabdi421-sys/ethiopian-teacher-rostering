export type Region = 
  | 'Addis Ababa' 
  | 'Afar' 
  | 'Amhara' 
  | 'Benishangul-Gumuz' 
  | 'Dire Dawa' 
  | 'Gambela' 
  | 'Harari' 
  | 'Oromia' 
  | 'Sidama' 
  | 'Somali' 
  | 'South West Ethiopia' 
  | 'Southern Nations, Nationalities, and Peoples' 
  | 'Tigray';

export interface Teacher {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  subjects: string[];
  school_name: string;
  region: Region;
  qualifications: string;
  biography: string;
  profile_image_url: string;
  created_at: string;
  updated_at: string;
}