import { useState } from "react";
import PropTypes from "prop-types";

const LoginPage = ({ onEnter }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    //조건 할당
    if (userId.trim() === "") {
      alert("아이디를 입력해주세요.");
      return false;
    }
    if (password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    //할당 받은 이벤트 메소드 유효성 hnadler
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    onEnter();
  };

  return (
    <main className="page page--centered">
      <section className="card">
        <h1 className="card__title">Only Office 접속</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span className="form-field__label">아이디</span>
            <input
              className="form-field__input"
              type="text"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="kjcho@gbt.co.kr"
              autoComplete="username"
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">비밀번호</span>
            <input
              className="form-field__input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              autoComplete="current-password"
            />
          </label>

          <button type="submit" className="button button--primary">
            로그인
          </button>
        </form>
      </section>
    </main>
  );
};

LoginPage.propTypes = {
  onEnter: PropTypes.func.isRequired,
};

export default LoginPage;
