import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthButton = styled.button`
  height: 48px;
  width: 320px;
  background-color: #1a7541;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #ffffff;
  font-weight: black;
`;

export const AuthMainLink = styled(Link)`
  height: 48px;
  width: 320px;
  background-color: #1a7541;
  border-radius: 25px;
  border: 2px solid rgb(26, 117, 65);
  font-size: 14px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #ffffff;
  font-weight: black;
  text-decoration: none;
`;

export const AuthSubLink = styled(Link)`
  height: 48px;
  width: 320px;
  padding: auto;
  background-color: #c8c8c8;
  border-radius: 25px;
  border: 2px solid rgb(0, 48, 0);
  line-height: 48px;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.56px;
  color: #3f3f3f;
  font-weight: black;
`;
