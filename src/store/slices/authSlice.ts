import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Signup (stores user in localStorage)
    signup: (state, action: PayloadAction<User>) => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const alreadyExists = existingUsers.some(
        (u: User) => u.email === action.payload.email
      );

      if (alreadyExists) {
        alert("User already exists with this email. Please login instead.");
        return;
      }

      const updatedUsers = [...existingUsers, action.payload];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isLoggedIn = true;
      alert("Signup successful!");
    },

    // ✅ Login (verifies credentials)
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const matchedUser = existingUsers.find(
        (u: User) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        state.user = matchedUser;
        state.isLoggedIn = true;
        alert(`Welcome back, ${matchedUser.name}!`);
      } else {
        alert("Invalid email or password. Please try again.");
        state.isLoggedIn = false;
      }
    },

    // ✅ Logout (clear current user)
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("currentUser");
      alert("Logged out successfully!");
    },

    // ✅ Load user on app start
    loadCurrentUser: (state) => {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        state.user = JSON.parse(stored);
        state.isLoggedIn = true;
      }
    },
  },
});

export const { signup, login, logout, loadCurrentUser } = authSlice.actions;
export default authSlice.reducer;
