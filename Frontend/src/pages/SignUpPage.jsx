import React, { useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User,Mail,Lock } from "lucide-react";
import "../style/style.css";

const SignUpPage = () => {
  // const [showPassword,setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const {signup,isSigningUp} = useAuthStore(false);

  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  // }

  // const validateInput = ()=>{

  // }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
        <div className ="flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-800">
            <div className="w-full max-w-md space-y-8 ">
              <div className = "text-center  mb-8">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className='size-6 text-primary' />
                  </div>
                  <h1 className="text-2xl font-bold mt-2">
                    Create Account
                  </h1>
                  <p className="text-base-content/60">
                    Get Started With Your Free Account
                  </p>
                </div>

              </div>
            </div>
            
        </div>
      
    </div>
  );
};

export default SignUpPage;
