import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { auth } from "../firebase/firebase.init"

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const createUserEP = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logoutUser = () => {
        return signOut(auth)
    }
    const profileUpdate = async(name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        return await updateProfile(auth.currentUser, profile)
                    .then(()=>{setUser({...auth.currentUser})})
    }
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setLoading(false)
            setUser(currentUser)


        })

        return () => unsubscribe();
    }, [])
    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const authInfo = {
        loginUser,
        signInWithGoogle,
        user,
        createUserEP,
        logoutUser,
        profileUpdate,
        loading
    }
    return(
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}
export default AuthProvider