# MusicVault

MusicVault is a simple, modern web application built with React, TypeScript, Redux Toolkit, and Supabase.  
It allows users to create and manage their personal music collection.  
Each user can sign up, log in, and maintain a unique set of songs stored in the browser.

---

## Features

- User authentication with signup and login
- Add, edit, and delete songs with details such as title, artist, album, and year
- Store user-specific songs locally (persistent via browser local storage)
- Upload or link to album artwork and audio files
- Filter and search songs by title, artist, or year range
- Responsive interface built with Material UI and Tailwind
- Clean and minimal design with smooth user experience

---

## Technology Stack

- **Frontend Framework:** React (TypeScript)
- **State Management:** Redux Toolkit
- **Database / Auth:** Supabase (for login/signup)
- **UI Components:** Material UI (MUI)
- **Form Validation:** Zod + React Hook Form
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom theme

---

## Folder Structure

```
MusicVault/
│
├── public/                # Static files (favicon, images, music)
│
├── src/
│   ├── components/        # Reusable UI components (SongCard, SongFilters, etc.)
│   ├── pages/             # Page-level components (Songs, AddSong, EditSong, Auth)
│   ├── store/             # Redux slices and store setup
│   ├── integrations/      # Supabase configuration
│   ├── hooks/             # Custom React hooks
│   ├── assets/            # Optional assets or styles
│   ├── main.tsx           # Application entry point
│   └── App.tsx            # Routing and layout
│
└── package.json           # Project dependencies and scripts
```

---

## How to Run Locally

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or later)
- npm or yarn

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/MusicVault.git
   cd MusicVault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at:
   ```
   http://localhost:5173/
   ```

---

## Building for Production

To build an optimized production version:
```bash
npm run build
```

The output will be generated in the `dist` directory.  
You can then deploy this folder to any static hosting service (Vercel, Netlify, etc.).

---

## Deployment

### Option 1 – Vercel
1. Push your project to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and import your repository.
3. Build command: `npm run build`
4. Output directory: `dist`

### Option 2 – Netlify
1. Run `npm run build`
2. Drag and drop the generated `dist` folder to [https://app.netlify.com/drop](https://app.netlify.com/drop)

---

## Future Improvements

- Add cloud storage integration for uploaded songs
- Implement a shared playlist feature
- Include waveform visualization or audio analysis
- Dark/light theme toggle
- Add a mobile-friendly player control bar

---

## Author

**Ritesh Tripathi**  
Built as part of a front-end development project using React and TypeScript.
