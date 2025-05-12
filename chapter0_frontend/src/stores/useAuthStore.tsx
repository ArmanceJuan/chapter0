const useAuthStore = () => {
  return {
    isLoggedIn: false,
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
  };
};

export default useAuthStore;
