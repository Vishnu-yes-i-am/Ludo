import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import GameMenu from "./screens/GameMenu";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <Home />, loader: () => {
        return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w"]
      }
    },
    { path: '/game', element: <GameMenu /> }

  ])
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
