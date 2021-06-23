import React from 'react';
import * as Style from './styles';
import { props } from './types';

import Header from '@components/header/logged';
import Menu from '@components/menuAside/';

const Layout = ({ children, titlePage }: props) => {
  return(
      <Style.Main>
          <Menu />
          <Style.Content>
              <Header titlePage={ titlePage } />
              <Style.Page> 
                  {
                      children
                  }
              </Style.Page>
          </Style.Content>
      </Style.Main>
  )
}

export default Layout;