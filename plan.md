
## Plan for Ethiopian Teacher Roster Project

**Objective:** Develop a comprehensive web application for managing a roster of Ethiopian teachers.

**Core Features:**
1.  **Teacher Profile Management:**
    *   Add new teachers with details: Name, contact (phone, email), subjects taught, school name, region, qualifications, biography.
    *   View a list of all teachers.
    *   View individual teacher profiles.
    *   Edit existing teacher profiles.
    *   Delete teacher profiles.
2.  **Search and Filtering:**
    *   Allow users to search for teachers by name.
    *   Allow users to filter teachers by subject, school, or region.
3.  **Image Handling:**
    *   Option to upload a profile picture for each teacher.
    *   Display placeholder images if no picture is uploaded.

**Technology Stack:**
*   **Backend:** Supabase (for database, authentication, and potentially serverless functions)
*   **Frontend:** A modern JavaScript framework (e.g., React, Vue, or Svelte) for the user interface.

**Database Schema (`teachers` table):**
*   `id`: UUID (Primary Key)
*   `name`: VARCHAR (Not Null)
*   `phone_number`: VARCHAR
*   `email`: VARCHAR (Unique, Not Null)
*   `subjects`: ARRAY of VARCHAR
*   `school_name`: VARCHAR
*   `region`: VARCHAR
*   `qualifications`: TEXT
*   `biography`: TEXT
*   `profile_image_url`: VARCHAR (URL to the image in Supabase Storage)
*   `created_at`: TIMESTAMP WITH TIME ZONE
*   `updated_at`: TIMESTAMP WITH TIME ZONE

**API Endpoints (to be implemented via Supabase Edge Functions or Supabase client library):**
*   `POST /teachers`: Add a new teacher.
*   `GET /teachers`: Get a list of teachers (supports query parameters for search/filter).
*   `GET /teachers/{id}`: Get details of a specific teacher.
*   `PUT /teachers/{id}`: Update details of a specific teacher.
*   `DELETE /teachers/{id}`: Delete a specific teacher.
*   `POST /upload-image`: Endpoint for uploading teacher profile images to Supabase Storage.

**Frontend Components:**
*   `TeacherList`: Displays the roster with search/filter bar.
*   `TeacherForm`: Handles adding and editing teacher information.
*   `TeacherProfile`: Displays detailed information for a single teacher.
*   `ImageUploader`: Component for uploading profile images.

**Implementation Steps:**
1.  **Setup Supabase Project:** Initialize Supabase, create the `teachers` table, and configure RLS policies.
2.  **Backend Development:** Implement API endpoints using Supabase Edge Functions or client-side data fetching with appropriate permissions. Implement image upload functionality.
3.  **Frontend Development:** Build the UI components, integrate with Supabase, and implement search/filter logic.
4.  **Image Generation:** Use `generate_images_bulk` for placeholder images if needed.
5.  **Testing:** Unit and integration tests.
6.  **Deployment:** Deploy the application.
