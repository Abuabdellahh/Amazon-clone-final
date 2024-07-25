import React, { createContext, useReducer } from "react";

// Create a context for the data
export const DataContext = createContext();

// DataProvider component to provide state and dispatch to its children
export const DataProvider = ({ children , initialState, reducer}) => {
 return(
  // Use useReducer hook to manage state and dispatch
  <DataContext.Provider value={useReducer(reducer, initialState)}>
   {children}
  </DataContext.Provider>)
}