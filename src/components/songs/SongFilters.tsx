import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Slider, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SongFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterSinger: string;
  setFilterSinger: (value: string) => void;
  filterLetter: string;
  setFilterLetter: (value: string) => void;
  yearRange: [number, number];
  setYearRange: (value: [number, number]) => void;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SongFilters = ({
  searchTerm,
  setSearchTerm,
  filterSinger,
  setFilterSinger,
  filterLetter,
  setFilterLetter,
  yearRange,
  setYearRange,
}: SongFiltersProps) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(145deg, hsl(240 8% 14%), hsl(240 8% 10%))',
        borderRadius: '16px',
        padding: 3,
        marginBottom: 4,
        border: '1px solid hsl(240 6% 20%)',
      }}
    >
      <Typography variant="h6" sx={{ color: 'hsl(0 0% 98%)', mb: 3, fontWeight: 600 }}>
        Filters & Search
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by title or singer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'hsl(0 0% 70%)', mr: 1 }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'hsl(240 6% 18%)',
              '& fieldset': { borderColor: 'hsl(240 6% 20%)' },
              '&:hover fieldset': { borderColor: 'hsl(271 91% 65%)' },
              '&.Mui-focused fieldset': { borderColor: 'hsl(271 91% 65%)' },
            },
            '& .MuiInputBase-input': { color: 'hsl(0 0% 98%)' },
          }}
        />

        <TextField
          fullWidth
          placeholder="Filter by singer..."
          value={filterSinger}
          onChange={(e) => setFilterSinger(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'hsl(240 6% 18%)',
              '& fieldset': { borderColor: 'hsl(240 6% 20%)' },
              '&:hover fieldset': { borderColor: 'hsl(271 91% 65%)' },
              '&.Mui-focused fieldset': { borderColor: 'hsl(271 91% 65%)' },
            },
            '& .MuiInputBase-input': { color: 'hsl(0 0% 98%)' },
          }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: 'hsl(0 0% 70%)' }}>Filter by Letter</InputLabel>
          <Select
            value={filterLetter}
            onChange={(e) => setFilterLetter(e.target.value)}
            label="Filter by Letter"
            sx={{
              backgroundColor: 'hsl(240 6% 18%)',
              color: 'hsl(0 0% 98%)',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(240 6% 20%)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(271 91% 65%)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(271 91% 65%)' },
              '& .MuiSvgIcon-root': { color: 'hsl(0 0% 70%)' },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'hsl(240 8% 12%)',
                  border: '1px solid hsl(240 6% 20%)',
                  '& .MuiMenuItem-root': {
                    color: 'hsl(0 0% 98%)',
                    '&:hover': { backgroundColor: 'hsl(240 6% 18%)' },
                    '&.Mui-selected': { backgroundColor: 'hsl(271 91% 65% / 0.2)' },
                  },
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {alphabet.map((letter) => (
              <MenuItem key={letter} value={letter}>
                {letter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ px: 1 }}>
        <Typography variant="body2" sx={{ color: 'hsl(0 0% 70%)', mb: 2 }}>
          Year Range: {yearRange[0]} - {yearRange[1]}
        </Typography>
        <Slider
          value={yearRange}
          onChange={(_e, newValue) => setYearRange(newValue as [number, number])}
          min={1950}
          max={2024}
          valueLabelDisplay="auto"
          sx={{
            color: 'hsl(271 91% 65%)',
            '& .MuiSlider-thumb': {
              backgroundColor: 'hsl(271 91% 65%)',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: 'var(--glow-primary)',
              },
            },
            '& .MuiSlider-track': {
              background: 'var(--gradient-primary)',
            },
            '& .MuiSlider-rail': {
              backgroundColor: 'hsl(240 6% 20%)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SongFilters;
