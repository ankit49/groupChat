import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import HeaderComponent from ".//header-component";
import FooterComponent from "./footer-component";
import bgImage from "../../assets/images/bg.jpg";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split("")[0]}`,
  };
}

const GroupComponent = (props) => {
  const { id } = useParams();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [props]);

  let groupData = props?.groups?.find((group) => group._id === id);

  return (
    groupData && (
      <Box sx={{ height: "100%" }}>
        <HeaderComponent
          groupData={groupData}
          allUsers={props.allUsers}
          handleGroupUpdate={props.handleGroupUpdate}
          handleGroupDelete={props.handleGroupDelete}
        />

        <Box
          sx={{
            height: {
              xs: "calc( 100vh - 192px )",
              md: "calc( 100vh - 162px )",
            },
            overflowY: "auto",
            background: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              padding: "10px",
            }}
          >
            {groupData.messages.map((message) =>
              props.user.email === message.sender.email ? (
                <Box
                  key={message._id}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      marginRight: "20px",
                      marginBottom: "30px",
                      padding: "10px",
                      backgroundColor: "#005c4b",
                      color: "#e0e0e0",
                      width: { xs: "60%", md: "40%" },
                      textAlign: "left",
                      border: "1px solid #005c4b",
                      borderRadius: "10px",
                      "&:after": {
                        content: "''",
                        position: "absolute",
                        width: "0",
                        height: "0",
                        borderTop: "15px solid #005c4b",
                        borderLeft: "15px solid transparent",
                        borderRight: "15px solid transparent",
                        top: "0",
                        right: "-15px",
                      },
                      "&:before": {
                        content: "''",
                        position: "absolute",
                        width: "0",
                        height: "0",
                        borderTop: "17px solid #005c4b",
                        borderLeft: "16px solid transparent",
                        borderRight: "16px solid transparent",
                        top: "-1px",
                        right: "-17px",
                      },
                    }}
                  >
                    {message.content.split("\n").map((item, index) => (
                      <Typography key={message._id + index} variant="body1">
                        {item}
                      </Typography>
                    ))}
                    <Box
                      sx={{
                        width: "40px",
                        position: "absolute",
                        bottom: "-30px",
                        right: "0px",
                        display: "flex",
                      }}
                    >
                      {message.likes.find(
                        (like) => like.email === props.user.email
                      ) ? (
                        <>
                          <a
                            style={{ color: "red" }}
                            onClick={() => props.handleRemoveLike(message._id)}
                          >
                            <Favorite />
                          </a>
                          {message.likes.length > 1 ? (
                            <Typography variant="subtitle1">
                              +{message.likes.length}
                            </Typography>
                          ) : (
                            <> </>
                          )}
                        </>
                      ) : (
                        <>
                          <a onClick={() => props.handleAddLike(message._id)}>
                            <FavoriteBorder />
                          </a>
                          {message.likes.length > 0 ? (
                            <Typography variant="subtitle1">
                              +{message.likes.length}
                            </Typography>
                          ) : (
                            <> </>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={message._id}
                  sx={{ display: "flex", margin: "25px 0" }}
                >
                  <Avatar
                    key={props.user.email}
                    {...stringAvatar(message.sender.name)}
                  />

                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        marginLeft: "20px",
                        color: "#e0e0e0",
                      }}
                    >
                      {message.sender.name}
                    </Typography>

                    <Box
                      sx={{
                        position: "relative",
                        marginLeft: "20px",
                        marginBottom: "10px",
                        padding: "10px",
                        backgroundColor: "#202c33",
                        color: "#cfedef",
                        width: { xs: "60%", md: "40%" },
                        textAlign: "left",
                        border: "1px solid #202c33",
                        borderRadius: "10px",
                        "&:after": {
                          content: "''",
                          position: "absolute",
                          width: "0",
                          height: "0",
                          borderTop: "15px solid #202c33",
                          borderLeft: "15px solid transparent",
                          borderRight: "15px solid transparent",
                          top: "0",
                          left: "-15px",
                        },
                        "&:before": {
                          content: "''",
                          position: "absolute",
                          width: "0",
                          height: "0",
                          borderTop: "17px solid #202c33",
                          borderLeft: "16px solid transparent",
                          borderRight: "16px solid transparent",
                          top: "-1px",
                          left: "-17px",
                        },
                      }}
                    >
                      {message.content.split("\n").map((item, index) => (
                        <Typography key={message._id + index} variant="body1">
                          {item}
                        </Typography>
                      ))}
                      <Box
                        sx={{
                          width: "80px",
                          position: "absolute",
                          bottom: "-30px",
                          left: "0px",
                          display: "flex",
                        }}
                      >
                        {message.likes.find(
                          (like) => like.email === props.user.email
                        ) ? (
                          <>
                            <a
                              style={{ color: "red" }}
                              onClick={() =>
                                props.handleRemoveLike(message._id)
                              }
                            >
                              <Favorite />
                            </a>
                            {message.likes.length > 1 ? (
                              <Typography variant="subtitle1">
                                +{message.likes.length}
                              </Typography>
                            ) : (
                              <> </>
                            )}
                          </>
                        ) : (
                          <>
                            <a onClick={() => props.handleAddLike(message._id)}>
                              <FavoriteBorder />
                            </a>
                            {message.likes.length > 0 ? (
                              <Typography variant="subtitle2">
                                +{message.likes.length}
                              </Typography>
                            ) : (
                              <> </>
                            )}
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            )}
          </Box>
          <div ref={messagesEndRef} />
        </Box>
        <FooterComponent
          id={id}
          handleUpdateGroupMessage={props.handleUpdateGroupMessage}
        />
      </Box>
    )
  );
};

export default GroupComponent;
