import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";
import { shade } from "polished";

import api from "../../services/api";

import { Container } from "./styles";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon({ toggleTheme }) {
  const [id, setId] = useState("");
  const { colors, title } = useContext(ThemeContext);

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (error) {
      alert("Falha no login, tente novamente");
    }
  }

  return (
    <Container>
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <div className="test">
        <Switch
          onChange={toggleTheme}
          checked={title === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={shade(0.25, colors.primary)}
          onColor={colors.secundary}
        />
        <img src={heroesImg} alt="Heroes" />
      </div>
    </Container>
  );
}
