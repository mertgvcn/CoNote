//redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../app/store";
import { selectWorkspaceDetailsSettings } from "../../../../../features/workspace/slices/workspaceDetailsSlice";
//utils
import { useFormik } from "formik";
//models
import { SettingsForm } from "../../../../../features/workspace/models/SettingsForm";
import { settingsFormSchema } from "../../../../../features/workspace/schemas/SettingsFormSchema";
//components
import {
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

const Settings = () => {
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
      <Stack direction="column" spacing={3}>
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
          <Button variant="text" color="error" onClick={handleDeleteWorkspace}>
            Delete Workspace
          </Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Settings;
