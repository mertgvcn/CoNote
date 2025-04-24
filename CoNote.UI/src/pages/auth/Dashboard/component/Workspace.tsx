//models
import { WorkspaceView } from "../../../../features/workspace/models/WorkspaceView";
//components
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

type WorkspacePropTypes = {
  workspace: WorkspaceView;
};

const Workspace = ({ workspace }: WorkspacePropTypes) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={require("D:/Projeler/CoNote/CoNote.UI/src/assets/images/temp.png")}
        title="temp image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {workspace.name}
        </Typography>
        
        {workspace.description && (
          <Typography variant="body2" sx={{ color: "grey.500" }}>
            {workspace.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Workspace;
