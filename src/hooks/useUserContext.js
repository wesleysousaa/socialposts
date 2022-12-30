import { useEffect, useContext } from "react";
import { useArthentication } from "./useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../context/UserContext";

export function useUserContext(){
    
    const context = useContext(UserContext)
    const {setUser} = context
    const {auth} = useArthentication()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [auth])

    return context
}