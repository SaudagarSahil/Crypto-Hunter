import React from "react";
import { Container, Typography } from "@mui/material";
import banner from "../assets/images/banner.jpg";
import Carousel from "./Carousel";

const Banner: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        width: "100vw",
        height: "90vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Typography sx={{ color: "gold" }} variant="h2">
            Crypto Hunter
          </Typography>
          <Typography variant="h6">
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
