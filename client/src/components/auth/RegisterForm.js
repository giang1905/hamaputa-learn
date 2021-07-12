import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";


const RegisterForm = () => {

  const { registerUser } = useContext(AuthContext);

  // Router
  // const history = useHistory();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    user: "",
    pass: "",
    confirmPass: ""
  });

  const [alert, setAlert] = useState(null);

  const { user, pass, confirmPass } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

  const register = async (event) => {
    event.preventDefault();
    if (pass !== confirmPass) {
      setAlert({ type: 'danger', message: 'Not matching Pass and confirming Pass' });
      setTimeout(() => setAlert(null), 5000);
      return
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
        // history.push("/dashboard");
      }
      //console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="user"
            required
            value={user}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="pass"
            required
            value={pass}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPass"
            required
            value={confirmPass}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
