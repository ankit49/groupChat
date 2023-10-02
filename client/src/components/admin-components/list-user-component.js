import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import BasicModal from "../../helpers/edit-user-modal";

const ListUserComponent = (props) => {
  const columns = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    {
      id: "isAdmin",
      label: "isAdmin",

      format: (value) => (value ? "true" : "false"),
    },
    {
      id: "action",
      label: "Action",

      format: (user) => (
        <span>
          <BasicModal user={user} handleEditUser={props.handleEditUser} />
          <Button
            onClick={() => props.handleDeleteUser(user.email)}
            sx={{ minWidth: "30px" }}
            color="error"
          >
            <DeleteForever />
          </Button>
        </span>
      ),
    },
  ];
  return (
    <Container
      sx={{
        marginTop: "20px",
        width: { xs: "95%", md: "80%" },
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <TableContainer sx={{ marginBottom: "20px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="user_name" style={{ minWidth: "100px" }}>
                Name
              </TableCell>
              <TableCell key="user_email" style={{ minWidth: "200px" }}>
                Email
              </TableCell>
              <TableCell
                key="isAdmin"
                align="left"
                style={{ minWidth: "80px" }}
              >
                is Admin
              </TableCell>
              <TableCell key="actions" style={{ minWidth: "60px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allUsers.map((user) => {
              return (
                <TableRow hover key={user._id}>
                  {columns.map((column) => {
                    const value =
                      column.id === "action" ? user : user[column.id];
                    return (
                      <TableCell
                        sx={{ padding: "5px" }}
                        key={column.id}
                        align={column.align}
                      >
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default ListUserComponent;
