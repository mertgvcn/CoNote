//redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../app/store";
import { selectWorkspaceDetailsSettings } from "../../../../../features/workspace/slices/workspaceDetailsSlice";
//utils
import { useFormik } from "formik";
//models
import { SettingsForm } from "../../../../../features/workspace/models/SettingsForm";
import { settingsFormSchema } from "../../../../../features/workspace/schemas/SettingsFormSchema";
import { PermissionAction } from "../../../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../../../models/enums/PermissionObjectType";
//components
import {
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import PermissionGate from "../../../../../components/ui/PermissionGate";

const Settings = () => {
  //TODO: Rolleri ayarlama kısmını da burda yap
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector(selectWorkspaceDetailsSettings);

  const formik = useFormik<SettingsForm>({
    initialValues: {
      name: settings?.name || "",
      description: settings?.description || "",
    },
    validationSchema: settingsFormSchema,
    onSubmit: (values) => {},
  });

  const handleVisibility = () => {};

  const handleDeleteWorkspace = () => {};

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          size="small"
        />

        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          size="small"
        />

        <FormControlLabel
          control={<Switch onChange={handleVisibility} />}
          label="Private"
          sx={{ width: "fit-content", userSelect: "none" }}
        />

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <PermissionGate
            action={PermissionAction.Delete}
            objectType={PermissionObjectType.Workspace}
          >
            <Button
              variant="text"
              color="error"
              onClick={handleDeleteWorkspace}
            >
              Delete Workspace
            </Button>
          </PermissionGate>

          <PermissionGate
            action={PermissionAction.Edit}
            objectType={PermissionObjectType.Settings}
          >
            <Button variant="contained" color="secondary" type="submit">
              Save Changes
            </Button>
          </PermissionGate>
        </Stack>
      </Stack>
    </form>
  );
};

export default Settings;
