import { auth } from '../../../firebase/client';
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"
import { signOut } from "firebase/auth";
import { useEffect, useState } from 'react';


function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleGithubLogin = () => {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Sesión iniciada como:", user);
                navigate('/')
            })
            .catch((error) => {
                console.error("Error al autenticar:", error.code, error.message);
            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };

    return (
        <div className="dropdown">

            {user
                ? <div>
                    <Link to="/">
                        <button onClick={handleLogout}>Log Out</button>
                    </Link>
                    <Link to='/favoritos'>
                        <button>Favoritos</button>
                    </Link>
                </div>
                : <button onClick={handleGithubLogin}>Iniciar sesión</button>}


        </div>
    )
}

export default Login