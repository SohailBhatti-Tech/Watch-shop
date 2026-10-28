/*import { createContext,useContext,useState } from "react";
const ThemeContext=createContext();
export function ThemeProvider({children}){
    const[theme,setTheme]=useState("light")
    const toggle=()=>setTheme((t)=>(t==="light"?"dark":"light"))
    return(
        <ThemeContext.Provider value={{theme,toggle}}>
            <div className={`app ${theme}`}>{children}</div>
        </ThemeContext.Provider>
    )
}
export const useTheme=()=>useContext(ThemeContext)*/