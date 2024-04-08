import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Typography } from "@mui/material";
import { Item } from "../../pages/GiftRequestPage/GiftRequestPage.tsx";

type CardProps = {
  id: string;
  imageURL: string;
  title: string;
  price: string;
  description: string;
  handleAdd: (item: Item) => void;
};

function ItemCard(props: CardProps) {
  function getItem(): Item {
    return {
      id: props.id,
      imageURL: props.imageURL,
      name: props.title,
      price: parseInt(props.price),
      description: props.description,
    };
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: "30%",
        height: "fit-content",
        bgcolor: "#FFFFFF",
        m: 2,
        pb: 1.5,
      }}
    >
      <CardMedia
        sx={{
          width: "fill-available",
          aspectRatio: "1/1",
        }}
        component="img"
        image={props.imageURL}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            px: 1,
            pt: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography variant="h6" color="text.secondary" textAlign={"left"}>
              {props.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" textAlign={"right"}>
              {props.price.toString()}
            </Typography>
          </Box>

          <Typography
            color="text.secondary"
            textAlign={"left"}
            sx={{
              maxHeight: "1vw",
            }}
          >
            {props.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="secondary"
          onClick={() => props.handleAdd(getItem())}
        >
          Add Item
        </Button>
      </CardActions>
    </Card>
  );
}

export default ItemCard;
