"use client"
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

type User = {
    userId: string;
    nombre: string;
};

type Post = {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    userId: string;
    nombreUsuario: string;
};

type AppContextType = {
    user: User | null;
    posts: Post[];
    users: User[];
    signOut: () => Promise<void>;
    deletePost:(postId: string) => Promise<void>;
};

const AppContext = createContext<AppContextType>({
    user: null,
    users: [],
    posts: [],
    signOut: async () => {},
    deletePost: async (postId: string) => {},
});

interface Props {
    children: ReactNode;
}

export default function AppWrapper({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser: FirebaseUser | null) => {
            if (authUser) {
                const newUser = {
                    userId: authUser.uid,
                    nombre: authUser.displayName || '',
                    correo: authUser.email || '',
                };
                setUser(newUser);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const postsCollection = collection(db, "posteos");
                const postsSnapshot = await getDocs(postsCollection);
                const postData: Post[] = postsSnapshot.docs.map((doc) => {
                    const data = doc.data() as Post;
                    return {
                        id: doc.id,
                        titulo: data.titulo,
                        descripcion: data.descripcion,
                        categoria: data.categoria,
                        userId: data.userId,
                        nombreUsuario: data.nombreUsuario,
                    };
                });

                const userCollection = collection(db, "usuarios");
                const userSnapshot = await getDocs(userCollection);
                const userData: User[] = userSnapshot.docs.map((doc) => {
                    const dataUser = doc.data() as User;
                    return {
                        userId: dataUser.userId,
                        nombre: dataUser.nombre,
                    };
                });

                const postsWithUserNames = postData.map((post) => {
                    const user = userData.find((user) => user.userId === post.userId);
                    const nombreUsuario = user ? user.nombre : "Usuario desconocido";
                    return {
                        ...post,
                        nombreUsuario: nombreUsuario,
                    };
                });            

                setPosts(postsWithUserNames);
            } catch (error: any) {
                console.error("Error al obtener los posts:", error);
            }
        };

        getPosts();

    }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userCollection = collection(db, "usuarios");
                const userSnapshot = await getDocs(userCollection);
                const userData: User[] = userSnapshot.docs.map((doc) => {
                    const dataUser = doc.data();
                    return {
                        userId: dataUser.userId,
                        nombre: dataUser.nombre,
                    };
                });
                setUsers(userData);
            } catch (error: any) {
                console.error("Error al obtener los usuarios:", error);
            }
        };
        getUsers();
    }, []);


    const deletePostId = async (postId: string) => {
        try {
            await deleteDoc(doc(db, "posteos", postId));
            setPosts(posts.filter((post) => post.id !== postId));
            console.log("Post eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar el post:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo más tarde.');
        }
    };



    return (
        <AppContext.Provider value={{ user, users, posts, signOut: handleSignOut, deletePost: deletePostId }} >
            {children}
        </AppContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export function useAppContext() {
    return useContext(AppContext);
}
