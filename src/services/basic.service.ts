import Config from '../config/config.json';

export default abstract class BasicService {

    static async fetchData(uri: string, params: any=null)  {
        try {
            let paramsString = "";
            if(params) {
                const keys = Object.keys(params)
                const searchParams = new URLSearchParams();
                for(const key of keys)
                    searchParams.append(key, params[key])
                    paramsString = searchParams.toString();
            }
            const res = await fetch(Config.BASE_URL + uri + (params ? "?" + paramsString : ""))
            return await res.json()
        } catch(error) {
            console.error("error >", error)
        }
    }

    static async postData(uri: string, params: any, method='POST') {
        const response = await fetch(Config.BASE_URL + uri, {
            method: method,
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        return response.json();
        // .then(response => response.json())
        // .then(json => console.log(json));
    }
}