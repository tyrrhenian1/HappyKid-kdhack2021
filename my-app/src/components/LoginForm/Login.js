import React, { useState } from 'react';
import './Login.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const LoginForm = ({status, setAuth}) => {
    const history = useHistory();
    const [typeState, setTypeState] = useState('login');
    const onFinish = values => {
        const request = {
            email : values.email,
            password : values.password,
        };
        if(typeState === 'registration'){
            request.parent_email = values.parent_email;
            localStorage.setItem('parent_email', request.parent_email)

        }
        fetch(`http://localhost:5000/api/user/${typeState}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(request) // body data type must match "Content-Type" header
        }).then(e => {
            if(e.ok){
                localStorage.setItem('email', request.email)
                localStorage.setItem('loggined', true);
                setAuth(true);
            }
        })
    };
  return (
    <Form
      name="normal_login"
      className="login-form card"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <Form.Item
            name="email"
            rules={[
            {
                required: true,
                message: 'Ты забыл ввести почту!',
            },
            ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" type="email" placeholder="Почта" />
    </Form.Item>
    <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Ты забыл ввести пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />
    </Form.Item>
    {typeState === 'registration' ? 
        <Form.Item
        name="parent_email"
        rules={[
          {
            required: true,
            message: 'Ты забыл ввести почту родителя!',
          },
        ]}
        >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" 
          type="email"
          placeholder="Почта родителя"
        />
        </Form.Item>
        : null
    }
    <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомни меня</Checkbox>
        </Form.Item>

        <span className="href login-form-forgot">
          Забыл пароль
        </span>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
        {typeState === 'registration' ? 'Зарегистрироваться' : 'Войти'}
        </Button>
        {typeState === 'login' ? <><span>или</span><span onClick={() => setTypeState('registration')} className="href login-form-forgot">
        Зарегистрироваться
        </span></> : null }
      </Form.Item>
    </Form>);
};

export { LoginForm };