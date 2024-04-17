import "./App.css";
import ChatWindow from "./Components/ChatWindow";
import Homepage from "./Components/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/chatwindow",
    element: <ChatWindow />
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
