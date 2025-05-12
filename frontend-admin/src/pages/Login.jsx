import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Paper, 
  Box, 
  Typography, 
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Thực hiện login (demo)
      setTimeout(() => {
        // Demo: nếu tài khoản là admin/admin thì cho phép login
        if (formData.username === 'admin' && formData.password === 'admin') {
          localStorage.setItem('token', 'demo-token');
          navigate('/admin');
        } else {
          setError('Tài khoản hoặc mật khẩu không đúng');
        }
        setLoading(false);
      }, 1000);

      // Đoạn code thực tế sẽ gọi API
      // const response = await loginApi(formData);
      // localStorage.setItem('token', response.data.token);
      // navigate('/admin');
    } catch (err) {
      setError('Đăng nhập thất bại: ' + (err.response?.data?.detail || 'Lỗi không xác định'));
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
          elevation={3}
        >
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Đăng nhập'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 