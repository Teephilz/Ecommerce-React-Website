import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB, storage} from '../../fireabase/FirebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { Timestamp, doc, setDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setProfilePic] = useState(null);

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async (e) => {
         e.preventDefault();
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user= userCredential.user;

            // console.log(users)
            const storageRef= ref(storage, `images/${email}`)
            const uploadTask= uploadBytesResumable(storageRef, file);
    
            uploadTask.on((error)=>{
                toast.error(error.message)
            }, ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                    setUrl(downloadURL);

                        // if we are just adding documents with no specific id
                        // we will use addDoc
                        // const collRef= coll(fireDB, "users");
                        //const payLoad={}

                        // await addDoc(collRef, payload);
                        const docRef= doc(fireDB, "users", user.uid);
                        const payLoad= {
                            name: name,
                            uid: user.uid,
                            email: user.email,
                            time : Timestamp.now(),
                            photoUrl:downloadURL
                        };

                        await setDoc(docRef, payLoad).then(()=>{
                        toast.success("Signup Succesfully")
                        setName("");
                        setEmail("");
                        setPassword("");
                        setLoading(false)
                    })
                });
    
              
        })

            //  user = {
            //     name: name,
            //     uid: user.user.uid,
            //     email: user.user.email,
            //     time : Timestamp.now(),
            //     photoUrl:Url
            // }
            // const userRef = collection(fireDB, "users")
            // await addDoc(userRef, user);
        
            
         
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='ProfilePic'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup   