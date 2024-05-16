import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cardStyle = {
  height: "200px",
  width: { xs: "100%", md: "20%" },
  border: "0.5px solid #EDEDED",
  borderRadius: 3,
  "&:hover": {
    transform: "scale(1.02)",
  },
  cursor: "pointer",
  paddingX: 1.5,
  paddingY: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  textAlign: "left",
  boxShadow: 3,
  bgcolor: "#F8F8F8",
};

const CardItem = (props) => {
  const { cardDetails } = props;
  const { heading, image, cardText, path } = cardDetails;
  const navigate = useNavigate();
  return (
    <Card raised sx={cardStyle} onClick={() => navigate(`${path}`)}>
      <Typography variant="h6" fontWeight={600} sx={{fontSize: "16px", textAlign:"center"}}>
        {heading}
      </Typography>
      <Divider orientation="horizontal" />
      <CardContent sx={{ textAlign: "center", px:0, py:3 }}>
        {image !== null && (
          <img src={image} alt="card-image" width={60} height={60} />
        )}
        <Typography sx={{fontSize: "14px", mt: 1}}>{cardText}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
