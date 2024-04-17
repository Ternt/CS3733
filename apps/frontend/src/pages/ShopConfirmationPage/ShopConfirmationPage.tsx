import {
    Box,
    Typography,
    Link
} from '@mui/material';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
type ShopConfirmationPageProps = {
    returnPath: string
}

function ShopConfirmationPage(props: ShopConfirmationPageProps) {
    return (
      <Box
        sx={{
          width:1,
          height:'90vh',
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
      }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p:"2rem",
            boxShadow:5,
            borderRadius:'2rem',
          }}
        >
          {props.returnPath === "/gift-request" && <ShoppingBasketIcon
            sx={{
              fontSize: '20vw',
              marginBottom: 2,
              color:"#012d5a",
              filter:"drop-shadow(2px 5px 2px #000000a0)",
            }}
          />}
          {props.returnPath === "/flower-request" && <LocalFloristIcon
              sx={{
                fontSize: '20vw',
                marginBottom: 2,
                color:"#012d5a",
                filter:"drop-shadow(2px 5px 2px #000000a0)",
              }}
          />}
          <Typography variant="h3" sx={{textAlign:'center'}} gutterBottom>
            Your order is on its way!
          </Typography>
          <Typography variant={"h6"} sx={{textAlign:'center'}}>
            <Link href={props.returnPath}>Continue shopping</Link> or
            <Link href="/"> return home</Link>
          </Typography>
        </Box>
      </Box>

    );
}

export default ShopConfirmationPage;
