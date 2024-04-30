import Spline from '@splinetool/react-spline';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";

export default function Wongprism() {
  return (
    <Box
      sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
      }}
    >
      <Typography variant={"h2"}>And a special thanks to Prof. Wong!</Typography>
      <Spline scene="https://prod.spline.design/Ow8nMPwsO26ONVlf/scene.splinecode" />
    </Box>
  );
}
