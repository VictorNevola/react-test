import api from '../../services/api';
import useSWR from 'swr'
import { captureCookie } from '@resources/cookies';
import { AxiosResponse, AxiosError } from 'axios'
import { IuserPj, IDataForm, IautenticateUser, DataPayloadAutenticateUSer } from './types';

let userSet: IuserPj[]

const fetcherUser = (url: string, token: string) => api.get(url, { headers: { authorization: `Bearer ${token}`, } }).then((res) => res.data);

export const captureUser = async (tokemUser: string) => {

    const { data, error } = useSWR([`/userpj/infos`, tokemUser], fetcherUser);

    return {
        user: data,
        error: error
    }
}

export const userLogged = async () => {

    if( userSet && userSet.length > 0) return userSet;

    const userTokem = captureCookie(process.env.IMEALS_AUTH_COOKIE || "") || "";
    const { user } = await captureUser(userTokem);
    
    if(userTokem && user && user.data.length > 0){
        userSet = user.data;
        return userSet;
    }

    return false;

}

export const createUser = async (dataPayload: IDataForm) => {
    const user: AxiosResponse<IuserPj> | undefined = await api.post('/userpj/register', dataPayload)
        .then(data => data)
        .catch((err: AxiosError) => err.response);

    return user;
}

export const autenticateUser = async (dataPayload :DataPayloadAutenticateUSer) => {
    const userAutenticate:  AxiosResponse<IuserPj> | undefined = await api.post('/userpj/authenticate', dataPayload)
        .then(data => data)
        .catch((err: AxiosError) => err.response);
    return userAutenticate;
}