import axios, { AxiosResponse } from 'axios'

export type AuthenticationService = {
    login: (credentials : { username: string, password: string , rememberMe: boolean}) => Promise<AxiosResponse<any>>;
    register: (credentials: { username: string, name?: string, surname?: string, email: string, password: string, rememberMe: boolean }) => Promise<AxiosResponse<any>>;
    changePassword: (credentials: {username: string, oldPassword: string, newPassword: string}) => Promise<AxiosResponse<any>>;
}

export const authenticationService = new (class AuthenticationServiceLocal implements AuthenticationService {

    private config = {timeout: 5000};
    private url = "http://localhost:3001";

    login(credentials: {username: string, password: string, rememberMe: boolean}) {
        const _url = this.url + "/api/loginUser";
        // sends request to backend and returns a promise
        return axios.post(_url, credentials, this.config);
    }

    register(credentials: { username: string, name?: string, surname?: string, email: string, password: string, rememberMe: boolean }) {
        const _url = `${this.url}/api/registerUser`;
        return axios.post(_url, credentials, this.config);
    }

    changePassword(credentials: {username: string, oldPassword: string, newPassword: string}) {
        const _url = `${this.url}/api/changePassword`;
        return axios.post(_url, credentials, this.config);
    }
})();
