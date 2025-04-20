import * as Yup from "yup";
import { CreateWorkspaceForm } from "../models/CreateWorkspaceForm";

export const CreateWorkspaceFormSchema: Yup.ObjectSchema<CreateWorkspaceForm> =
  Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
  });
