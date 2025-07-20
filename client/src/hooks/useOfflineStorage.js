import localforage from "localforage";

export const saveBookmark = async (post) => {
  const existing = (await localforage.getItem("bookmarks")) || [];
  existing.push(post);
  await localforage.setItem("bookmarks", existing);
};

export const getBookmarks = async () => {
  return (await localforage.getItem("bookmarks")) || [];
};
