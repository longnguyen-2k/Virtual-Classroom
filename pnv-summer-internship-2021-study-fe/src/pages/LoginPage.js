import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import cookie from 'react-cookies';
import { useHistory } from 'react-router';
function LoginPage(props) {
  const history = useHistory();
  useEffect(() => {
    const user = cookie.load('user');
    if (user) history.push('/');
  }, []);
  return (
    <Row className="page-login">
      <Col md={6} lg={4}>
        <AuthForm />
      </Col>
    </Row>
  );
}

export default LoginPage;
