import apiRequest from "./apiRequest";

export const checkOnlineStatus = async () => {
  try {
    await apiRequest.get("/test", { cache: "no-store" });
    return true; // No error means server responded
  } catch (err) {
    console.error("Offline check failed:", err.message);
    return false;
  }
};
