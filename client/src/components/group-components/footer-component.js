import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const FooterComponent = (props) => {
  const [message, setMessage] = useState("");

  const handleUpdateGroupMessage = (e) => {
    e.preventDefault();
    props.handleUpdateGroupMessage(message, props.id);
    setMessage("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: "100px",
          backgroundColor: "#202c33",
          // background:
          //   "linear-gradient(90deg, hsla(210, 72%, 14%, 1) 0%, hsla(209, 45%, 26%, 1) 53%, hsla(210, 45%, 43%, 1) 100%)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          color: "#ffffff",
          padding: "0 20px",
        }}
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
          onSubmit={handleUpdateGroupMessage}
        >
          <TextField
            label="Message"
            multiline
            rows={2}
            sx={{
              height: "80px",
              width: "90%",
              backgroundColor: "#2a3942",
              marginTop: "10px",
              input: { height: "80px", padding: "0 10px" },
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="text"
            type="submit"
            sx={{ width: "10%", margin: "10px 0 0 10px" }}
          >
            <SendIcon />
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};
export default FooterComponent;
