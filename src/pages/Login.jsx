import PropTypes from 'prop-types'
import useStorage, { Storage } from '../hooks/useStorage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from "yup";
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../slice/profileSlice';

 const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
  });
function Login(props) {
    const dispatch = useDispatch()
    const [reload,setReload] = useState(false)

  return (

    useStorage()?
    <props.afterLoginPage {...props}/>
    :
    <div className="flex justify-center items-center h-screen">
        <ToastContainer/>
        <Formik
        initialValues={{
        password: '',
        email: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values,actions) => {
            try{
                axios.post('https://react-camp-api.roocket.ir/api/admin/login',JSON.stringify(values),{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                })
                  .then(function (response) {
                    console.log(response);
                    toast.success('WellCome to your profile!', {
                        position: "top-right",
                        theme: "colored",
                        transition: Bounce,
                        });

                    localStorage.setItem(Storage.Token,response.data.token)
                    localStorage.setItem(Storage.UserName,response.data.name)
                    dispatch(setProfile(response.data.name))
                    actions.setSubmitting(false)
                    setReload(!reload);
                  })
                  .catch(function (error) {
                    // console.log(error);
                    toast.error(error.message, {
                        position: "top-right",
                        theme: "colored",
                        transition: Bounce,
                        });
                    // console.log(error.response.data.message)
                    toast.error(error.response?.data?.message, {
                        position: "top-right",
                        theme: "colored",
                        transition: Bounce,
                        });
                    actions.setSubmitting(false)
                  });

            }
            catch(error){
                console.log(error.message);
                toast.error(error.message, {
                    position: "top-right",
                    theme: "colored",
                    transition: Bounce,
                    });
                actions.setSubmitting(false)
            }


        }}
    >       {({isSubmitting}) => (
        <Form>
              <fieldset  disabled={isSubmitting} >
                <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <Field name="email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="email" className="text-red-600"/>
                </div>
                <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <Field name="password"  type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="password" className="text-red-600" />
                </div>
                <button className="flex justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
                   {`${isSubmitting?`Please wait `:`Submit`}`}
                   <ThreeDots
                        className=" text-white"
                        visible={isSubmitting}
                        height="20"
                        width="20"
                        color='white'
                        ariaLabel="three-circles-loading"
                        />
                </button>

            </fieldset >
        </Form>
    )}
    </Formik>

</div>
  )
}
Login.propTypes={
    setAllow:PropTypes.func
}
export default Login
