import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./loginSlice";
import { Button, Form, Input } from "antd";
import { Container } from "react-bootstrap";
import { decodeToken } from "react-jwt";
import { loginUser } from "../../services/apiCalls";

const Login = () => {
  const [messageText, setMessageText] = useState({ message: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let res = await loginUser(values);
    if (res == "Invalid E-mail or password.") {
      setMessageText({
        message: res,
      });
    } else {
      let decoded = decodeToken(res.jwt);

      let idrolenavigate = decoded.user.idrole;

      let userCredentials = {
        token: res,
        user: decoded.user,
      };

      dispatch(login(userCredentials));

      if (idrolenavigate == 2) {
        navigate("../userarea");
      } else if (idrolenavigate == 1) {
        navigate("../adminarea");
      } else {
        setMessageText({
          message: "This is weird",
        });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div
      className="loginDesign"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Form
        name="basic"
        style={{
          //   width: "20em",
          //   height: "20em",
          //   alignItems:"center",
          //   justifyContent: "center"
          //   marginTop: "5em",
          //   marginRight: "5em",
          marginLeft: "-3em",
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              className: "email",
              message: (
                <div style={{ color: "black", fontFamily: "Fredoka One" }}>
                  The input is not valid E-mail!
                </div>
              ),
            },
            {
              required: true,
              message: (
                <div style={{ color: "black", fontFamily: "Fredoka One" }}>
                  Please input your E-mail!
                </div>
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: (
                <div style={{ color: "black", fontFamily: "Fredoka One" }}>
                  Please input your password!
                </div>
              ),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            className="animeButton"
            htmlType="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              fontFamily: "Fredoka One",
              borderRadius: 50,
              marginTop: "1em",
              borderColor: "black",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className="messageText">{messageText.message}</div>
    </div>
  );
};

export default Login;
