export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('courseUser');
    const user = result ? JSON.parse(result) : null
    return user
}

export const addUserToLocalStorage = (user) => {
   localStorage.setItem('courseUser', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('courseUser');
  };