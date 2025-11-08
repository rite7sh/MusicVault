import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 🔹 Extended Song interface (compatible with Lovable’s UI + your local logic)
export interface Song {
  id: string;
  title: string;
  singer: string;
  album?: string | null;
  year: number;
  duration?: number | null;
  audio_url?: string | null;
  cover_image_url?: string | null;
  userEmail: string; // ✅ identifies which user owns the song
}

// 🔹 Redux state
interface SongsState {
  songs: Song[];
  currentlyPlaying: string | null;
}

const initialState: SongsState = {
  songs: [],
  currentlyPlaying: null,
};

// 🔹 Helper function for localStorage access
const getAllSongs = (): Song[] => {
  try {
    return JSON.parse(localStorage.getItem("songs") || "[]");
  } catch {
    return [];
  }
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // ✅ Add a new song (persisted per user)
    addSong: (state, action: PayloadAction<Song>) => {
      const allSongs = getAllSongs();
      const updatedSongs = [...allSongs, action.payload];
      localStorage.setItem("songs", JSON.stringify(updatedSongs));
      state.songs = updatedSongs.filter(
        (s) => s.userEmail === action.payload.userEmail
      );
    },

    // ✅ Edit an existing song
    editSong: (state, action: PayloadAction<Song>) => {
      const allSongs = getAllSongs();
      const updatedSongs = allSongs.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      localStorage.setItem("songs", JSON.stringify(updatedSongs));
      state.songs = updatedSongs.filter(
        (s) => s.userEmail === action.payload.userEmail
      );
    },

    // ✅ Delete a song by id (for the current user)
    deleteSong: (
      state,
      action: PayloadAction<{ id: string; userEmail: string }>
    ) => {
      const allSongs = getAllSongs();
      const updatedSongs = allSongs.filter((s) => s.id !== action.payload.id);
      localStorage.setItem("songs", JSON.stringify(updatedSongs));
      state.songs = updatedSongs.filter(
        (s) => s.userEmail === action.payload.userEmail
      );
    },

    // ✅ Load songs for the logged-in user
    loadSongs: (state, action: PayloadAction<{ userEmail: string }>) => {
      const allSongs = getAllSongs();
      state.songs = allSongs.filter(
        (s) => s.userEmail === action.payload.userEmail
      );
    },

    // ✅ Set the currently playing song (for play UI)
    setCurrentlyPlaying: (state, action: PayloadAction<string | null>) => {
      state.currentlyPlaying = action.payload;
    },
  },
});

// 🔹 Export actions + reducer
export const {
  addSong,
  editSong,
  deleteSong,
  loadSongs,
  setCurrentlyPlaying,
} = songsSlice.actions;

export default songsSlice.reducer;
