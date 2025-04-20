import { useState } from "react";
import theme from "../../theme";
//models
import { StructureType } from "../../models/enums/StructureType";
import { CreateWorkspaceForm } from "../../features/workspace/models/CreateWorkspaceForm";
import { CreateSectionForm } from "../../features/section/models/CreateSectionForm";
import { CreateWorksheetForm } from "../../features/worksheet/models/CreateWorksheetForm";
//schemas
import { CreateWorkspaceFormSchema } from "../../features/workspace/schemas/CreateWorkspaceFormSchema";
import { CreateSectionFormSchema } from "../../features/section/schemas/CreateSectionFormSchema";
import { CreateWorksheetFormSchema } from "../../features/worksheet/schemas/CreateWorksheetFormSchema";
//utils
import { FormikHelpers, useFormik } from "formik";
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
  TextField,
  Divider,
} from "@mui/material";
import { workspaceService } from "../../features/workspace/workspaceService";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateModal = ({ open, onClose }: CreateModalProps) => {
  const [selectedCreateOption, setSelectedCreateOption] =
    useState<StructureType>(StructureType.Workspace);

  const handleCreateWorkspace = async (values: CreateWorkspaceForm) => {
    try {
      await workspaceService.CreateWorkspace(values);
      handleClose();
    } catch (error) {
      console.error("Workspace creation error", error);
    }
  };

  const handleCreateSection = async (values: CreateSectionForm) => {
    try {
      console.log("Section created", values);
      handleClose();
    } catch (error) {
      console.error("Section creation error", error);
    }
  };

  const handleCreateWorksheet = async (values: CreateWorksheetForm) => {
    try {
      console.log("Worksheet created", values);
      handleClose();
    } catch (error) {
      console.error("Worksheet creation error", error);
    }
  };

  const handleClose = () => {
    createWorkspaceFormik.resetForm();
    createSectionFormik.resetForm();
    createWorksheetFormik.resetForm();
    setSelectedCreateOption(StructureType.Workspace);
    onClose();
  };

  const createWorkspaceFormik = useFormik<CreateWorkspaceForm>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CreateWorkspaceFormSchema,
    onSubmit: handleCreateWorkspace,
  });

  const createSectionFormik = useFormik<CreateSectionForm>({
    initialValues: {
      name: "",
      description: "",
      workspaceId: 0,
    },
    validationSchema: CreateSectionFormSchema,
    onSubmit: handleCreateSection,
  });

  const createWorksheetFormik = useFormik<CreateWorksheetForm>({
    initialValues: {
      name: "",
      description: "",
      workspaceId: 0,
    },
    validationSchema: CreateWorksheetFormSchema,
    onSubmit: handleCreateWorksheet,
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle variant="h5" color="secondary">
        {/* Create */}
      </DialogTitle>
      <IconButton
        onClick={handleClose}
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
              isSelected={selectedCreateOption === StructureType.Workspace}
              onClick={() => setSelectedCreateOption(StructureType.Workspace)}
            >
              <ArticleIcon />
              <Typography variant="body1">Workspace</Typography>
            </CreateOptionBox>

            <CreateOptionBox
              direction={{ xs: "row", sm: "column" }}
              alignItems={{ xs: "start", sm: "center" }}
              justifyContent={{ xs: "start", sm: "center" }}
              isSelected={selectedCreateOption === StructureType.Section}
              onClick={() => setSelectedCreateOption(StructureType.Section)}
            >
              <FolderIcon />
              <Typography variant="body1">Section</Typography>
            </CreateOptionBox>

            <CreateOptionBox
              direction={{ xs: "row", sm: "column" }}
              alignItems={{ xs: "start", sm: "center" }}
              justifyContent={{ xs: "start", sm: "center" }}
              isSelected={selectedCreateOption === StructureType.Worksheet}
              onClick={() => setSelectedCreateOption(StructureType.Worksheet)}
            >
              <InsertDriveFileIcon />
              <Typography variant="body1">Worksheet</Typography>
            </CreateOptionBox>
          </Stack>
        </Stack>

        <Divider sx={{ marginY: theme.spacing(2) }} />

        <Stack direction="column" spacing={1}>
          <Typography variant="subtitle1">
            {selectedCreateOption} Informations
          </Typography>

          {selectedCreateOption === StructureType.Workspace && (
            <Stack direction="column" spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={createWorkspaceFormik.values.name}
                onChange={createWorkspaceFormik.handleChange}
                onBlur={createWorkspaceFormik.handleBlur}
                error={
                  createWorkspaceFormik.touched.name &&
                  Boolean(createWorkspaceFormik.errors.name)
                }
                helperText={
                  createWorkspaceFormik.touched.name &&
                  createWorkspaceFormik.errors.name
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Description"
                name="description"
                value={createWorkspaceFormik.values.description}
                onChange={createWorkspaceFormik.handleChange}
                onBlur={createWorkspaceFormik.handleBlur}
                error={
                  createWorkspaceFormik.touched.description &&
                  Boolean(createWorkspaceFormik.errors.description)
                }
                helperText={
                  createWorkspaceFormik.touched.description &&
                  createWorkspaceFormik.errors.description
                }
                fullWidth
                size="small"
                multiline
                maxRows={4}
              />
            </Stack>
          )}

          {selectedCreateOption === StructureType.Section && (
            <Stack direction="column" spacing={2}>
              <TextField label="Name" name="name" fullWidth size="small" />
              <TextField
                label="Description"
                name="description"
                fullWidth
                size="small"
              />
              <TextField
                label="Workspace"
                name="description"
                fullWidth
                size="small"
              />
            </Stack>
          )}

          {selectedCreateOption === StructureType.Worksheet && (
            <Stack direction="column" spacing={2}>
              <TextField label="Name" name="name" fullWidth size="small" />
              <TextField
                label="Description"
                name="description"
                fullWidth
                size="small"
              />
              <TextField
                label="Workspace"
                name="description"
                fullWidth
                size="small"
              />
            </Stack>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (selectedCreateOption === StructureType.Workspace) {
              createWorkspaceFormik.submitForm();
            } else if (selectedCreateOption === StructureType.Section) {
              createSectionFormik.submitForm();
            } else if (selectedCreateOption === StructureType.Worksheet) {
              createWorksheetFormik.submitForm();
            }
          }}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;

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
