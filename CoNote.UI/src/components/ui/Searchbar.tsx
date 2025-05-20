//icons
import SearchIcon from "@mui/icons-material/Search";
//components
import { styled, Box, useTheme } from "@mui/material";

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: 40,
  border: `1px solid`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  padding: `0px ${theme.spacing(0.5)}`,
  boxSizing: "border-box",
  transition: "background-color,color 0.2s ease",
}));

const SearchbarIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: `0px ${theme.spacing(0.5)}`,
  boxSizing: "border-box",
}));

const SearchbarInput = styled("input")(({ theme }) => ({
  height: "100%",
  width: "100%",
  border: "none",
  outline: "none",
  color: theme.palette.text.primary,
  backgroundColor: "transparent",
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius,
  "&::placeholder": {
    color: theme.palette.text.disabled,
  },
}));

type SearchbarPropsType = {
  value: string;
  onChange?: any;
  color?: "primary" | "secondary";
  //TODO: Size ekle small, medium, large
};

const Searchbar = (props: SearchbarPropsType) => {
  const { value, onChange, color = "primary" } = props;

  const theme = useTheme();

  const themeMainColor =
    color === "primary"
      ? theme.palette.primary.main
      : theme.palette.secondary.main;

  const themeDarkColor =
    color === "primary"
      ? theme.palette.primary.dark
      : theme.palette.secondary.dark;

  const dynamicStyles = {
    color: themeMainColor,
    borderColor: themeMainColor,
    "&:hover": {
      color: themeDarkColor,
      borderColor: themeDarkColor,
    },
  };

  return (
    <SearchContainer sx={dynamicStyles}>
      <SearchbarIconContainer>
        <SearchIcon />
      </SearchbarIconContainer>
      <SearchbarInput
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </SearchContainer>
  );
};

export default Searchbar;
