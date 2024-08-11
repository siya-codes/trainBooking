import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "./api";
import toast, { Toaster } from "react-hot-toast";

export default function UserRegistration() {
    let navigate = useNavigate();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    // const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [CPassword, setCPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [Allok, setAllok] = useState(false);
    const [registerVaild, setregisterVaild] = useState(false)
    const [otp, setotp] = useState()
    const [showotpfield, setshowotpfield] = useState(false)

    const [isSubmit, setIsSubmit] = useState(false);

    const validate = (out) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        setAllok(true);
        // console.log(Allok);
        if (!out.FirstName) {
            errors.firstname = "Name is required!";
            setAllok(false);
        }
        if (!out.LastName) {
            errors.lastname = "Name is required!";
            setAllok(false);
        }
        if (!out.PhoneNumber) {
            errors.phonenumber = "phonenumber is required!";
            setAllok(false);
        }
        if (!out.UserName) {
            errors.username = "Username is required!";
            setAllok(false);
        }
        if (!out.Email) {
            errors.email = "Email is required!";
            setAllok(false);
        } else if (!regex.test(out.Email)) {
            errors.email = "This is not a valid email format!";
            setAllok(false);
        }
        if (!out.Password) {
            errors.password = "Password is required";
            setAllok(false);
        } else if (out.Password.length < 4) {
            errors.password = "Password must be more than 4 characters";
            setAllok(false);
        } else if (out.Password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
            setAllok(false);
        }
        if (!CPassword.length) {
            errors.cpassword = "Confirm Password is required";
            setAllok(false);
        } else if (out.Password !== CPassword) {
            errors.cpassword = "Password Doesn't match";
            setAllok(false);
        }
        return errors;
    };
async function Generate(){
    if(!Email){
        toast.error("Email required for OTP")
    }
    else{
        try {
            const data=await fetch(BASE_URL+'/generateotp',{
                method:'POST',
                headers:{
                    'Accept':"application/json",
                    'Content-type':"application/json",
                },
                body:JSON.stringify({email:Email})
            })
            const response=await data.json();
            if(response.success){
                toast.success(response.message)
                setshowotpfield(true)
            }
            else{
                toast.error(response.message)
            }
            
        } catch (error) {
            
        }
    }
}
async function Verify(){
    if(!Email){
        toast.error("Email required for OTP")
    }
   else if(!otp){
        toast.error("OTP required for verification")
    }
    else{
        try {
            const data=await fetch(BASE_URL+'/verifyotp',{
                method:'POST',
                headers:{
                    'Accept':"application/json",
                    'Content-type':"application/json",
                },
                body:JSON.stringify({email:Email,otp})
            })
            const response=await data.json();
            if(response.success){
                toast.success(response.message)
                setregisterVaild(true)
            }
            else{
                toast.error(response.message)
            }
            
        } catch (error) {
            
        }
    }
}

    async function Submit() {
        // e.preventDefault();
        // console.log(Allok);
        const out = {
            "FirstName": FirstName,
            "LastName": LastName,
            "PhoneNumber":PhoneNumber,
            "UserName": UserName,
            "Email": Email,
            "Password": Password
        };
        setFormErrors(validate(out));
        // console.log(Allok);
        // console.log(formErrors)
        // console.log(out);
        if (Allok) {
            axios.post(BASE_URL+'/signup', out)
                .then(function (response) {
                    // console.log(response.data);
                    // console.log(response.status);
                    setIsSubmit(true);
                    localStorage.setItem('token',response.data.token)
                    navigate('/UserOperations')
                })
                .catch(function (error) {
                        toast.error("Internal server error")
                });
        }
    }
    return (
        <>
        <Toaster/>
            <div className='insert'>
               
            <div className="Userform">
            {/* <div><img className="reg" src ={Register} alt="admin" /></div> */}
                    <h1>USER REGISTRATION</h1>
                    <div >
                        <label>First Name</label>
                        {<label className="labelalert">{formErrors.firstname}</label>}
                    </div>
                    <input required type="text" placeholder="First Name" onChange={event => setFirstName(event.target.value)}></input>

                    <div >
                        <label>Last Name</label>
                        {<label className="labelalert">{formErrors.lastname}</label>}
                    </div>
                    <input required type="text" placeholder="Last Name" onChange={event => setLastName(event.target.value)}></input>

                    <div >
                        <label>Phone Number</label>
                        {<label className="labelalert">{formErrors.phonenumber}</label>}
                    </div>
                    <input required type="text" placeholder="Phone number" onChange={event => setPhoneNumber(event.target.value)}></input>


                    <div >
                        <label>Username</label>
                        {<label className="labelalert">{formErrors.username}</label>}
                    </div>
                    <input required type="text" placeholder="Username" onChange={event => setUserName(event.target.value)}></input>

                    <div >
                        <div className="flex justify-between w-full"><label>Email</label>{ !registerVaild ? <p onClick={Generate} className="font-semibold text-black  cursor-pointer">Send OTP</p>:''}</div>
                        {<label className="labelalert">{formErrors.email}</label>}
                    </div>
                    <input required type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}></input>
                    {showotpfield && !registerVaild? <div >
                        <div className="flex justify-between w-full"><label>OTP</label><p onClick={Verify} className="font-semibold text-black  cursor-pointer">Verify</p></div>     
                    <input required type="number" placeholder="OTP" onChange={event => setotp(event.target.value)}></input>
                    </div>:''
}
                    <div >
                        <label>Password</label>
                        {<label className="labelalert">{formErrors.password}</label>}
                    </div>
                    <input required type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>

                    <div >
                        <label>Confirm Password</label>
                        {<label className="labelalert">{formErrors.cpassword}</label>}
                    </div>
                    <input required type="password" placeholder="Confirm Password" onChange={event => setCPassword(event.target.value)}></input>


                    <div className={`w-full bg-[#F55A00] flex justify-center items-center p-2 mt-2 rounded text-white text-lg ${!registerVaild ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={registerVaild ? Submit : ''} disabled={registerVaild}>Register</div>
                    <br />
                    <NavLink className="p1" to="/UserLogin"><b>Already have account</b></NavLink>
                    </div>
                
            </div>


        </>
    );
}