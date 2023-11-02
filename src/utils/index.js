export const formatTime = (time) => {
    const date = new Date(time);
  
    // Define the options for formatting the date
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
  
    // Format the date using the options
    const formattedLoginTime = date.toLocaleDateString('en-US', options);
    return formattedLoginTime;
  };