"use client";

import { useState } from "react";
import { redirect } from 'next/navigation';
import { style } from "../_style/style";
import { Pedido, UserInfo, ConsentRecord } from "../_db/dbtypes"; 
import { DB_Access } from "../_db/dbaccess"; 
import { setCookie } from "../_db/cookie";
import Textbox from "../_style/textbox";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    consentTerms: false,
    consentMarketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Insira um nome válido.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      next.email = "Insira um email válido.";
    if (form.password.length <= 0)
      next.password = "Insira uma senha válida.";
    if (form.password !== form.confirmPassword)
      next.confirmPassword = "Senhas não conferem.";
    if (!form.consentTerms)
      next.consentTerms = "Você precisa aceitar os termos para continuar.";
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Registro de consentimento LGPD — salvar junto ao cadastro no backend
    let consentRecord : ConsentRecord = {
      consentTerms: form.consentTerms,
      consentMarketing: form.consentMarketing,
      policyVersion: "1.0",
      timestamp: new Date().toISOString(),
    };

    let info: UserInfo = {
      email: form.email,
      password: form.password,
      name: form.name,
      phone: form.phone,
      stars: 0,
      consent_record: consentRecord,
      accept_emails: form.consentMarketing,
      pedidos: {}
    }

    let dbaccess = new DB_Access();

    dbaccess.createUser(form.email, info);

    let session = dbaccess.getSession(form.email, form.password);
    setCookie("session", session);

    setSubmitted(true);
  };

  if (submitted) {redirect("/");}
  
  return (
    <div className={style.main_div_class} style={style.main_div_style}>
      <div className={style.main_div_inner_class}>
        <>
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
              Crie sua conta
              <br />
            </h1>

            <form className="w-full max-w-sm" onSubmit={handleSubmit} noValidate>
              <Textbox
                label="Nome"
                name="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
              />
              <Textbox
                label="Telefone"
                name="phone"
                type="text"
                placeholder="21999999999"
                value={form.phone}
                onChange={handleChange}
                autoComplete="phone"
              />
              <Textbox
                label="Email"
                name="email"
                type="email"
                placeholder="jane@exemplo.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />
              <Textbox
                label="Senha"
                name="password"
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="new-password"
              />
              <Textbox
                label="Confirme sua senha"
                name="confirmPassword"
                type="password"
                placeholder="Repita sua senha"
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />

              {/* Aviso de finalidade — LGPD art. 9º */}
              <p className="text-xs mb-4 mt-2" style={{ color: style.grey, lineHeight: 1.5 }}>
                Seus dados são coletados exclusivamente para criação e gestão da sua conta,
                conforme nossa{" "}
                <a href="/privacidade" style={{ color: style.white }}>Política de Privacidade</a>.
              </p>

              {/* Consentimento obrigatório — LGPD art. 7º, I */}
              <div className="mb-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentTerms"
                    checked={form.consentTerms}
                    onChange={handleChange}
                    className="mt-1 shrink-0"
                   
                    aria-describedby={errors.consentTerms ? "consentTerms-error" : undefined}
                    aria-invalid={!!errors.consentTerms}
                  />
                  <span className="text-xs" style={{ color: style.grey, lineHeight: 1.5 }}>
                    Li e concordo com os{" "}
                    <a href="/termos" style={{ color: style.white }}>Termos de Uso</a> e a{" "}
                    <a href="/privacidade" style={{ color: style.white }}>Política de Privacidade</a>,
                    e autorizo o tratamento dos meus dados pessoais para as finalidades descritas.{" "}
                    <span style={{ color: "#e05555" }}>*</span>
                  </span>
                </label>
                {errors.consentTerms && (
                  <p id="consentTerms-error" className="text-xs mt-1" style={{ color: "#e05555" }} role="alert">
                    {errors.consentTerms}
                  </p>
                )}
              </div>

              {/* Consentimento opcional de marketing — LGPD art. 7º, I */}
              <div className="mb-5">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentMarketing"
                    checked={form.consentMarketing}
                    onChange={handleChange}
                   
                    className="mt-1 shrink-0"
                  />
                  <span className="text-xs" style={{ color: style.grey, lineHeight: 1.5 }}>
                    Aceito receber comunicações de marketing e novidades por e-mail.
                    Você pode cancelar a qualquer momento.{" "}
                    <span className="italic">(opcional)</span>
                  </span>
                </label>
              </div>

              <button type="submit" 
                className={style.button_style}
                style={{backgroundColor: style.white, color: style.black}}>
                Criar conta
                <span className="btn-arrow">→</span>
              </button>
            </form>

            <div className="mb-4"/>

            <p className="text-center mb-4 small" style={{color:style.grey}}>
              Já possui uma conta?{" "}
              <a href="/login" style={{color:"#d7e1f5"}}>Login</a>
            </p>
          </>
        </div>
    </div>
  );
}
