import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
//components
import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";

const PublicLayout = () => {
  return (
    <Stack direction="column">
      <Navbar />
      <Container maxWidth="xl" disableGutters>
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </Container>
    </Stack>
  );
};

export default PublicLayout;
