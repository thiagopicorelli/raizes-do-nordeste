'use client';

import { style } from "../_style/style";
import { getCookie, setCookie } from "../_db/cookie";
import { DB_Access } from "../_db/dbaccess";
import { redirect } from 'next/navigation';
import Link from "next/link";
import { useState, useEffect } from 'react';

import Textbox from "../_style/textbox";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [dbaccess, setDBAccess] = useState({});

  const [errorstring, setErrorString] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setDBAccess(new DB_Access());
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent page reload

    if (Object.keys(dbaccess).length === 0) {
      return;
    }

    let session = dbaccess.getSession(formData.email, formData.password);

    if (session == -1) {
      setError(true);
      setErrorString("Erro no Login.");
      return;
    }

    setCookie("session", session);

    setSubmitted(true);
  };

  if (submitted) {redirect("/");}

  return (
    <div className={style.main_div_class} style={style.main_div_style}>
      
      <div className={style.main_div_inner_class}>
        <p
          className="mb-10 text-[22px] tracking-tight"
          style={style.header_style}
        >
          <a href="/">
          Raízes do Nordeste
          </a>
        </p>

        <h1
          className="mb-8 text-[32px] leading-[1.15]"
          style={style.header_style}
        >
          Seja bem vindo!
          <br />
        </h1>

        {error && (<p style={{color: "#e05555"}}>{errorstring}</p>)}

        <form className="w-full max-w-sm" id="form" onSubmit={handleSubmit}>
          <Textbox
              label="Email"
              name="email"
              type="email"
              placeholder="exemplo@exemplo.com"
              value={formData.email} 
              onChange={handleChange}
          />

          <Textbox
              label="Senha"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password} 
              onChange={handleChange}
          />

          <button
            className={style.button_style}
            style={{backgroundColor: style.white, color: style.black}}
          >
            Entrar
          </button>

          <div className="mt-4 flex justify-between">
            {/*<Link href="/forgot-password" className={style.small_text_style}">
              Esqueceu a Senha?
            </Link>*/}
            <Link href="/signup" className={style.small_text_style}>
              Criar conta
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
