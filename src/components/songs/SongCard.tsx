import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { PlayArrow, Pause, Edit, Delete, Album } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Song } from "@/store/slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentlyPlaying } from "@/store/slices/songsSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

interface SongCardProps {
  song: Song;
  onDelete: (id: string) => void;
}

const SongCard = ({ song, onDelete }: SongCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentlyPlaying = useSelector(
    (state: RootState) => state.songs.currentlyPlaying
  );
  const isPlaying = currentlyPlaying === song.id;

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlay = () => {
    const audioEl = document.getElementById(
      `audio-${song.id}`
    ) as HTMLAudioElement | null;

    if (!audioEl) return;

    if (isPlaying) {
      audioEl.pause();
      dispatch(setCurrentlyPlaying(null));
    } else {
      const allAudios = document.querySelectorAll("audio");
      allAudios.forEach((a) => a.pause());
      audioEl.play();
      dispatch(setCurrentlyPlaying(song.id));
    }
  };

  useEffect(() => {
    const audioEl = document.getElementById(
      `audio-${song.id}`
    ) as HTMLAudioElement | null;

    if (!audioEl) return;

    const updateProgress = () => {
      if (!audioEl.duration) return;
      setProgress((audioEl.currentTime / audioEl.duration) * 100);
      setCurrentTime(audioEl.currentTime);
    };

    audioEl.addEventListener("timeupdate", updateProgress);
    return () => audioEl.removeEventListener("timeupdate", updateProgress);
  }, [song.id]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioEl = document.getElementById(
      `audio-${song.id}`
    ) as HTMLAudioElement | null;

    if (audioEl && audioEl.duration) {
      const newTime = (Number(e.target.value) / 100) * audioEl.duration;
      audioEl.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card
      sx={{
        background: "linear-gradient(145deg, hsl(240 8% 14%), hsl(240 8% 10%))",
        borderRadius: "16px",
        border: "1px solid hsl(240 6% 20%)",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px hsl(271 91% 65% / 0.2)",
          borderColor: "hsl(271 91% 65% / 0.5)",
        },
      }}
    >
      {/* ✅ Album Cover */}
      <Box
        sx={{
          position: "relative",
          paddingTop: "100%",
          background: song.cover_image_url
            ? `url(${song.cover_image_url})`
            : "linear-gradient(135deg, hsl(271 91% 65% / 0.3), hsl(190 95% 55% / 0.3))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
        }}
      >
        {!song.cover_image_url && (
          <Album
            sx={{ position: "absolute", fontSize: 80, color: "hsl(0 0% 30%)" }}
          />
        )}

        {/* ✅ Play / Pause Button */}
        <IconButton
          onClick={handlePlay}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: isPlaying
              ? "hsl(190 95% 55%)"
              : "hsl(271 91% 65%)",
            color: "white",
            width: 60,
            height: 60,
            opacity: 0.9,
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 1,
              transform: "translate(-50%, -50%) scale(1.1)",
              boxShadow: isPlaying
                ? "var(--glow-secondary)"
                : "var(--glow-primary)",
            },
          }}
        >
          {isPlaying ? (
            <Pause sx={{ fontSize: 32 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 32 }} />
          )}
        </IconButton>

        {/* ✅ Seeker (Only Visible When Playing) */}
        {isPlaying && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              p: 1.2,
              bgcolor: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              transition: "opacity 0.4s ease",
            }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              style={{
                width: "100%",
                height: "5px",
                appearance: "none",
                background: `linear-gradient(90deg, hsl(271 91% 65%) ${progress}%, hsl(240 6% 20%) ${progress}%)`,
                borderRadius: "8px",
                cursor: "pointer",
                outline: "none",
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "hsl(0 0% 70%)",
                fontSize: "0.75rem",
                mt: 0.4,
              }}
            >
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(song.duration)}</span>
            </Box>
          </Box>
        )}
      </Box>

      {/* ✅ Song Details */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: "hsl(0 0% 98%)",
            fontWeight: 700,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {song.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "hsl(0 0% 70%)", mb: 1 }}>
          {song.singer}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "hsl(0 0% 50%)" }}>
            {song.album || "No Album"}
          </Typography>
          <Typography variant="caption" sx={{ color: "hsl(0 0% 50%)" }}>
            {song.year}
          </Typography>
        </Box>
      </CardContent>

      {/* ✅ Edit / Delete Buttons */}
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <IconButton
          onClick={() => navigate(`/edit-song/${song.id}`)}
          sx={{
            color: "hsl(190 95% 55%)",
            "&:hover": { backgroundColor: "hsl(190 95% 55% / 0.1)" },
          }}
        >
          <Edit />
        </IconButton>

        <IconButton
          onClick={() => onDelete(song.id)}
          sx={{
            color: "hsl(0 84% 60%)",
            "&:hover": { backgroundColor: "hsl(0 84% 60% / 0.1)" },
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>

      {/* ✅ Hidden Audio Player */}
      <audio
        id={`audio-${song.id}`}
        src={song.audio_url || ""}
        preload="auto"
        onEnded={() => {
          dispatch(setCurrentlyPlaying(null));
          setProgress(0);
          setCurrentTime(0);
        }}
        style={{ display: "none" }}
      />
    </Card>
  );
};

export default SongCard;
