import axios, { AxiosResponse } from 'axios'

export type LoginService = {
    login: (credentials : { username: string, password: string }) => Promise<AxiosResponse<any>>;
}

export const loginService = new (class LoginServiceLocal implements LoginService {

    private url = "http://localhost:3001";

    login(credentials: {username: string, password: string}) {
        const _url = this.url + "/api/loginUser";
        // sends request to backend and returns a promise
        return axios.post(_url, credentials);
    }
})();
