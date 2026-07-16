# Ethiopian Teacher Rostering System

A modern, smart web application for managing Ethiopian teacher rosters with simple interface and powerful features.

## 🎯 Features

- ✨ **Teacher Profile Management** - Add, edit, view, and delete teacher information
- 🔍 **Smart Search & Filter** - Find teachers by name, subject, school, or region
- 📸 **Profile Pictures** - Upload and manage teacher profile images
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication** - Built with Supabase for data security
- 🚀 **Real-time Updates** - Instant data synchronization across sessions
- 📊 **Teacher Statistics** - Overview of teachers by region, subject, and school

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI Components:** shadcn/ui + Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **File Storage:** Supabase Storage
- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form + Zod Validation

## 📋 Quick Start

### Installation

```bash
npm install
# or
bun install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🗄️ Database Schema

### Teachers Table

```sql
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  phone_number VARCHAR,
  email VARCHAR UNIQUE NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  school_name VARCHAR,
  region VARCHAR NOT NULL,
  qualifications TEXT,
  biography TEXT,
  profile_image_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── teacher/
│   │   ├── TeacherList.tsx
│   │   ├── TeacherForm.tsx
│   │   ├── TeacherProfile.tsx
│   │   ├── TeacherCard.tsx
│   │   └── ImageUploader.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   └── common/
│       ├── SearchBar.tsx
│       ├── FilterPanel.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── utils.ts            # Utility functions
│   └── types.ts            # TypeScript types
├── hooks/
│   ├── useTeachers.ts      # Teachers data hook
│   ├── useSearch.ts        # Search hook
│   └── useFilter.ts        # Filter hook
├── pages/
│   ├── Dashboard.tsx
│   ├── TeachersList.tsx
│   ├── TeacherDetail.tsx
│   ├── AddTeacher.tsx
│   └── EditTeacher.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🚀 How to Create a Roster

### Step 1: Access the Application

1. Navigate to the application home page
2. Sign in with your Supabase credentials

### Step 2: Add a New Teacher

**Method 1: Quick Add Button**
- Click the "+ Add Teacher" button in the header
- Fill in the teacher details:
  - **Name** (required)
  - **Email** (required, unique)
  - **Phone Number** (optional)
  - **Region** (required - select from dropdown)
  - **School Name** (optional)
  - **Subjects** (add multiple subjects)
  - **Qualifications** (optional)
  - **Biography** (optional)
  - **Profile Picture** (optional)

**Method 2: Bulk Import**
- Use the import feature to add multiple teachers at once
- Prepare a CSV file with teacher data
- Upload and map fields accordingly

### Step 3: Organize Your Roster

**Search Teachers**
- Use the search bar to find teachers by name
- Results update in real-time as you type

**Filter Teachers**
- **By Region:** Select region from dropdown
- **By School:** Filter by school name
- **By Subject:** Select subject tags
- **Combine Filters:** Apply multiple filters simultaneously

**Sort Teachers**
- By Name (A-Z or Z-A)
- By Date Added (newest or oldest)
- By Region (alphabetical)

### Step 4: Manage Teachers

**View Profile**
- Click on any teacher card to see full details
- View all information including biography and qualifications

**Edit Teacher**
- Click "Edit" button on teacher card or profile
- Update any information
- Changes are saved automatically

**Delete Teacher**
- Click "Delete" button on teacher card
- Confirm deletion in the popup dialog

### Step 5: Export Roster

**Export as CSV**
- Click "Export" button in the header
- Choose format (CSV, Excel, PDF)
- Download your roster for reports

**Print Roster**
- Click "Print" button
- Select print options
- Save as PDF or print directly

## 📝 Supabase Setup

### 1. Create a Supabase Project

- Go to [supabase.com](https://supabase.com)
- Create a new project
- Note your Project URL and API Key

### 2. Create Teachers Table

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(255) UNIQUE NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  school_name VARCHAR(255),
  region VARCHAR(100) NOT NULL,
  qualifications TEXT,
  biography TEXT,
  profile_image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_teachers_email ON teachers(email);
CREATE INDEX idx_teachers_region ON teachers(region);
CREATE INDEX idx_teachers_school ON teachers(school_name);
CREATE INDEX idx_teachers_name ON teachers(name);
```

### 3. Enable RLS (Row Level Security)

```sql
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read
CREATE POLICY "Allow all authenticated to read"
  ON teachers FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert their own records
CREATE POLICY "Allow authenticated to insert"
  ON teachers FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated to update"
  ON teachers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated to delete"
  ON teachers FOR DELETE
  TO authenticated
  USING (true);
```

### 4. Setup Storage Bucket for Images

```sql
INSERT INTO storage.buckets (id, name, public)
  VALUES ('teacher-profiles', 'teacher-profiles', true);

CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'teacher-profiles');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'teacher-profiles');

CREATE POLICY "Authenticated users can update own uploads"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'teacher-profiles')
  WITH CHECK (bucket_id = 'teacher-profiles');
```

### 5. Configure Environment Variables

Create a `.env.local` file:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📖 API Endpoints

### Teachers

- `GET /teachers` - List all teachers (with search/filter)
- `GET /teachers/:id` - Get specific teacher
- `POST /teachers` - Add new teacher
- `PUT /teachers/:id` - Update teacher
- `DELETE /teachers/:id` - Delete teacher

### Images

- `POST /upload-image` - Upload profile image
- `DELETE /delete-image/:filename` - Delete image

## 🧪 Usage Examples

### Adding a Teacher

```typescript
const { data, error } = await supabase
  .from('teachers')
  .insert([
    {
      name: 'Abebe Kebede',
      email: 'abebe@school.edu.et',
      phone_number: '+251-9-12-345-678',
      region: 'Addis Ababa',
      school_name: 'Ethiopian Secondary School',
      subjects: ['Mathematics', 'Physics'],
      qualifications: 'B.Sc Mathematics',
      biography: 'Experienced teacher with 10 years in education',
    }
  ])
  .select();
```

### Searching Teachers

```typescript
const { data, error } = await supabase
  .from('teachers')
  .select('*')
  .ilike('name', `%${searchTerm}%`)
  .eq('region', selectedRegion);
```

### Uploading Profile Image

```typescript
const { data, error } = await supabase.storage
  .from('teacher-profiles')
  .upload(`${teacherId}/profile.jpg`, file);
```

## 🎨 Customization

### Adding New Regions

Edit the region list in `src/lib/constants.ts`:

```typescript
export const ETHIOPIAN_REGIONS = [
  'Addis Ababa',
  'Dire Dawa',
  'Oromia',
  'Amhara',
  'Somali',
  'Tigray',
  // ... more regions
];
```

### Customizing Colors

Edit `src/index.css` for color variables:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    --primary: 0 84.2% 60.2%;
    /* ... more colors */
  }
}
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your needs.

---

**Built with ❤️ for Ethiopian Education System**
