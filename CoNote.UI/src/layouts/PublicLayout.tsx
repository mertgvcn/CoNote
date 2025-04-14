import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
//components
import Navbar from "../components/layout/Navbar";

const PublicLayout = () => {
  return (
    <Stack direction="column">
      <Navbar />
      <Container maxWidth="xl" disableGutters>
        <Outlet />
      </Container>
    </Stack>
  );
};

export default PublicLayout;
