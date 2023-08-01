import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stories from "../stories/Stories";
import Comments from "../comments/Comments";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Stories />}></Route>
          <Route path="/:storyId" element={<Comments />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;