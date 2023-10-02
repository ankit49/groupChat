import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const FooterComponent = (props) => {
  const [message, setMessage] = useState("");

  const handleUpdateGroupMessage = (e) => {
    e.preventDefault();
    props.handleUpdateGroupMessage(message, props.id);
    setMessage("");
  };

  return (
    <Box
      sx={{
        height: "100px",
        backgroundColor: "#363636",
        color: "#b6b7b9",
        borderTop: "1px solid #636D6E",
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
            backgroundColor: "#333333",
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
  );
};
export default FooterComponent;
