import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homePage.jsx";
import { SignUpPage } from "./pages/signupPage.jsx";
import { LoginPage } from "./pages/loginPage.jsx";
import { CommentsPage } from "./pages/commentsPage.jsx";
import { CreateBlogPost } from "./pages/createBlogPost.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-post" element={<CreateBlogPost />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/post/:postId/comments" element={<CommentsPage />} />
    </Routes>
  );
}
export default App;
