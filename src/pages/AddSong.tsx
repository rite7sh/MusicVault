import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addSong } from "@/store/slices/songsSlice";
import { v4 as uuidv4 } from "uuid";

const AddSong = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    title: "",
    singer: "",
    album: "",
    year: new Date().getFullYear(),
    duration: "",
    audio_url: "",
    cover_image_url: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in.");

    const newSong = {
      id: uuidv4(),
      title: formData.title,
      singer: formData.singer,
      album: formData.album || "",
      year: Number(formData.year),
      duration: formData.duration ? Number(formData.duration) : undefined,
      audio_url: formData.audio_url || "",
      cover_image_url: formData.cover_image_url || "",
      userEmail: user.email,
    };

    dispatch(addSong(newSong));
    alert("Song added successfully!");
    navigate("/songs");
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/songs")}
          sx={{
            color: "hsl(0 0% 98%)",
            mb: 3,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "hsl(240 6% 18%)",
            },
          }}
        >
          Back to Library
        </Button>

        <Paper
          sx={{
            background:
              "linear-gradient(145deg, hsl(240 8% 14%), hsl(240 8% 10%))",
            borderRadius: "24px",
            padding: 4,
            border: "1px solid hsl(240 6% 20%)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "hsl(0 0% 98%)", fontWeight: 700, mb: 1 }}
          >
            Add New Song
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "hsl(0 0% 70%)", mb: 4 }}
          >
            Fill in the details to add a song to your collection
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {["title", "singer", "album", "year", "duration", "audio_url", "cover_image_url"].map(
              (field, i) => (
                <TextField
                  key={i}
                  fullWidth
                  required={["title", "singer", "year"].includes(field)}
                  type={
                    field === "year" || field === "duration" ? "number" : "text"
                  }
                  label={
                    field
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())
                  }
                  value={formData[field as keyof typeof formData]}
                  onChange={(e) =>
                    handleChange(field, e.target.value as string | number)
                  }
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "hsl(240 6% 18%)",
                      "& fieldset": {
                        borderColor: "hsl(240 6% 20%)",
                      },
                      "&:hover fieldset": {
                        borderColor: "hsl(271 91% 65%)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "hsl(271 91% 65%)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "hsl(0 0% 70%)",
                    },
                    "& .MuiInputBase-input": {
                      color: "hsl(0 0% 98%)",
                    },
                  }}
                />
              )
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<Save />}
              sx={{
                background: "var(--gradient-primary)",
                color: "white",
                padding: "14px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "12px",
                boxShadow: "var(--glow-primary)",
                "&:hover": {
                  background: "var(--gradient-primary)",
                  boxShadow:
                    "var(--glow-primary), 0 4px 12px hsl(271 91% 65% / 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Add Song
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddSong;
