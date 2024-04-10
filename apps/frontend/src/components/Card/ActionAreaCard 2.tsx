import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface ActionAreaCardProps {
  title: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ title }) => {
  return (
    <Card sx={{ maxWidth: "20vw" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="../ServiceRequests/GiftRequest/media/rose.jpg"
          alt="rose"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Roses!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
