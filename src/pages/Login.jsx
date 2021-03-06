import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, FacebookAuthProvider, GoogleAuthProvider,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {addDoc, collection,deleteDoc,doc,getDocs,updateDoc,docs,setDoc, getDoc} from 'firebase/firestore'
import { auth,database } from '../config/firebase'

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook ,FaGithub} from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux'
import { updateData,login } from '../features/auth'
import { providerLogin, signInMethods } from '../libs/auth'
import { useNavigate } from 'react-router-dom'
import Page from '../components/Page'
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()

export default function Login() {
    const [isLogin,setIsLogin] = useState(true)
    
    let navigate = useNavigate();
    
    const dispatch = useDispatch()
    const crear =()=>{

    }
    const login2 = (values,{setSubmitting,setErrors}) =>{
        
        if(isLogin){
        signInWithEmailAndPassword(auth,values.email,values.password)
        .then(result=>{
            setSubmitting(false)
            navigate('/')
            
        })
        .catch(error=>{
            setSubmitting(false)
            setErrors({
                credentials:"Las credenciales son incorrectas"
            })
        })
    }else{createUserWithEmailAndPassword(auth,values.email,values.password)
        .then(async(result)=>{
            
            const user1={
                name:values.name,
                email:result.user.email,
                profilePic:values.profilePic,
                id:result.user.uid,
                portadaPic:"https://images.unsplash.com/photo-1616039407041-5ce631b57879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"    
            }
        // await setDoc(doc(database,`usuarios/${result.user.uid}`),user1)
          
          updateProfile(result.user,{
            displayName:values.name,
            photoURL:values.profilePic
          }).then(()=>{
            
            dispatch(updateData({
              name:values.name,
              profilePic:values.profilePic
            }))
            
            
            navigate('/')
          })
          
        }).catch(error=>{
          console.log(error)
        })}
    }
    const loginWithProvider = (id)=>{
        providerLogin(id)
        .then(async(result)=>{
            console.log(result.user.uid)
            const col = collection(database,"usuarios")
            const snapshot = await getDocs(col)
            
            
            const users = []
            snapshot.forEach(doc=>{
                users.push({...doc.data(),id:doc.id})
            })
            console.log(users)
            let usuario 
            users.map((user)=>{
                if(user.id===result.user.uid){
                    usuario=user
                }
            })
            

            const user1={name:result.user.displayName,
                email:result.user.email,
                profilePic:result.user.photoURL,
                id:result.user.uid,
                portadaPic:"https://images.unsplash.com/photo-1616039407041-5ce631b57879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"   }
                console.log(user1)
        // await setDoc(doc(database,`usuarios/${result.user.uid}`),user1)
                dispatch(login(user1))
                navigate('/')

        })
        .catch(error=>console.log("Error",error))
    }

    // const googleLogin = ()=>{
    //     signInWithPopup(auth,googleProvider)
    //     .then(async(result)=>{
            
    //         const user1={name:result.user.displayName,
    //             email:result.user.email,
    //             profilePic:result.user.photoURL,
    //             id:result.user.uid}
    //     await setDoc(doc(database,`usuarios/${result.user.uid}`),user1)
    //     router.replace("/")
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //     })
    // }
    // const facebookLogin = ()=>{
    //     signInWithPopup(auth,facebookProvider)
    //     .then(result=>{
    //         router.replace("/")
            
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //     })
    // }
    // const githubLogin = ()=>{
    //     signInWithPopup(auth,githubProvider)
    //     .then(async(result)=>{
    //         const user1={name:result.user.displayName,
    //             email:result.user.email,
    //             profilePic:result.user.photoURL,
    //             id:result.user.uid}
    //         await setDoc(doc(database,`usuarios/${result.user.uid}`),user1)
    //         router.replace("/")
    //     })
    //     .catch(error=>{
    //         console.log(error)
    //     })
    // }

    // Reto: Completar el login con los dem??s providers
    // Extra: A??adir icono a los botones

  return (
    <Page>
        <section className=' max-w-6xl m-auto relative pt-4 '>
            
            <Formik 
                initialValues={{
                    email:"",
                    password:""
                }}

                onSubmit={login2}
            >
                {({errors,isSubmitting})=>{
                    return <section >
                        <Form className=' bg-violet-400 w-11/12 md:w-1/2 p-5 md:p-10 mx-auto mt-20 shadow-xl shadow-black rounded-t-lg'>
                            {isLogin?<h2 className=' text-center font-bold text-5xl mb-10'>Inicia sesi??n</h2>:<h2 className=' text-center font-bold text-5xl mb-10'>Registrate</h2>}
                            {isLogin?<div className='flex flex-col md:w-1/2 mx-auto gap-5'>
                                <Field className="p-3 rounded-md bg-violet-400" placeholder="Email..." type="email" name="email"/>
                                <Field className="p-3 rounded-md bg-violet-400" placeholder="Password..." type="password" name="password"/>
                                <button type='submit' className={`bg-violet-600 p-3 rounded-md text-white hover:text-shadow-lg hover:shadow-lg hover:bg-color4-comentarios ${isSubmitting&&"bg-red-500"}`}>Iniciar sesi??n</button>
                                <p className='text-center'>??No tienes cuenta?<button onClick={()=>{setIsLogin(!isLogin)}} className="hover:text-color1-nav">Registrate</button> </p>
                                

                            </div>:<div className='flex flex-col md:w-1/2 mx-auto gap-5'>
                                <Field className="p-3 rounded-md bg-color2-backg" placeholder="Email..." type="email" name="email"/>
                                <Field className="p-3 rounded-md bg-color2-backg" placeholder="Password..." type="password" name="password"/>
                                <Field className="p-3 rounded-md bg-color2-backg" placeholder="Nombre..." type="text" name="name"/>
                                <Field className="p-3 rounded-md bg-color2-backg" placeholder="Foto de Perfil..." type="text" name="profilePic"/>
                                <button className={`bg-color1-nav p-3 rounded-md text-indigo-900 hover:bg-indigo-400 ${isSubmitting&&"bg-red-500"}`}>Registrar cuenta!</button>
                                <p className='text-center'>??Ya tienes cuenta?<button onClick={()=>{setIsLogin(!isLogin)}} className="hover:text-color1-nav">Inicia Sesi??n</button> </p>
                                
                                

                            </div>}

                        </Form>
                        {errors&&<div className='absolute top-4 m-auto   h-fit transition ease-in-out delay-150  p-2 rounded  text-black '>{errors.credentials}</div>}
                        {isLogin&&<div className=' bg-violet-800   w-11/12 md:w-1/2  md:p-10 mx-auto shadow-xl shadow-black rounded-b-lg'>
                        <p className='text-center pb-4 text-white'>O inicia sesi??n con redes</p>
                        <div className='flex gap-14 justify-center pb-4 '>
                            
                            <button onClick={()=>{loginWithProvider(signInMethods.google)}}><FcGoogle className='text-3xl hover:bg-white rounded-full' /></button>
                            <button onClick={()=>{loginWithProvider(signInMethods.facebook)}}><FaFacebook className='text-3xl text-blue-800 bg-violet-300 hover:bg-white rounded-full'/></button>
                            {/* <button onClick={()=>{loginWithProvider(signInMethods.github)}}><FaGithub className='text-3xl hover:bg-white rounded-full'/></button> */}
                        </div>
                        </div>}

                    </section>
                }}
            </Formik>
            
            
        </section>
    </Page>
  )
}