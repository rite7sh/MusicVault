import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import { loadCurrentUser } from "./store/slices/authSlice";

import Auth from "./pages/Auth";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * AuthProvider (LocalStorage-based)
 * ---------------------------------
 * Loads the current user from localStorage into Redux when the app starts.
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
};

/**
 * ProtectedRoute
 * --------------
 * Redirects to /auth if no user is logged in.
 */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/auth" replace />;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/songs" replace />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* ✅ Protect all song-related routes */}
              <Route
                path="/songs"
                element={
                  <ProtectedRoute>
                    <Songs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-song"
                element={
                  <ProtectedRoute>
                    <AddSong />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-song/:id"
                element={
                  <ProtectedRoute>
                    <EditSong />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
