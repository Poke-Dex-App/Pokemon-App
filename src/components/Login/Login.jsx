import { auth } from '../../../firebase/client';
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"
import { signOut } from "firebase/auth";

function Login() {

    const navigate = useNavigate()

    const handleGithubLogin = () => {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Sesión iniciada como:", user.displayName);
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
        <div>
            <button onClick={handleGithubLogin}>Iniciar sesion con GitHub</button>
            <button onClick={handleLogout}>Log Out</button>
            <Link to='/favoritos'>
                <button>Favoritos</button>
            </Link>
        </div>
    )
}

export default Login