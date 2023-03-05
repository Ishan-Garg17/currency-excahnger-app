const API_Key:any = process.env.REACT_APP_API_KEY
var myHeaders = new Headers();
myHeaders.append("apikey", API_Key);
export const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};