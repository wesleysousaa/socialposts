import { createContext, useState, useContext } from "react";

export const LoadingContext = createContext()

export const LoadingContextProvider = ({children}) => {

    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{loading, setLoading}} >
            {children}
        </LoadingContext.Provider>
    )
}
export function LoadingContextValue(){
    return useContext(LoadingContext)
}

