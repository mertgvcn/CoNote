import { useState } from "react";
//icons
import CloseIcon from "@mui/icons-material/Close";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
//components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  styled,
  Stack,
  Typography,
} from "@mui/material";

const CreateOptionBox = styled(Stack)<{ isSelected: boolean }>(
  ({ theme, isSelected }) => ({
    flex: 1,
    color: isSelected
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    border: `1px solid ${
      isSelected ? theme.palette.primary.main : theme.palette.secondary.main
    }`,
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  })
);

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateModal = ({ open, onClose }: CreateModalProps) => {
  const [selectedCreateOption, setSelectedCreateOption] = useState<
    "Workspace" | "Section" | "Worksheet"
  >("Workspace");

  const handleCreate = () => {
    // Workspace oluşturma işlemi
    console.log("Workspace oluşturuluyor:");
    onClose(); // Modal'ı kapat
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5" color="secondary">
        Create
      </DialogTitle>
      <IconButton
        onClick={onClose}
        size="medium"
        color="secondary"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">
            What would you like to create?
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <CreateOptionBox
              direction={{ xs: "row", sm: "column" }}
              alignItems={{ xs: "start", sm: "center" }}
              justifyContent={{ xs: "start", sm: "center" }}
              isSelected={selectedCreateOption === "Workspace"}
              onClick={() => setSelectedCreateOption("Workspace")}
            >
              <ArticleIcon />
              <Typography variant="body1">Workspace</Typography>
            </CreateOptionBox>

            <CreateOptionBox
              direction={{ xs: "row", sm: "column" }}
              alignItems={{ xs: "start", sm: "center" }}
              justifyContent={{ xs: "start", sm: "center" }}
              isSelected={selectedCreateOption === "Section"}
              onClick={() => setSelectedCreateOption("Section")}
            >
              <FolderIcon />
              <Typography variant="body1">Section</Typography>
            </CreateOptionBox>

            <CreateOptionBox
              direction={{ xs: "row", sm: "column" }}
              alignItems={{ xs: "start", sm: "center" }}
              justifyContent={{ xs: "start", sm: "center" }}
              isSelected={selectedCreateOption === "Worksheet"}
              onClick={() => setSelectedCreateOption("Worksheet")}
            >
              <InsertDriveFileIcon />
              <Typography variant="body1">Worksheet</Typography>
            </CreateOptionBox>
          </Stack>
        </Stack>

        {selectedCreateOption === "Workspace" && (
          <Stack direction="column" spacing={2}>

          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
