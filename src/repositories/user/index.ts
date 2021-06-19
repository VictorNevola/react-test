import  { api, useFetch } from '../../services/api';
import { AxiosResponse, AxiosError } from 'axios'
import { captureCookie } from '@resources/cookies';
import { IuserPj, IDataForm, IautenticateUser, DataPayloadAutenticateUSer } from './types';

export const userLogged = async () => {
    const userTokem = captureCookie(process.env.IMEALS_AUTH_COOKIE || "") || "";
    const user: AxiosResponse<Array<IuserPj>> = await api.get('/userpj/infos', { headers: { authorization: `Bearer ${userTokem}` } })
    return user;
}

export const createUser = async (dataPayload: IDataForm) => {
    const user: AxiosResponse<IuserPj> | undefined = await api.post('/userpj/register', dataPayload)
        .then(data => data)
        .catch((err: AxiosError) => err.response);

    return user;
}

export const autenticateUser = async (dataPayload :DataPayloadAutenticateUSer) => {
    const userAutenticate:  AxiosResponse<IautenticateUser> | undefined = await api.post('/userpj/authenticate', dataPayload)
        .then(data => data)
        .catch((err: AxiosError) => err.response);
    return userAutenticate;
}