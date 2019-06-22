import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


const Wrapper = styled.div`
    background-color: #333;
    overflow: hidden;
`

const Link = styled(NavLink)`
    float: left;
    color: #f2f2f2;
    background-color: #333;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    :hover {
        background-color: #ddd;
        color: black;
    }
`
const activeStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
}

const navigation = () => {
    return (
        <Wrapper>
            <Link to="/" activeStyle={activeStyle} exact >Home</Link>
            <Link to="/register" activeStyle={activeStyle}>Register</Link>
            <Link to="/play" activeStyle={activeStyle}>Play</Link>
            <Link to="/statistic" activeStyle={activeStyle}>Statistic</Link>
        </Wrapper>)
}

export default navigation