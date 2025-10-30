import { useRef, useState } from 'react';
import { CloseIcon } from './../icons/CloseIcon';
import { Button } from "./Button";
import { Input } from './Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';
export function ContentModel({ open, onClose }: any) {
    //@ts-ignore
    const linkRef = useRef<HTMLInputElement>();
    //@ts-ignore
    const TitleRef = useRef<HTMLInputElement>();
    enum ContentType {
        Youtube = "youtube",
        Twitter = "twitter"
    }
    const [type, setType] = useState(ContentType.Youtube)

    async function AddContent() {
        const link = linkRef.current?.value;
        const title = TitleRef.current?.value;
        await axios.post(`${BACKEND_URL}api/v1/content`, {
            link,
            title,
            type

        }, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        onClose()
    }

    return <div>
        {open && <div>
            <div className="h-screen w-screen bg-black fixed opacity-60 top-0 left-0 flex justify-center">

            </div>
            <div className="h-screen w-screen fixed  top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end">
                            <div onClick={onClose} className='cursor-pointer'>
                                <CloseIcon />
                            </div>
                        </div>
                        <div>
                            <Input referance={TitleRef} placeholder={"Title"} />
                            <Input referance={linkRef} placeholder={"Link"} />
                            <div className='flex justify-center gap-2 p-4'>
                                <Button onClick={() => {
                                    setType(ContentType.Youtube)
                                }} text='Youtube' variant={type === ContentType.Youtube ? "secondry" : "primary"}></Button>
                                <Button onClick={() => {
                                    setType(ContentType.Twitter)
                                }} text='Twitter' variant={type === ContentType.Twitter ? "secondry" : "primary"}></Button>

                            </div>
                            <div className="flex justify-center">
                                <Button onClick={AddContent} variant="secondry" text="Submit" />
                            </div>
                        </div>
                    </span>
                </div>

            </div>

        </div>}
    </div>
}
