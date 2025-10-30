import axios from "axios";
import { Input } from "../components/Input";
import { Button } from './../components/Button';
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export function Signin() {
    const naviagte = useNavigate(); 
    //@ts-ignore
    const usernameRef = useRef<HTMLInputElement>();
    //@ts-ignore
    const passwordRef = useRef<HTMLInputElement>();

    async function signin() {

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}api/v1/signin`, {
            username,
            password
        })
        alert("signin done")

        const jwt = response.data.token;
        localStorage.setItem("token", jwt);

        naviagte("/dashboard");
    }


    return <div className="flex bg-gray-200 h-screen w-screen justify-center items-center">
        <div className="min-w-48 bg-white rounded-lg p-6 ">
            <Input placeholder="Username" referance={usernameRef} />
            <Input placeholder="Password" referance={passwordRef} />

            <div className="flex justify-center items-center max-w-full">
                <Button onClick={signin} fullWidth={true} variant="secondry" text="Submit" />
            </div>
        </div>
    </div>
}
