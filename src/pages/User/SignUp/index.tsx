import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import ReactLoading from 'react-loading';

import NotLoggedHeader from '@components/header/notLogged';

import { cnpjValidation } from '@resources/validatorCnpj';
import { encrypts } from '@resources/cryptr';

import { createUser } from '@repositories/user';

import { IDataForm } from './types';
import * as Style from './styles';

export default function SignUp(): JSX.Element {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [cnpjInvalid, setCnpjInvalid] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);

  const onSubmit = async (data: IDataForm) => {
    setLoaderActive(true);
    const cnpjIsValid = cnpjValidation(data.cnpj);

    if (cnpjIsValid) {
      setCnpjInvalid(false);
      data.password = await encrypts(data.password);
      const userCreated = await createUser(data);

      console.log("userCreated", userCreated)

      return setLoaderActive(false);
    };

    return setCnpjInvalid(true);

  };


  return (
    <>
      <NotLoggedHeader />

      <Style.mainContainer>
        <Style.h1>Insira os dados da sua Empresa</Style.h1>

        <Style.form onSubmit={handleSubmit(onSubmit)}>
          <Style.formFields>

            <Style.formRow>
              <Style.divInput>
                <Style.titleInput> CNPJ  </Style.titleInput>
                <Style.input>
                  <Controller
                    as={InputMask}
                    control={control}
                    alwaysShowMask={false}
                    placeholder="00.00.000/0000.00"
                    mask="99.999.999/9999-99"
                    maskChar={null}
                    name="cnpj"
                    rules={{ required: true, maxLength: 18, min: 18, pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/ }}
                    defaultValue={""}
                  />
                  {errors.cnpj?.type == "required" && <Style.infoError>Obrigatório</Style.infoError>}
                  {errors.cnpj?.type == "pattern" || cnpjInvalid && <Style.infoError>Inválido</Style.infoError>}
                </Style.input>
              </Style.divInput>

              <Style.divInput>
                <Style.titleInput> Razão Social  </Style.titleInput>
                <Style.input>
                  <Controller
                    as={InputMask}
                    control={control}
                    alwaysShowMask={false}
                    mask=""
                    maskChar={null}
                    name="companyName"
                    placeholder="Imeals - LTDA"
                    defaultValue={""}
                    rules={{ required: true }}
                  />
                  {errors.companyName?.type == "required" && <Style.infoError>Obrigatório</Style.infoError>}
                </Style.input>
              </Style.divInput>
            </Style.formRow>

            <Style.formRow>

              <Style.divInput>
                <Style.titleInput> Telefone  </Style.titleInput>

                <Style.input>
                  <Controller
                    as={InputMask}
                    control={control}
                    alwaysShowMask={false}
                    placeholder="(00) 00000-0000"
                    mask="(99) 99999-9999"
                    maskChar={null}
                    name="phone"
                    rules={{ required: true, maxLength: 18, min: 18, pattern: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/ }}
                    defaultValue={""}
                    type="phone"

                  />
                  {errors.phone?.type == "required" && <Style.infoError>Obrigatório</Style.infoError>}
                  {errors.phone?.type == "pattern" && <Style.infoError>Inválido</Style.infoError>}
                </Style.input>

              </Style.divInput>

              <Style.divInput>
                <Style.titleInput> Email Principal  </Style.titleInput>

                <Style.input>
                  <Controller
                    as={InputMask}
                    mask=""
                    maskChar={null}
                    control={control}
                    name="email"
                    type="email"
                    placeholder="imeals@exemplo.com"
                    defaultValue={""}
                    rules={{ required: true, pattern: /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/ }}
                  />
                  {errors.email?.type == "required" && <Style.infoError>Obrigatório</Style.infoError>}
                  {errors.email?.type == "pattern" && <Style.infoError>Inválido</Style.infoError>}
                </Style.input>

              </Style.divInput>

            </Style.formRow>

            <Style.formRow>

              <Style.divInput>
                <Style.titleInput> Nome Responsavel</Style.titleInput>

                <Style.input>
                  <Controller
                    as={InputMask}
                    mask=""
                    maskChar={null}
                    control={control}
                    name="name"
                    type="text"
                    defaultValue={""}
                    rules={{ required: true }}

                  />
                  {errors.name?.type == "required" && <Style.infoError>Obrigatório</Style.infoError>}
                </Style.input>

              </Style.divInput>

              <Style.divInput>
                <Style.titleInput> Nova Senha  </Style.titleInput>

                <Style.input>
                  <Controller
                    as={InputMask}
                    mask=""
                    maskChar={null}
                    control={control}
                    name="password"
                    type="password"
                    defaultValue={""}
                    rules={{ required: true }}

                  />
                  {errors.password?.type == "required" && <Style.infoError>Obrigatório</Style.infoError>}
                </Style.input>

              </Style.divInput>

            </Style.formRow>

          </Style.formFields>

          {
            loaderActive ?
            <Style.loaderContainer>
              <ReactLoading type="spokes" height="32px" width="32px" />
            </Style.loaderContainer>
              :
              <Style.btnSubmit type="submit" value='Cadastrar' />
          }

          <Style.SpanLink>
            Já possui cadastro ?
            <Style.Alink>
              <Link to="/signin">
                Acessar minha conta
              </Link>
            </Style.Alink>
          </Style.SpanLink>

        </Style.form>

      </Style.mainContainer>
    </>
  )
}