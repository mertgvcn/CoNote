import { SearchRounded } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const Search = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  minHeight: 32,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: `0px ${theme.spacing(0.5)}`,
  boxSizing: "border-box",
  "&:hover": {
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
  },
  cursor: "pointer",
  transition: "background-color,color 0.2s ease",
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: theme.spacing(0.5),
  boxSizing: "border-box",
}));

const SearchInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
  width: "160px",
  boxSizing: "border-box",
}));

type SearchbarPropTypes = {
  showTooltip?: boolean;
};

const Searchbar = ({ showTooltip = false }: SearchbarPropTypes) => {
  return (
    <>
      {showTooltip ? (
        <Tooltip title="Search for anything">
          <Search>
            <SearchIconWrapper>
              <SearchRounded />
            </SearchIconWrapper>
            <SearchInputWrapper>Search...</SearchInputWrapper>
          </Search>
        </Tooltip>
      ) : (
        <Search>
          <SearchIconWrapper>
            <SearchRounded />
          </SearchIconWrapper>
          <SearchInputWrapper>Search...</SearchInputWrapper>
        </Search>
      )}
    </>
  );
};

export default Searchbar;
