import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function useAddContent() {
    const [contents, setContents] = useState([]);
    function refresh() {
        axios.get(`${BACKEND_URL}api/v1/content`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.content)
            }).catch((e) => {
                console.log(e);
                if (e.response?.status === 401) {
                    localStorage.removeItem("token");
                    // redirect to login or show toast
                }
            });
    }
    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    return contents

}