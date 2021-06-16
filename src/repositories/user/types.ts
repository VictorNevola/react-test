import { AxiosResponse } from 'axios';

export interface IpropsCreateUserPj{
    dataPayload: FormData
}

export interface IDataForm {
    cnpj: string,
    companyName: string,
    email: string,
    name: string,
    phone: string   
    password: string,
}

export interface IuserPj {
    id: string,
    cnpj: string,
    companyName: string,
    email: string,
    name: string,
    phone: string
}

export interface IMessage {
    messageError: string
}

export interface DataPayloadAutenticateUSer {
    userEmailOrCnpj: string,
    password: string
}

export interface IautenticateUser {
    payloadUser: {
        email: string,
        authenticate: boolean
    }
    token: {
        expireTime: string,
        value: string
    }
}