import { BACKEND_URL } from "../config/env"


export const fetchUser = async ()=>{
const url = `${BACKEND_URL}/api/user`

const response = await fetch(url, {
    credentials : "include",
    header: {
        "Content-Type": "application/json"
    },
});
const data = await response.json()
if(!data.success) return console.log(data.message)
const user = data.user;
return user
   
}