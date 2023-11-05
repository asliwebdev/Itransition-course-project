export const formatTime = (time) => {
    const date = new Date(time);
  
    const formattedLoginTime = date.toLocaleDateString('en-US');
    return formattedLoginTime;
  };