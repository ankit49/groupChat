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
import BasicModal from "../../helpers/modals/edit-user-modal";

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
        backgroundColor: "#363636",
        color: "#b6b7b9",
        borderRadius: "15px",
        padding: "20px 0",
        boxShadow:
          "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <TableContainer sx={{ marginBottom: "20px" }}>
        <Table>
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
