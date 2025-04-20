import * as Yup from "yup";
import { CreateSectionForm } from "../models/CreateSectionForm";

export const CreateSectionFormSchema: Yup.ObjectSchema<CreateSectionForm> =
  Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    workspaceId: Yup.number().required("Workspace is required"),
    parentId: Yup.number()
  });
