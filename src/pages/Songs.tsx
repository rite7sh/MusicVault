import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { Add, Logout, MusicNote } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadSongs, deleteSong } from "@/store/slices/songsSlice";
import { logout, loadCurrentUser } from "@/store/slices/authSlice"; // updt the auth in auth.tsx(in the e)
import SongFilters from "@/components/songs/SongFilters";
import SongCard from "@/components/songs/SongCard";

const Songs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { songs } = useSelector((state: RootState) => state.songs);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSinger, setFilterSinger] = useState("");
  const [filterLetter, setFilterLetter] = useState("");
  const [yearRange, setYearRange] = useState<[number, number]>([1950, 2024]);

  // ✅ Load user and their songs on mount
  useEffect(() => {
    dispatch(loadCurrentUser());

    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!storedUser) {
      navigate("/auth");
      return;
    }

    dispatch(loadSongs({ userEmail: storedUser.email }));
  }, [dispatch, navigate]);

  // ✅ Proper Redux-based logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    dispatch(deleteSong({ id, userEmail: user.email }));
    alert("Song deleted successfully!");
  };

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.singer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSinger =
      !filterSinger ||
      song.singer.toLowerCase().includes(filterSinger.toLowerCase());
    const matchesLetter =
      !filterLetter ||
      song.title.toLowerCase().startsWith(filterLetter.toLowerCase());
    const matchesYear =
      song.year >= yearRange[0] && song.year <= yearRange[1];

    return matchesSearch && matchesSinger && matchesLetter && matchesYear;
  });

  return (
    <Box sx={{ minHeight: "100vh", pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, hsl(271 91% 65% / 0.2) 0%, hsl(190 95% 55% / 0.2) 100%)",
          borderBottom: "1px solid hsl(240 6% 20%)",
          py: 3,
          mb: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MusicNote sx={{ color: "white" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "hsl(0 0% 98%)" }}
              >
                My Music Library
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/add-song")}
                sx={{
                  background: "var(--gradient-primary)",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": {
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--glow-primary)",
                  },
                }}
              >
                Add Song
              </Button>

              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  borderColor: "hsl(240 6% 20%)",
                  color: "hsl(0 0% 98%)",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "hsl(271 91% 65%)",
                    backgroundColor: "hsl(271 91% 65% / 0.1)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Filters + Song Cards */}
      <Container maxWidth="xl">
        <SongFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterSinger={filterSinger}
          setFilterSinger={setFilterSinger}
          filterLetter={filterLetter}
          setFilterLetter={setFilterLetter}
          yearRange={yearRange}
          setYearRange={setYearRange}
        />

        {filteredSongs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "hsl(0 0% 70%)" }}>
              No songs yet
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(0 0% 50%)" }}>
              Start adding songs to your collection!
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} onDelete={handleDelete} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Songs;
