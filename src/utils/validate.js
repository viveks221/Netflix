const checkValidData = (password) => {
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
  if (!isPasswordValid) return "Passoword is not Valid";
  return null;
};

export default checkValidData;
