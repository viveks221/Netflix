import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
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
    });
};
export default signInUser;
