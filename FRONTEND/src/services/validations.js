    export const validateSignup = (formData) => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is requiered";
    }else if (formData.username.length < 4 || formData.username.length > 100) {
      newErrors.username = "Username must be between 4 and 100 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    console.log(newErrors)
    return newErrors;
  };

  export const validateLogin = (formData)=>{
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is requiered";
    }
    if (!formData.password){
      newErrors.password = "Password is required"
    }
    return newErrors
}
  