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
import EditPostPage from "./routes/editPostPage/editPostPage";
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
        { path: "/edit/:id", element: <EditPostPage /> },
      ],
    },
  ]);

  useEffect(() => {
  const syncQueuedData = async () => {
    if (!navigator.onLine) return;

    // SYNC NEW POSTS
    const queuedPosts = (await localforage.getItem("queuedPosts")) || [];
    const failedPosts = [];

    for (let payload of queuedPosts) {
      try {
        await apiRequest.post("/posts", payload);
        toast.success(`📤 Synced: ${payload.postData.title || "Untitled Post"}`);
      } catch {
        failedPosts.push(payload);
        toast.error(`❌ Failed to sync: ${payload.postData.title || "Untitled Post"}`);
      }
    }
    await localforage.setItem("queuedPosts", failedPosts.length ? failedPosts : null);

    // SYNC EDITED POSTS
    const queuedUpdates = (await localforage.getItem("queuedUpdates")) || [];
    const failedUpdates = [];

    for (let update of queuedUpdates) {
      try {
        await apiRequest.put(`/posts/${update.id}`, update);
        toast.success(`✏️ Synced update: ${update.postData.title || "Untitled Post"}`);
      } catch {
        failedUpdates.push(update);
        toast.error(`❌ Failed to sync update: ${update.postData.title || "Untitled Post"}`);
      }
    }
    await localforage.setItem("queuedUpdates", failedUpdates.length ? failedUpdates : null);
  };

  syncQueuedData();
  window.addEventListener("online", syncQueuedData);
  return () => window.removeEventListener("online", syncQueuedData);
}, []);


  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
