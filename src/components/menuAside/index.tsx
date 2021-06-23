import * as S from './style';
import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { LinkMenu } from './LinkMenu';
import linksMenu from '../../data/menu.json';
import { useAuth } from '@contexts/auth';

const Menu = () => {

    const [activeMenuMobile, setActiveMenuMobile] = useState(false);
    const { user } = useAuth();
    
    return (
        <>  
            <S.BtnOpenMenu onClick={() => setActiveMenuMobile(true) }> 
                <HiMenu color="#fff"/>
            </S.BtnOpenMenu>

            <S.AsideMenu isActive={activeMenuMobile}>

                <S.Header>
                    <S.BtnCloseMenu onClick={() => setActiveMenuMobile(false) }> 
                        <AiOutlineClose color="#fff"/>
                    </S.BtnCloseMenu>
                    <S.Avatar>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity=".3"></circle>
                            <path d="M20.6 20.002a3 3 0 013 3v.6h-1.2v-.6a1.8 1.8 0 00-1.8-1.8h-9.616C10 21.202 9.2 22 9.2 22.986v.6H8v-.6a2.984 2.984 0 012.984-2.984H20.6zM15.8 8a5.4 5.4 0 110 10.802A5.4 5.4 0 0115.8 8zm0 1.2a4.2 4.2 0 100 8.402 4.2 4.2 0 000-8.402z" fill="#fff"></path>
                        </svg>
                    </S.Avatar>
                    <S.Name>
                        Olá, {user?.companyName.split(' ')[0]}
                    </S.Name>
                </S.Header>

                <S.List>

                    {
                        linksMenu.map((link, index) => {
                            return (
                                <LinkMenu 
                                    key={index}
                                    titleLink={link.titleLink} 
                                    urlLink={link.urlLink} 
                                    svgLink={link.svgLink}
                                    hasSubMenu={link.hasSubMenu}
                                    linksSubMenu={link.linksSubMenu}
                                />
                            );
                        })
                    }
                    
                </S.List>

            </S.AsideMenu>
        </>
    )
}

export default Menu;