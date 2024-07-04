// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';


// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between', // Esto asegura que los elementos se distribuyan a lo largo del contenedor
      alignItems: 'center', // Esto alinea los elementos verticalmente al centro
      width: '100%',
      ml: 1,
    }}
  >
    {/* Este elemento empuja los elementos siguientes al final */}
    {downLG && <Box sx={{ flex: 1 }} />} 
    {!downLG && <Profile />}
    {downLG && <MobileSection />}
  </Box>
);
}
