import { Box } from "@mui/material";
import Navbar from "../../../components/layout/Navbar"

const LandingPage = () => {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <Navbar isAuthenticated={false} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)" 
      >
        LandingPage
      </Box>
    </Box>
  );
};

export default LandingPage;