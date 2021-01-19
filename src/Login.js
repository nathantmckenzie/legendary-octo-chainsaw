import 'antd/dist/antd.css';
import './index.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
} from '@react-firebase/auth';
import { firebaseConfig } from './firebase/firebaseConfig';


function Login() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const history = useHistory() 

  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please enter your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter a Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Button
        type="primary" htmlType="submit" className="login-form-button"
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
              history.goBack();
            });
          }}
        >
          Log In with Google
        </Button>
        <Button
        type="primary" className="login-form-button"
          onClick={() => {
            firebase.auth().signOut().then(() => {
              
            }).catch((error) => {
              
            });
          }}
        >
          Log Out
        </Button>
        Dont have an account? <Link to="/signup">Sign up!</Link>
      </Form.Item>
    </Form>
    </FirebaseAuthProvider>
  );

}

export default Login;
