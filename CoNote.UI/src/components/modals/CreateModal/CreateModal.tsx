import { useEffect, useState } from "react";
import theme from "../../../theme";
//redux
import { useSelector } from "react-redux";
import { workspaceSelectors } from "../../../features/workspace/slices/workspaceSlice";
//models
import { StructureType } from "../../../models/enums/StructureType";
import { CreateWorkspaceForm } from "../../../features/workspace/models/CreateWorkspaceForm";
import { CreateSectionForm } from "../../../features/section/models/CreateSectionForm";
import { CreateWorksheetForm } from "../../../features/worksheet/models/CreateWorksheetForm";
//schemas
import { CreateWorkspaceFormSchema } from "../../../features/workspace/schemas/CreateWorkspaceFormSchema";
import { CreateSectionFormSchema } from "../../../features/section/schemas/CreateSectionFormSchema";
import { CreateWorksheetFormSchema } from "../../../features/worksheet/schemas/CreateWorksheetFormSchema";
//utils
import { workspaceService } from "../../../features/workspace/workspaceService";
import { sectionService } from "../../../features/section/sectionService";
import { worksheetService } from "../../../features/worksheet/worksheetService";
import { useFormik } from "formik";
import { RenderErrorToast } from "../../../utils/CustomToastManager";
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
  Autocomplete,
} from "@mui/material";
import { RichTreeView, TreeViewBaseItem } from "@mui/x-tree-view";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

//TODO: Burayı ileride componentlere böl
const CreateModal = ({ open, onClose }: CreateModalProps) => {
  const workspaces = useSelector(workspaceSelectors.selectAll);

  const [selectedCreateOption, setSelectedCreateOption] =
    useState<StructureType | null>(null);
  const [currentWorkspaceSections, setCurrentWorkspaceSections] = useState<
    TreeViewBaseItem[]
  >([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number | null>(
    null
  );
  const [selectedParentSectionId, setSelectedParentSectionId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (
      selectedCreateOption === StructureType.Section ||
      selectedCreateOption === StructureType.Worksheet
    ) {
      setSelectedWorkspaceId(null);
      setSelectedParentSectionId(undefined);
    }
  }, [selectedCreateOption]);

  useEffect(() => {
    if (selectedWorkspaceId) {
      fetchSections();
    } else {
      setCurrentWorkspaceSections([]);
    }
  }, [selectedWorkspaceId]);

  const fetchSections = async () => {
    try {
      const result = await sectionService.GetSectionTreeByWorkspaceId(
        selectedWorkspaceId!
      );
      setCurrentWorkspaceSections(result);
    } catch (error) {
      console.error("Error fetching workspaces", error);
    }
  };

  const handleCreateWorkspace = async (values: CreateWorkspaceForm) => {
    try {
      await workspaceService.CreateWorkspace(values);
      handleClose();
    } catch (error) {
      console.error("Workspace creation error", error);
    }
  };

  const handleCreateSection = async (values: CreateSectionForm) => {
    if (!selectedWorkspaceId) {
      RenderErrorToast("Workspace is required.");
      return;
    }

    const request: CreateSectionForm = {
      ...values,
      workspaceId: selectedWorkspaceId,
      parentId: selectedParentSectionId,
    };

    try {
      await sectionService.CreateSection(request);
      handleClose();
    } catch (error) {
      console.error("Section creation error", error);
    }
  };

  const handleCreateWorksheet = async (values: CreateWorksheetForm) => {
    if (!selectedWorkspaceId) {
      RenderErrorToast("Workspace is required.");
      return;
    }

    const request: CreateWorksheetForm = {
      ...values,
      workspaceId: selectedWorkspaceId,
      sectionId: selectedParentSectionId,
    };

    try {
      await worksheetService.CreateWorksheet(request);
      handleClose();
    } catch (error) {
      console.error("Worksheet creation error", error);
    }
  };

  const handleClose = () => {
    createWorkspaceFormik.resetForm();
    createSectionFormik.resetForm();
    createWorksheetFormik.resetForm();
    setSelectedCreateOption(null);
    setSelectedWorkspaceId(null);
    setSelectedParentSectionId(undefined);
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

        {selectedCreateOption != null && (
          <>
            <Divider sx={{ marginY: theme.spacing(2) }} />

            <Stack direction="column" spacing={1}>
              <Typography variant="subtitle1">
                {StructureType[selectedCreateOption]} Informations
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
                  <TextField
                    label="Name"
                    name="name"
                    value={createSectionFormik.values.name}
                    onChange={createSectionFormik.handleChange}
                    onBlur={createSectionFormik.handleBlur}
                    error={
                      createSectionFormik.touched.name &&
                      Boolean(createSectionFormik.errors.name)
                    }
                    helperText={
                      createSectionFormik.touched.name &&
                      createSectionFormik.errors.name
                    }
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={createSectionFormik.values.description}
                    onChange={createSectionFormik.handleChange}
                    onBlur={createSectionFormik.handleBlur}
                    error={
                      createSectionFormik.touched.description &&
                      Boolean(createSectionFormik.errors.description)
                    }
                    helperText={
                      createSectionFormik.touched.description &&
                      createSectionFormik.errors.description
                    }
                    fullWidth
                    size="small"
                  />
                  <Autocomplete
                    size="small"
                    options={workspaces}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      setSelectedWorkspaceId(newValue?.id ?? null);
                    }}
                    value={
                      workspaces.find((ws) => ws.id === selectedWorkspaceId) ??
                      null
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Workspace" />
                    )}
                  />
                  <RichTreeView
                    items={currentWorkspaceSections}
                    onItemClick={(event, itemId) =>
                      setSelectedParentSectionId(Number(itemId))
                    }
                  />
                </Stack>
              )}

              {selectedCreateOption === StructureType.Worksheet && (
                <Stack direction="column" spacing={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={createWorksheetFormik.values.name}
                    onChange={createWorksheetFormik.handleChange}
                    onBlur={createWorksheetFormik.handleBlur}
                    error={
                      createWorksheetFormik.touched.name &&
                      Boolean(createWorksheetFormik.errors.name)
                    }
                    helperText={
                      createWorksheetFormik.touched.name &&
                      createWorksheetFormik.errors.name
                    }
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={createWorksheetFormik.values.description}
                    onChange={createWorksheetFormik.handleChange}
                    onBlur={createWorksheetFormik.handleBlur}
                    error={
                      createWorksheetFormik.touched.description &&
                      Boolean(createWorksheetFormik.errors.description)
                    }
                    helperText={
                      createWorksheetFormik.touched.description &&
                      createWorksheetFormik.errors.description
                    }
                    fullWidth
                    size="small"
                  />
                  <Autocomplete
                    size="small"
                    options={workspaces}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      setSelectedWorkspaceId(newValue?.id ?? null);
                    }}
                    value={
                      workspaces.find((ws) => ws.id === selectedWorkspaceId) ??
                      null
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Workspace" />
                    )}
                  />
                  <RichTreeView
                    items={currentWorkspaceSections}
                    onItemClick={(event, itemId) =>
                      setSelectedParentSectionId(Number(itemId))
                    }
                  />
                </Stack>
              )}
            </Stack>
          </>
        )}
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
