//models
import { MemberView } from "../../../../../../../models/views/MemberView";
//icons
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
//components
import {
  Box,
  Chip,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

const MemberElementContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

type MemberElementPropsType = {
  memberElement: MemberView;
  isFirst?: boolean;
  isLast?: boolean;
};

const MemberElement = ({
  memberElement,
  isFirst = false,
  isLast = false,
}: MemberElementPropsType) => {
  const theme = useTheme();

  const dynamicStyle = {
    borderBottom: !isLast
      ? `1px solid ${theme.palette.secondary.main}`
      : "none",
    borderTopLeftRadius: isFirst ? theme.shape.borderRadius : "0px",
    borderTopRightRadius: isFirst ? theme.shape.borderRadius : "0px",
    borderBottomLeftRadius: isLast ? theme.shape.borderRadius : "0px",
    borderBottomRightRadius: isLast ? theme.shape.borderRadius : "0px",
  };

  return (
    <MemberElementContainer sx={dynamicStyle}>
      <Stack direction="row" gap={1} alignItems="center">
        <PersonIcon />
        <Stack direction="column">
          <Typography variant="body1">{memberElement.fullName}</Typography>
          <Typography variant="body2" color="grey.500">
            @{memberElement.username}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" gap={1} alignItems="center">
        <Chip label={memberElement.roleName} />
        <IconButton color="secondary" size="small">
          <EditIcon />
        </IconButton>
      </Stack>
    </MemberElementContainer>
  );
};

export default MemberElement;
