import "./App.css";
import ChatWindow from "./Components/ChatWindow";
import Homepage from "./Components/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRout } from "./Components/ProtectedRout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/chatwindow",
    element: <ProtectedRout> <ChatWindow /></ProtectedRout>
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
