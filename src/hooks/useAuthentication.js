import { app, db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState } from 'react'

export const useArthentication = () => {

    const auth = getAuth(app)
    const [loading, setLoading] = useState(false)

    const createUser = async (data) => {
        setLoading(true)
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.senha
            )

            await updateProfile(user, {
                displayName: data.nome
            })

            setLoading(false)
            return user

        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }

    const singIn = async (data) => {
        setLoading(true)
        try {
            const user = await signInWithEmailAndPassword(auth, data.email, data.senha)
            setLoading(false)
            return user
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }

    const singOutt = async () => {
        setLoading(true)

        try {
            await signOut(auth)
        } catch (error) {
            console.log(error.message);
        }

        setLoading(false)
    }

    return {
        auth,
        createUser,
        singIn,
        singOutt,
        loading,
    }
}