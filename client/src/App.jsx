import { useEffect } from "react";
import localforage from "localforage";
import apiRequest from "./lib/apiRequest";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Nearby from "./routes/nearby/nearby";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/list", element: <ListPage />, loader: listPageLoader },
        { path: "/:id", element: <SinglePage />, loader: singlePageLoader },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/nearby", element: <Nearby /> },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        { path: "/profile", element: <ProfilePage />, loader: profilePageLoader },
        { path: "/profile/update", element: <ProfileUpdatePage /> },
        { path: "/add", element: <NewPostPage /> },
      ],
    },
  ]);

  useEffect(() => {
    const syncQueuedPosts = async () => {
      if (!navigator.onLine) return;

      const queued = (await localforage.getItem("queuedPosts")) || [];

      if (queued.length === 0) return;

      const failed = [];

      for (let payload of queued) {
        try {
          await apiRequest.post("/posts", payload);
          toast.success(`📤 Synced: ${payload.postData.title || "Untitled Post"}`);
        } catch (err) {
          failed.push(payload);
          toast.error(`❌ Failed to sync: ${payload.postData.title || "Untitled Post"}`);
        }
      }

      if (failed.length === 0) {
        await localforage.removeItem("queuedPosts");
      } else {
        await localforage.setItem("queuedPosts", failed);
      }
    };

    // ✅ Run on load
    syncQueuedPosts();

    // ✅ Run when internet comes back
    window.addEventListener("online", syncQueuedPosts);
    return () => window.removeEventListener("online", syncQueuedPosts);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
