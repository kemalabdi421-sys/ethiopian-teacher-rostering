import { Teacher } from '../types/teacher';

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Abebe Bikila',
    phone_number: '+251 911 123 456',
    email: 'abebe.b@edu.et',
    subjects: ['Mathematics', 'Physics'],
    school_name: 'Bole Secondary School',
    region: 'Addis Ababa',
    qualifications: 'MSc in Theoretical Physics, Addis Ababa University',
    biography: 'Dedicated educator with over 15 years of experience in teaching advanced mathematics and physics. Passionate about empowering the next generation of Ethiopian scientists.',
    profile_image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8ecf82f4-c648-4f32-be0b-0b0473e7aae2/teacher-male-1-ece7f19a-1776560462993.webp',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Selamawit Tadesse',
    phone_number: '+251 922 987 654',
    email: 'selam.t@school.et',
    subjects: ['Biology', 'Chemistry'],
    school_name: 'Hawassa Comprehensive School',
    region: 'Sidama',
    qualifications: 'BSc in Biology, Hawassa University',
    biography: 'Specializes in cellular biology and environmental science. Selamawit has led several community initiatives for sustainable farming education.',
    profile_image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8ecf82f4-c648-4f32-be0b-0b0473e7aae2/teacher-female-1-499b6ed8-1776560462147.webp',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Kassa Tekle',
    phone_number: '+251 933 456 789',
    email: 'kassa.t@un.et',
    subjects: ['History', 'Geography'],
    school_name: 'Fasiledes Secondary School',
    region: 'Amhara',
    qualifications: 'BA in Ethiopian History, University of Gondar',
    biography: 'Expert in Aksumite and Solomonic dynasties. Kassa brings history to life through storytelling and field trips to historical sites.',
    profile_image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8ecf82f4-c648-4f32-be0b-0b0473e7aae2/teacher-male-2-aecc3587-1776560461543.webp',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Marta Hailu',
    phone_number: '+251 944 111 222',
    email: 'marta.h@edu.et',
    subjects: ['English Literature', 'Amharic'],
    school_name: 'Adama Science and Technology Academy',
    region: 'Oromia',
    qualifications: 'MA in Linguistics, Jimma University',
    biography: 'Marta is a multilingual educator focused on literacy and communication skills. She runs a popular after-school reading club.',
    profile_image_url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8ecf82f4-c648-4f32-be0b-0b0473e7aae2/teacher-female-2-4342c323-1776560462590.webp',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];