import { useRef, useContext, createContext } from "react";

export const NavContext = createContext();

export const NavContextValue = () => {
  return useContext(NavContext);
};

export const NavProvider = ({ children }) => {
  //variables
  const headerRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const projectRef = useRef();

  return (
    <NavContext.Provider
      value={{ headerRef, aboutRef, contactRef, projectRef }}
    >
      {children}
    </NavContext.Provider>
  );
};
