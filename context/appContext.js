import React from 'react';

export const AppContext = React.createContext();

function AppProvider(props){
  const [gallery, setGallery] = React.useState([]);

  const state = {
    gallery,
    setGallery
  }

  return(
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider;