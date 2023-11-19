import Axios from "axios";
import { useState } from "react";

Axios.defaults.withCredentials = true;

function Authentication() {
  const [phonenumberReg, setPhonenumberReg] = useState("");
  const [firstnameReg, setFirstnameReg] = useState("");
  const [lastnameReg, setLastnameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [userDisplay, setUserDisplay] = useState("");

  const [loginstatus, setLoginStatus] = useState(0);

  const googleAuth = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const reg = () => {
    Axios.post(
      "http://localhost:3001/Reg",
      {
        phonenumber: phonenumberReg,
        firstname: firstnameReg,
        lastname: lastnameReg,
        email: emailReg,
        password: passwordReg,
      },
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          // "Content-Type": "x-www-form-urlencoded",
        },
      }
    ).then((Response) => {
      console.log(Response.data);
      // setUserDisplay(Response.data.user.first_name);
    });
  };

  const login = () => {
    Axios.post(
      "http://localhost:3001/Login",
      {
        email: emailLogin,
        password: passwordLogin,
      },
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          // "Content-Type": "x-www-form-urlencoded",
        },
      }
    ).then((Response) => {
      if (Response.data.message) {
        alert(Response.data.message);
      }
      console.log(Response.data);
      // setUserDisplay(Response.data.user.email);
      fetchUserProfile();
    });
  };

  const fetchUserProfile = () => {
    console.log("inside fetchuser");
    Axios.post("http://localhost:3001/profile", {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        // "Content-Type": "x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log("inside fetchuser2");
        console.log(response.data);
        setUserDisplay(response.data.user.first_name);
        setLoginStatus(1);
      })
      .catch((error) => {
        // Handle unauthorized or other errors
        console.error("Error fetching user profile:", error);
        setUserDisplay("");
        setLoginStatus(0);
      });
  };

  const logout = () => {
    try {
      Axios.get("http://localhost:3001/logout");
      console.log("Logout successful");
      setLoginStatus(0);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="main-login">
      <div className="register">
        <h1>REGISTER</h1>
        <label>Phone Number</label>
        <input
          type="number"
          onChange={(e) => {
            setPhonenumberReg(e.target.value);
          }}
        />

        <label>First Name</label>
        <input
          type="text"
          onChange={(e) => {
            setFirstnameReg(e.target.value);
          }}
        />

        <label>Last Name</label>
        <input
          type="text"
          onChange={(e) => {
            setLastnameReg(e.target.value);
          }}
        />

        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={reg}>submit</button>
      </div>
      <div className="login">
        <h1>LOGIN</h1>
        <label>EMAIL</label>
        <input
          type="email"
          onChange={(e) => {
            setEmailLogin(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordLogin(e.target.value);
          }}
        />
        <button onClick={login}>submit</button>{" "}
      </div>
      <h1>{userDisplay}</h1>
      {loginstatus === 1 && <button onClick={logout}>logout</button>}
      <button onClick={googleAuth}>GOOGLE AUTH</button>{" "}
    </div>
  );
}

export default Authentication;
