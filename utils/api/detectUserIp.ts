export const getUserIpAddress = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GET_IP}`);
    const data = await response.json();
    console.log(data);
    return data.ip;
  } catch (error) {
    console.error("Error fetching user IP address:", error);
    return null;
  }
};
