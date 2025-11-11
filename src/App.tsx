import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PostPage from "./pages/PostPage";

function App() {
  const [selectedPage, setSelectedPage] = useState("Post");

  const renderPage = () => {
    switch (selectedPage) {
      case "Post":
        return <PostPage />;
      case "Settings":
        return <div className="p-6"><h1 className="text-2xl font-bold">Settings Page</h1></div>;
      case "Users":
        return <div className="p-6"><h1 className="text-2xl font-bold">Users Page</h1></div>;
      default:
        return <PostPage />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar onSelect={setSelectedPage} />
      <div className="flex-1">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;