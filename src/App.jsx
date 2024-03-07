import { Route, Routes } from "react-router-dom";
import { Card } from "./components/card";
import { useGetTodoQuery } from "./redux/service/todo-api";
import { Home } from "./pages/home";
import { SingleData } from "./pages/single-data";
import { Users } from "./pages/users";
import { SingleUser } from "./pages/single-user";

function App() {


  return (
  

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo/:id" element={<SingleData />} />
      <Route path="/users" element={<Users />} />
      <Route path="/user/:id" element={<SingleUser />} />
    </Routes>
  );
}

export default App;
