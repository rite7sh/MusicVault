import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Tab, Tabs } from '@mui/material';
import { MusicNote } from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SignUpForm from '@/components/auth/SignUpForm';
import LoginForm from '@/components/auth/LoginForm';

const Auth = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate('/songs');
    }
  }, [user, navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, hsl(240 10% 7%) 0%, hsl(240 15% 5%) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, hsl(271 91% 65% / 0.1) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            background: 'linear-gradient(145deg, hsl(240 8% 14%), hsl(240 8% 10%))',
            borderRadius: '24px',
            padding: '48px',
            backdropFilter: 'blur(10px)',
            border: '1px solid hsl(240 6% 20%)',
            boxShadow: '0 20px 60px hsl(271 91% 65% / 0.2)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                marginBottom: 2,
                boxShadow: 'var(--glow-primary)',
              }}
            >
              <MusicNote sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 1,
              }}
            >
              MusicVault
            </Typography>
            <Typography variant="body1" sx={{ color: 'hsl(0 0% 70%)' }}>
              Your personal music collection
            </Typography>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              marginBottom: 4,
              '& .MuiTab-root': {
                color: 'hsl(0 0% 70%)',
                fontWeight: 600,
                fontSize: '16px',
                textTransform: 'none',
                '&.Mui-selected': {
                  color: 'hsl(271 91% 65%)',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'hsl(271 91% 65%)',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab label="Sign Up" />
            <Tab label="Login" />
          </Tabs>

          {tabValue === 0 ? <SignUpForm /> : <LoginForm />}
        </Box>
      </Container>
    </Box>
  );
};

export default Auth;
