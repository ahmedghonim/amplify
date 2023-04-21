import { Auth } from "aws-amplify";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    Auth.signIn(userName, password);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userName">userName</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="userName"
                className="form-control"
                id="userName"
                placeholder="userName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;