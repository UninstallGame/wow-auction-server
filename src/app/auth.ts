import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import {clientId, clientSecret} from "../../settings";

export class Auth {
    private token: string | undefined;

    public async getToken(): Promise<string> {
        const response = await this.getNewToken();
        this.token = response.data.access_token
        return this.token;

    }

    // todo доделать
    private async checkToken(): Promise<boolean> {
        if (!this.token) {
            return false;
        }
        const result = await axios.get(`https://eu.battle.net/oauth/check_token?access_token${this.token}`)
        return !!result;
    }

    private async getNewToken(): Promise<AxiosResponse<{ access_token: string }>> {
        return await axios.get(`https://eu.battle.net/oauth/token`, {
            auth: {
                username: clientId,
                password: clientSecret,
            },
            params: {
                grant_type: 'client_credentials',
            },
        });
    }
}
