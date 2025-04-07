import { useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { validateform } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';

const Register = () => {
  const navigation = useNavigate();
  const navigatetoLogin = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigation('/login')
    }, 3000);
  }
  const[formData, setFormData] = useState({
    name : '',
    email: '', 
    password: '',
    confirmPassword: '', 
})
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => { //targeting the input field on the basis of name attribute and capturing the changes made 
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const validationErrors = validateform(formData);
      setErrors(validationErrors); 

      if(Object.keys(validationErrors).length === 0){
        console.log('Form submitted successfully', formData);
        const res = await fetch("/api/users/", {
          method: 'POST', 
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),  //sending the form data in the form of body
        });
        if(!res.ok){
          const errorData = await res.json();
          throw new Error (errorData.message || "Registration failed");
        }
        const data = await res.json();
        console.log(data);
        navigatetoLogin();
      }
      }catch(error){
        console.error(error.message || 'Something went wrong');
      }
      
    
  }
  return (
    <div className = 'mx-4 my-4 h-[85vh] flex  justify-center px-2 py-2'>
        <div className = 'lg:h-full lg:max-w-1/2 border-2 rounded-lg shadow-lg bg-[#121212] text-white px-6 py-6 sm:w-full sm:h-auto'>
          <div className = 'text-center max-w-full mb-14'>
            <h3 className='sm:text-2xl md:text-4xl lg:text-6xl font-bold'>Welcome to Note.</h3>
            <p className='sm:text-sm md:text-lg lg:text-xl font-light'>Create a new Account</p>
          </div>
            <form onSubmit={handleSubmit}>
              <div className='relative mb-8'>
                <input 
                  type='text' 
                  name='name'
                  placeholder = 'Enter your name' 
                  className='w-full bg-white rounded-md h-8 pl-15 pr-6 py-3 text-black'
                  value={formData.name}
                  onChange={handleChange}
                  >
                  </input>
                {errors.name && <p className='text-red-500 text-[0.5rem] italic'>{errors.name}</p>}
                <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
              </div>
              <div className='relative mb-8'>
                <input 
                  type='email' 
                  name = 'email'
                  placeholder = 'Enter your email' 
                  className='w-full bg-white rounded-md h-8 pl-15 pr-6 py-3 text-black'
                  value={formData.email}
                  onChange={handleChange}
                  >
                  </input>
                  {errors.email && <p className='text-red-500 text-[0.5rem] italic'>{errors.email}</p>}
                <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
              </div>
              <div className='relative mb-8'>
                <input 
                  type='password' 
                  name = 'password'
                  placeholder = 'Enter your password' 
                  className='w-full bg-white rounded-md h-8 pl-15 pr-6 py-3 text-black'
                  value={formData.password}
                  onChange={handleChange}
                  ></input>
                  {errors.password && <p className='text-red-500 text-[0.5rem] italic'>{errors.password}</p>}
                <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
              </div>
              <div className='relative mb-8'>
                <input 
                  type='password' 
                  name= 'confirmPassword'
                  placeholder = 'Enter your password again' 
                  className='w-full bg-white rounded-md h-8 pl-15 pr-6 py-3 text-black'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  ></input>
                  {errors.confirmPassword && <p className='text-red-500 text-[0.5rem] italic'>{errors.confirmPassword}</p>}
                <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
              </div>
            </form>
            <div className='flex w-full justify-center py-3 mb-2'>
              <button 
                className='border-2 w-1/2 border-white mb-2 rounded-lg px-2 py-2 justify-center hover:bg-white hover:text-black cursor-pointer'
                type='submit'
                onClick={handleSubmit}
                >
                  Register
              </button>
            </div>
            {showPopup && <Popup message="Registration Successful!" onClose={() => setShowPopup(false)} />}
        </div>
      </div>
  )
}

export default Register