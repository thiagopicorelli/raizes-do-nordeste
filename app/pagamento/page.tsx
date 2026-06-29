"use client";

import { useState, useEffect } from "react";
import { DB_Access } from "../_db/dbaccess";
import { getCookie } from "../_db/cookie";
import { redirect } from 'next/navigation'
import Image from "next/image";
import PIX_QR_PLACEHOLDER from "./pix.svg";
import Link from "next/link";
import { Pedido } from "../_db/dbtypes";

type PaymentMethod = "credit" | "pix";

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatPrice = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

var db;
var session;

export default function PaymentPage() {
  const [start, setStart] = useState(true);

  const [method, setMethod] = useState<PaymentMethod>("credit");
  const [card, setCard] = useState<CardData>({ number: "", name: "", expiry: "", cvv: "" });
  const [flipped, setFlipped] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState(900);

  const [valor, setValor] = useState(-1);

  useEffect(() => {
    if (start) {
      session = getCookie("session");
  
      if (session === "") {
        redirect("/login")
      }
  
      db = new DB_Access();
      var pedido = JSON.parse(localStorage.getItem("pedido"));
      
      //setValor(parseFloat(localStorage.getItem("price")));
      
      setValor(parseFloat(pedido.price))

      setStart(false);
      return;
    }

    if (method !== "pix" || paid) return;
    const interval = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [method, paid]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const pixKey = "00020126580014br.gov.bcb.pix0136exemplo@pix.com.br5204000053039865802BR5913Loja Exemplo6009SAO PAULO62070503***6304ABCD";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setPaid(true);

    var pedido = JSON.parse(localStorage.getItem("pedido")) as Pedido;

    db.addPedido(session, pedido);

    var stars = db.getStars(session) + Math.trunc(valor);
    db.setStars(session, stars)


  };

  const cardDisplay = card.number.padEnd(19, "·").replace(/ /g, " ");
  const expiryDisplay = card.expiry || "MM/AA";
  const nameDisplay = card.name || "SEU NOME";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0f0e17;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: #0f0e17;
          position: relative;
          overflow: hidden;
        }

        .page::before {
          content: '';
          position: fixed;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(212,163,115,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .page::after {
          content: '';
          position: fixed;
          bottom: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(108,93,211,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .container {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .header {
          margin-bottom: 2rem;
        }

        .brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: #d4a373;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #f5f0e8;
          font-weight: 700;
          line-height: 1.1;
          margin-top: 0.3rem;
        }

        /* Order summary */
        .summary {
          background: rgba(245,240,232,0.04);
          border: 1px solid rgba(245,240,232,0.08);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .summary-label {
          font-size: 0.78rem;
          color: rgba(245,240,232,0.4);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .summary-product {
          font-size: 0.95rem;
          color: #f5f0e8;
          font-weight: 500;
          margin-top: 0.2rem;
        }

        .summary-price {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #d4a373;
          font-weight: 700;
        }

        /* Method tabs */
        .tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
          background: rgba(245,240,232,0.04);
          border: 1px solid rgba(245,240,232,0.08);
          border-radius: 12px;
          padding: 0.35rem;
        }

        .tab {
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(245,240,232,0.45);
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }

        .tab.active {
          background: rgba(212,163,115,0.15);
          color: #d4a373;
          box-shadow: 0 0 0 1px rgba(212,163,115,0.3);
        }

        .tab:hover:not(.active) {
          color: rgba(245,240,232,0.7);
          background: rgba(245,240,232,0.04);
        }

        .tab svg { flex-shrink: 0; }

        /* Card preview */
        .card-scene {
          perspective: 1000px;
          margin-bottom: 1.75rem;
          height: 168px;
        }

        .card-3d {
          width: 100%;
          height: 168px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-3d.flipped { transform: rotateY(180deg); }

        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          padding: 1.25rem 1.5rem;
          overflow: hidden;
        }

        .card-front {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border: 1px solid rgba(212,163,115,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .card-back {
          transform: rotateY(180deg);
          background: linear-gradient(135deg, #16213e 0%, #1a1a2e 100%);
          border: 1px solid rgba(212,163,115,0.2);
        }

        .card-shimmer {
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(212,163,115,0.04) 50%, transparent 70%);
          pointer-events: none;
        }

        .card-chip {
          width: 36px; height: 28px;
          background: linear-gradient(135deg, #d4a373, #b8845a);
          border-radius: 5px;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
        }

        .card-chip::after {
          content: '';
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 1px;
          background: rgba(0,0,0,0.25);
          transform: translateY(-50%);
        }

        .card-number {
          font-family: 'DM Mono', monospace;
          font-size: 1.05rem;
          color: rgba(245,240,232,0.9);
          letter-spacing: 0.18em;
          margin-bottom: 1rem;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .card-meta-label {
          font-size: 0.6rem;
          color: rgba(245,240,232,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.15rem;
        }

        .card-meta-value {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          color: rgba(245,240,232,0.85);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .card-brand-logo {
          display: flex;
          gap: -6px;
        }

        .card-brand-circle {
          width: 28px; height: 28px;
          border-radius: 50%;
          opacity: 0.85;
        }

        /* Magnetic strip */
        .mag-strip {
          height: 36px;
          background: #0a0a14;
          margin: 1rem -1.5rem;
        }

        .cvv-strip {
          background: rgba(245,240,232,0.08);
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
          margin-top: 0.5rem;
          display: flex;
          justify-content: flex-end;
        }

        .cvv-dots {
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: rgba(245,240,232,0.7);
          letter-spacing: 0.2em;
        }

        /* Form */
        .form { display: flex; flex-direction: column; gap: 1rem; }

        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

        .field { display: flex; flex-direction: column; gap: 0.4rem; }

        .field label {
          font-size: 0.72rem;
          color: rgba(245,240,232,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .field input {
          background: rgba(245,240,232,0.05);
          border: 1px solid rgba(245,240,232,0.1);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #f5f0e8;
          font-family: 'DM Mono', monospace;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s ease;
          width: 100%;
        }

        .field input::placeholder { color: rgba(245,240,232,0.2); }

        .field input:focus {
          border-color: rgba(212,163,115,0.5);
          background: rgba(245,240,232,0.07);
          box-shadow: 0 0 0 3px rgba(212,163,115,0.08);
        }

        /* PIX section */
        .pix-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 0;
        }

        .pix-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #f5f0e8;
        }

        .pix-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #00b4d8;
        }

        .pix-subtitle {
          font-size: 0.82rem;
          color: rgba(245,240,232,0.45);
          text-align: center;
          line-height: 1.5;
        }

        .qr-wrapper {
          padding: 0.85rem;
          background: #f5f0e8;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .qr-wrapper img { display: block; width: 180px; height: 180px; }

        .pix-timer {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: rgba(245,240,232,0.5);
        }

        .timer-value {
          color: #d4a373;
          font-size: 1rem;
          font-weight: 500;
        }

        .copy-key {
          width: 100%;
          background: rgba(0,180,216,0.08);
          border: 1px solid rgba(0,180,216,0.2);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-key:hover {
          background: rgba(0,180,216,0.13);
          border-color: rgba(0,180,216,0.35);
        }

        .copy-key-text {
          flex: 1;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: rgba(245,240,232,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .copy-btn-label {
          font-size: 0.72rem;
          font-weight: 500;
          color: #00b4d8;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }

        .pix-instructions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
        }

        .step-num {
          width: 20px; height: 20px;
          min-width: 20px;
          background: rgba(0,180,216,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 600;
          color: #00b4d8;
          margin-top: 1px;
        }

        .step-text {
          font-size: 0.8rem;
          color: rgba(245,240,232,0.5);
          line-height: 1.4;
        }

        /* Submit button */
        .submit {
          margin-top: 0.5rem;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #d4a373, #b8845a);
          border: none;
          border-radius: 12px;
          color: #0f0e17;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 20px rgba(212,163,115,0.25);
        }

        .submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(212,163,115,0.35);
        }

        .submit:active:not(:disabled) { transform: translateY(0); }
        .submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .submit-pix {
          background: linear-gradient(135deg, #00b4d8, #0077b6);
          box-shadow: 0 4px 20px rgba(0,180,216,0.2);
          color: #fff;
        }

        .submit-pix:hover:not(:disabled) {
          box-shadow: 0 8px 28px rgba(0,180,216,0.35);
        }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(15,14,23,0.3);
          border-top-color: #0f0e17;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .spinner-white {
          border-color: rgba(255,255,255,0.3);
          border-top-color: #fff;
        }

        /* Success screen */
        .success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2.5rem 1rem;
          gap: 1.25rem;
        }

        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .success-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(212,163,115,0.2), rgba(212,163,115,0.05));
          border: 2px solid rgba(212,163,115,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .success h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #f5f0e8;
        }

        .success p {
          font-size: 0.9rem;
          color: rgba(245,240,232,0.5);
          max-width: 280px;
          line-height: 1.55;
        }

        .success-detail {
          background: rgba(245,240,232,0.04);
          border: 1px solid rgba(245,240,232,0.08);
          border-radius: 10px;
          padding: 0.85rem 1.25rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .security {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: rgba(245,240,232,0.25);
          letter-spacing: 0.05em;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-in { animation: fadeSlide 0.35s ease forwards; }
      `}</style>

      <div className="page">
        <div className="container">
          {paid ? (
            <div className="success animate-in">
              <div className="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>Pagamento confirmado</h2>
              <p>Sua transação foi processada com sucesso. Um comprovante foi enviado ao seu e-mail.</p>
              <div className="success-detail">
                <span style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.45)" }}>Valor pago</span>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#d4a373", fontSize: "1.1rem" }}>{formatPrice(valor)}</span>
              </div>
              <div className="success-detail">
                <span style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.45)" }}>Método</span>
                <span style={{ fontSize: "0.85rem", color: "#f5f0e8" }}>{method === "credit" ? "Cartão de Crédito" : "PIX"}</span>
              </div>
              
              <Link href="/pedidos">
              <div style={{color: "#f5f0e8" }}>Ir para os pedidos</div>
              </Link>
            </div>
          ) : (
            <>
              <div className="header">
                <div className="brand">Pagamento seguro</div>
                <h1>Finalizar pedido</h1>
              </div>

              <div className="summary">
                <div>
                  <div className="summary-label">Valor</div>
                </div>
                <div className="summary-price">{formatPrice(valor)}</div>
              </div>

              <div className="tabs">
                <button className={`tab${method === "credit" ? " active" : ""}`} onClick={() => setMethod("credit")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  Cartão de Crédito
                </button>
                <button className={`tab${method === "pix" ? " active" : ""}`} onClick={() => setMethod("pix")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l4 4M4 20l4-4M20 4l-4 4M20 20l-4-4M8 8h8v8H8z" />
                  </svg>
                  PIX
                </button>
              </div>

              {method === "credit" ? (
                <div className="animate-in">
                  <div className="card-scene">
                    <div className={`card-3d${flipped ? " flipped" : ""}`}>
                      <div className="card-face card-front">
                        <div className="card-shimmer" />
                        <div className="card-chip" />
                        <div className="card-number">
                          {cardDisplay}
                        </div>
                        <div className="card-bottom">
                          <div>
                            <div className="card-meta-label">Titular</div>
                            <div className="card-meta-value" style={{ fontSize: "0.75rem", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {nameDisplay}
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div className="card-meta-label">Validade</div>
                            <div className="card-meta-value">{expiryDisplay}</div>
                          </div>
                        </div>
                      </div>
                      <div className="card-face card-back">
                        <div className="mag-strip" />
                        <div className="cvv-strip">
                          <span className="cvv-dots">{card.cvv ? "•".repeat(card.cvv.length) : "•••"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form">
                    <div className="field">
                      <label>Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        inputMode="numeric"
                      />
                    </div>
                    <div className="field">
                      <label>Nome no Cartão</label>
                      <input
                        type="text"
                        placeholder="Como está no cartão"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label>Validade</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                          maxLength={5}
                          inputMode="numeric"
                        />
                      </div>
                      <div className="field">
                        <label>CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                          onFocus={() => setFlipped(true)}
                          onBlur={() => setFlipped(false)}
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    <button className="submit" onClick={handleSubmit} disabled={loading}>
                      {loading ? (
                        <><div className="spinner" /> Processando...</>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Pagar {formatPrice(valor)}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in">
                  <div className="pix-container">
                    <div style={{ textAlign: "center" }}>
                      <div className="pix-logo">PIX</div>
                      <div className="pix-subtitle">Escaneie o QR code ou copie a chave para pagar</div>
                    </div>

                    <div className="qr-wrapper">
                      <Image src={PIX_QR_PLACEHOLDER} alt="QR Code PIX" />
                    </div>

                    <div className="pix-timer">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Expira em <span className="timer-value">{minutes}:{seconds}</span>
                    </div>

                    <button className="copy-key" onClick={handleCopy}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span className="copy-key-text">{pixKey}</span>
                      <span className="copy-btn-label">{copied ? "Copiado ✓" : "Copiar"}</span>
                    </button>

                    <div className="pix-instructions">
                      {["Abra o app do seu banco e acesse a área PIX.", "Escolha 'Pagar via QR Code' ou 'Copia e Cola'.", "Confirme os dados e autorize o pagamento."].map((text, i) => (
                        <div className="step" key={i}>
                          <div className="step-num">{i + 1}</div>
                          <div className="step-text">{text}</div>
                        </div>
                      ))}
                    </div>

                    <button className="submit submit-pix" onClick={handleSubmit} disabled={loading}>
                      {loading ? (
                        <><div className="spinner spinner-white" /> Verificando pagamento...</>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Já realizei o pagamento
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="security">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Ambiente 100% seguro · SSL 256-bit
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
