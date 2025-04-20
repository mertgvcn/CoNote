import * as Yup from "yup";
import { CreateWorksheetForm } from "../models/CreateWorksheetForm";

export const CreateWorksheetFormSchema: Yup.ObjectSchema<CreateWorksheetForm> =
  Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    workspaceId: Yup.number().required("Workspace is required"),
    sectionId: Yup.number()
  });
