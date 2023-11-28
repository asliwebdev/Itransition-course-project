export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("courseUser");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addUserToLocalStorage = (user) => {
  localStorage.setItem("courseUser", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("courseUser");
};

export const addCollectionIdToLocalStorage = (id) => {
  localStorage.setItem("collectionId", JSON.stringify(id));
};
export const getCollectionIdFromLocalStorage = () => {
  return localStorage.getItem("collectionId");
};
