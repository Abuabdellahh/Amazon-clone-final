import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing";
import { DataContext } from "./componentes/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";

const App = () => {
  // Access global state and dispatch function from DataContext
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    // Subscribe to Firebase authentication state changes
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Dispatch action to set user when authenticated
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // Dispatch action to set user to null when not authenticated
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  );
};

export default App;
