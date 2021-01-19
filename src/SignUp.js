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
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from '@react-firebase/auth';
import { firebaseConfig } from './firebase/firebaseConfig';


function SignUp() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const history = useHistory()

  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
    <Form
      name="normal_signup"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {/* Username field */}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please enter a Username!',
          },
        ]}
      >
        <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="Username" />
      </Form.Item>

      {/* Email field */}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter an Email!',
          },
        ]}
      >
        <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        className="email-input"
        placeholder="Email" />
      </Form.Item>

      {/* Password field */}
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
          className="password-input"
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {/* Confirm Password field */}
      <Form.Item
        name="confirm-password"
        rules={[
          {
            required: true,
            message: 'Please confirm your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      {/* A JSX comment */}
      <Form.Item>
        <Button 
        type="primary" htmlType="submit" className="login-form-button"
        onClick={() => {
          firebase.auth().signInWithEmailAndPassword("nathantaylormckenzie@hotmail.com", 12345)
              .then((user) => {
                
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
              });
        }}
        >
          Sign up
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
          Sign In with Google
        </Button>
        <Button
        type="primary" htmlType="submit" className="login-form-button"
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
            history.goBack();
          }}
          
        >
          Sign In Anonymously
        </Button>
          Already have an account? <Link to="/login">Login</Link>
      </Form.Item>
    </Form>
    </FirebaseAuthProvider>
  );

}

export default SignUp;
