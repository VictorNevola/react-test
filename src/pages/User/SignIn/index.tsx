import * as S from './styles';
import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';

import NotLoggedHeader from '@components/header/notLogged';

import { useAuth } from '@contexts/auth';

import { cnpjValidation } from '@resources/validatorCnpj';
import { emailValidator } from '@resources/validatorEmail';
import { encrypts } from '@resources/cryptr';
import history from "@resources/history";

export default function SigIn(): JSX.Element {

  const inputRef = useRef();
  const { handleSubmit, errors, control } = useForm();
  const [errorUser, setErrorUser] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);
  const { signed, Login } = useAuth();

  const onSubmit = async (data: { emailOrCnpj: string, password: string }) => {

    const isCnpj = cnpjValidation(data.emailOrCnpj);
    const isEmail = emailValidator(data.emailOrCnpj);

    if (isCnpj || isEmail) {
      setLoaderActive(true);

      const payload = {
        userEmailOrCnpj: data.emailOrCnpj,
        password: await encrypts(data.password)
      }

      const isAuthenticated = await Login(payload);
      
      if (isAuthenticated && isAuthenticated.status === 200) {

        toast.success("Sucesso!",{
          autoClose: 5000,
          onClose: () => history.push('/admin')
        });

        return setLoaderActive(false);
      }

      setLoaderActive(false);
      setErrorUser(false);
      return toast.error("Usuário ou senha incorretos",{ autoClose: 5000,});
    }

    return setErrorUser(true);
  }

  useEffect(() => {

    if(signed) {
      toast.success("Usuário já autenticado, sendo redirecionado!", {
        autoClose: 3000,
        onClose: () => history.push('/admin')
      })
    }

  }, [signed])

  return (
    <>
      <NotLoggedHeader />

      <S.mainContainer>
        <S.FormContainer>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.Title>
              Olá! Para continuar na sua conta, insira seus dados abaixo
            </S.Title>

            <S.divInput>
              <S.input>
                <Controller
                  as={<input />}
                  control={control}
                  name="emailOrCnpj"
                  placeholder="EMAIL OU CNPJ"
                  defaultValue={""}
                  rules={{ required: true }}
                  onFocus={() => inputRef.current}
                />
                {errors.emailOrCnpj?.type == "required" && <S.infoError>Obrigatório</S.infoError>}
                {errorUser && <S.infoError>E-mail ou Cnpj inválido</S.infoError>}
              </S.input>
            </S.divInput>

            <S.divInput>
              <S.input>
                <Controller
                  as={<input />}
                  control={control}
                  name="password"
                  type="password"
                  placeholder="SENHA"
                  defaultValue={""}
                  rules={{ required: true }}
                  onFocus={() => inputRef.current}
                />
                {errors.password?.type == "required" && <S.infoError>Obrigatório</S.infoError>}
              </S.input>

            </S.divInput>

            {
              loaderActive ?
                <S.loaderContainer>
                  <ReactLoading type="spokes" height="32px" width="32px" />
                </S.loaderContainer>
                :
                <S.btnSubmit type="submit" value='Continuar' />
            }

          </S.Form>

          <S.infoLinksBottom>

            <S.linkBottom>
              <Link to="/user/registration">
                Criar conta
              </Link>
            </S.linkBottom>


            <S.linkBottom>
              <Link to="/user/forgetPassword">
                Não sei minha senha
              </Link>
            </S.linkBottom>

          </S.infoLinksBottom>

        </S.FormContainer>
      </S.mainContainer>
    </>
  )
}