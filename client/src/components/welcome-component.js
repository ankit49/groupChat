import React from "react";
import { Box } from "@mui/material";
import botImage from "../assets/images/bot.png";

const WelcomeComponent = (props) => {
  return (
    <Box
      align="center"
      sx={{ color: "#e0e0e0", height: "calc( 100vh - 30px )" }}
    >
      <img
        src={botImage}
        alt="bot"
        style={{
          width: "50%",
          height: { xs: "20%", md: "40%" },
          position: "absolute",
          bottom: "0px",
          left: "50%",
          transform: "translate(-50%, -0%)",
          margin: "0 auto",
        }}
      />
    </Box>
  );
};
export default WelcomeComponent;
