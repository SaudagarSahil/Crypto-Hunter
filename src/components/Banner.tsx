import React from "react";
import { Container, Typography } from "@mui/material";
import banner from "../assets/images/banner.jpg";
import Carousel from "./Carousel";

const Banner: React.FC = () => {
  return (
    <div
      style={{
        // backgroundImage: `url(${require("../assets/images/banner.jpg")})`,
        backgroundImage: `url(${banner})`,
        // width: "100vw",
        // height: "50vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div>
          <Typography variant="h2">Crypto Hunter</Typography>
          <Typography variant="subtitle2">
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;