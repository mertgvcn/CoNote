import { BrowserRouter } from "react-router-dom";
//component
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}



export default App;
