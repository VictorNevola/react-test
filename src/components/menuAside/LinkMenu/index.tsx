import { Item, HR, DropDownIcon, OpenDropdown, ListDropDown, ItemDropdown } from './style';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IlinkMenu } from '../types';
import InlineSVG from 'svg-inline-react';

export const LinkMenu = ({ titleLink, urlLink, svgLink, hasSubMenu, linksSubMenu }: IlinkMenu) => {

    const [activeDropdown, setActiveDropdown] = useState(JSON.parse(localStorage.getItem("menuDropDownIsActive") || "false"));
    const setDropdown = () => activeDropdown ? setActiveDropdown(false) : setActiveDropdown(true);

    useEffect(() => localStorage.setItem("menuDropDownIsActive", JSON.stringify(activeDropdown)),[activeDropdown]);

    return (
        <>
            <Item>
                {
                    hasSubMenu && linksSubMenu ?
                        <>
                            <OpenDropdown onClick={() => setDropdown()}>
                                <InlineSVG src={svgLink} />
                                {titleLink}
                                <DropDownIcon isActive={activeDropdown} />
                            </OpenDropdown>
                            <ListDropDown isActive={activeDropdown}>
                                {
                                    linksSubMenu.map((subLink, index) => {
                                        return (
                                            <ItemDropdown key={index}>
                                                <NavLink to={subLink.urlLink} activeClassName="is-active">
                                                    {subLink.titleLink}
                                                </NavLink>
                                            </ItemDropdown>
                                        )
                                    })
                                }
                            </ListDropDown>
                        </>
                        :
                        <NavLink to={urlLink} activeClassName="is-active">
                            <InlineSVG src={svgLink} />
                            {titleLink}
                        </NavLink>
                }
            </Item>

            <HR />
        </>
    )
}