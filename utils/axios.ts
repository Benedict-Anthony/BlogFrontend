import axios from "axios"


export const AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
      
    }
})


const baseUrl = "http://127.0.0.1:8000/api/"


export async function UserInstance(method:string, url:string, data?:any, type?:string) {
    const token = JSON.parse(localStorage.getItem("token") as any)
     const response = await axios({
                method: method,
                headers: {
                    "Content-Type":`${type ? type : "application/json"}`,
                    "Authorization": `Bearer ${token?.access}`
                },
                url: `${baseUrl}${url}/`,
                data:data
                
            })

    return response
}