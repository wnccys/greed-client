import Button from '@mui/material/Button';
import LandscapeIcon from '@mui/icons-material/Landscape';
import fileOpenIcon from '@mui/icons-material/FileOpen';
import { AppBar, Box, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import ImageFilter from 'react-image-filter';
import { useState } from 'react';

function App() {
  const [imageFilter, setImageFilter] = useState(undefined);
  const [imageUrl, setImageUrl] = useState('https://source.unsplash.com/RZrIJ8C0860');
}