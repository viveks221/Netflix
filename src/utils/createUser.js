import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const createUser = async (email, password) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      return {
        message: "success",
        user: userCredential.user,
      };
      // ...
    })
    .catch((error) => {
      return {
        message: "error",
        errorCode: error.code,
      };
      // ..
    });
  return data;
};

export default createUser;
