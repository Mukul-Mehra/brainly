import { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from './../components/Button';
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signup() {
    const  navigate = useNavigate();
    //@ts-ignore
    const usernameRef = useRef<HTMLInputElement>();
    //@ts-ignore
    const passwordRef = useRef<HTMLInputElement>();

    async function signup() {

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}api/v1/signup`, {
            username,
            password
        })
        alert("signup done")
        navigate("/signin")
    }

    return <div className="flex bg-gray-200 h-screen w-screen justify-center items-center">
        <div className="min-w-48 bg-white rounded-lg p-6 ">
            <Input referance={usernameRef} placeholder="Username" />
            <Input referance={passwordRef} placeholder="Password" />

            <div className="flex justify-center items-center max-w-full">
                <Button onClick={signup} fullWidth={true} variant="secondry" text="Submit" />
            </div>
        </div>
    </div>
}
