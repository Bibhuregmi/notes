
export const validateform = (formData) => {
    let errors = {}

    //validation for the name 
    if(!formData.name.trim()){ //checking for the empty spaces or just leading or trailing spaces in the input
        errors.name = "Name is a required field"; 
    }
    //email validataion
    if(!formData.email){
        errors.email = "Email is reqired";

    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
        errors.email = "Inavlid email format"; 
    }
    //password validation
    if(!formData.password){
        errors.password = "Password is required"; 
    }else if(formData.password.length < 8){
        errors.password = "Password must be at least 8 characters"
    }else if(!/[A-Z]/.test(formData.password)){
        errors.password = "Password must contain at least ONE uppercase characters"
    }else if(!/[a-z]/.test(formData.password)){
        errors.password = "Password must contain at least ONE lowercase characters"
    }else if(!/[0-9]/.test(formData.password)){
        errors.password = "Password must contain at least ONE number"
    }else if(!/[!@#$%^&*()_+={}:"|<>?~`]/.test(formData.password)){
        errors.password = "Password must contain at least ONE special character"
    }
    //confirm password validation
    if(!formData.confirmPassword){
        errors.confirmPassword = "Please confirm your password";
    }else if (formData.confirmPassword !== formData.password){
        errors.confirmPassword = "Passwords don't match"
    }

    return errors; 
}