import { Divider, Menu } from "antd";
import firebase from "firebase";
import React, { useState } from "react";
import styled from 'styled-components'


import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  CarTwoTone,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";


const { SubMenu, Item } = Menu;

const Header = () => {

  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut()
    dispatch({ type: 'log_out', payload: null })
    history.push('/login')
  }

  return (
    <UI>
      <Menu className="bgColor" theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Dev</Link>
        </Item>


        {
          user && !user.isAdmin && <Item key="cart" icon={<ShoppingCartOutlined />} className="float-right">
            <Link to="/cart">Cart</Link>
          </Item>
        }


        {
          user && !user.isAdmin && <Item key="wishlist" icon={<HeartFilled />} className="float-right">
            <Link to="/user/wishlist">Wishlist </Link>
          </Item>
        }




        {
          !user && (
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
              <Link to="/register">Register</Link>
            </Item>
          )
        }

        {
          !user && (
            <Item key="login" icon={<UserOutlined />} className="float-right">
              <Link to="/login">Login</Link>
            </Item>
          )
        }

        {user && (
          <SubMenu icon={<SettingOutlined />} title={user && user.name ? user.name : user.email.split('@')[0]} className="float-right" >
            {
              user && user.isAdmin && <Item key="setting:1"> <Link to="/admin/dashboard">Dashboard</Link></Item>
            }
            {
              user && !user.isAdmin && <Item key="setting:1">
                <Link to="/user/password"> Updates </Link>
              </Item>
            }

            {
              user && !user.isAdmin && <Item key="setting:2">
                <Link to="/myorders"> My Orders </Link>

              </Item>
            }
            <Item icon={<UserOutlined />} onClick={logout} >Logout</Item>
          </SubMenu>

        )}
      </Menu>

    </UI>
  );
};

const UI = styled.div`
.bgColor{
  background-color: #001529;
  color: #eeeeee;
}


`

export default Header;
