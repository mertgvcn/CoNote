import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "calc(100vh - 64.8px)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
