import { SearchRounded } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavSearch = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  minHeight: 32,
  backgroundColor: theme.palette.background.default,
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

const NavSearchIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: theme.spacing(0.5),
  boxSizing: "border-box",
}));

const NavSearchInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
  width: "160px",
  boxSizing: "border-box",
}));

type NavSearchbarPropTypes = {
  showTooltip?: boolean;
};

const NavSearchbar = ({ showTooltip = false }: NavSearchbarPropTypes) => {
  return (
    <>
      {showTooltip ? (
        <Tooltip title="Search for anything">
          <NavSearch>
            <NavSearchIconWrapper>
              <SearchRounded />
            </NavSearchIconWrapper>
            <NavSearchInputWrapper>Search...</NavSearchInputWrapper>
          </NavSearch>
        </Tooltip>
      ) : (
        <NavSearch>
          <NavSearchIconWrapper>
            <SearchRounded />
          </NavSearchIconWrapper>
          <NavSearchInputWrapper>Search...</NavSearchInputWrapper>
        </NavSearch>
      )}
    </>
  );
};

export default NavSearchbar;
