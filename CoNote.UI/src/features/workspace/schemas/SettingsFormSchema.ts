import * as Yup from "yup";

export const settingsFormSchema = Yup.object({
  name: Yup.string().required("Name is required for workspace"),
  description: Yup.string(),
});
