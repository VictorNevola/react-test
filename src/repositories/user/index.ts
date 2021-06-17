import api, { useFetch } from '../../services/api';
import { AxiosResponse, AxiosError } from 'axios'
import { captureCookie } from '@resources/cookies';
import { IuserPj, IDataForm, IautenticateUser, DataPayloadAutenticateUSer } from './types';
import { useDispatch } from 'react-redux';
import { setUser } from "@store/modules/user/actions"

export const userLogged = async () => {
    const dispatch = useDispatch();
    const userTokem = captureCookie(process.env.IMEALS_AUTH_COOKIE || "") || "";
    const { data, error } = useFetch('/userpj/infos', { authorization: `Bearer ${userTokem}` });
    dispatch(setUser(data))
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