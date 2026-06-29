"use client";

import { style } from "../_style/style";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "../_db/cookie";
import { DB_Access } from "../_db/dbaccess";
import { redirect } from 'next/navigation'
import {OrderStatus, Order} from "../_db/order"

const stars_max = 500;

var user = {
  avatarInitials: "MF",
  memberSince: "março de 2022",
  loyaltyPoints: 340,
  loyaltyMax: 500,
  loyaltyLevel: "Gourmet",
  favoriteRestaurant: "Sushi Nagoya",
  savedAddresses: [
    { label: "Casa", address: "Rua das Acácias, 142, Ap. 301 — Botafogo, RJ" },
    { label: "Trabalho", address: "Av. Rio Branco, 1500, Sala 22 — Centro, RJ" },
  ],
  recentOrders: [
    {
      id: "87432",
      restaurant: "Burger Bros",
      date: "08 jun 2026",
      total: "R$ 54,90",
      status: "entregue",
      items: "Classic Smash, Batata Crocante, Limonada",
    },
    {
      id: "87291",
      restaurant: "Sushi Nagoya",
      date: "01 jun 2026",
      total: "R$ 128,00",
      status: "entregue",
      items: "Combinado 30 peças, Temaki Salmão",
    },
    {
      id: "87105",
      restaurant: "Pizza da Hora",
      date: "24 mai 2026",
      total: "R$ 72,50",
      status: "cancelado",
      items: "Pizza Quatro Queijos G, Coca-Cola 2L",
    },
  ],
};

//const loyaltyPercent = Math.round((user.loyaltyPoints / user.loyaltyMax) * 100);
const loyaltyPercent = 50;

const statusStyle: Record<string, string> = {
  entregue: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  cancelado: "bg-red-50 text-red-600 border border-red-200",
  "em trânsito": "bg-amber-50 text-amber-700 border border-amber-200",
};

type Tab = "perfil" | "enderecos" | "pagamento";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  
  const circumference = 2 * Math.PI * 36;
  const dashOffset = circumference - (loyaltyPercent / 100) * circumference;

  useEffect(() => {
    var session = getCookie("session");

    if (session === "") {
      redirect("/login")
    }

    var db = new DB_Access();
    var user_info = db.getUser(session);

    if (!user_info) {
      redirect("/login");
    }
    
    setName(user_info.name);
    setEmail(user_info.email);
    setPhone(user_info.phone);
    setStars(user_info.stars)

    var pedidos = db.getPedidos(session);

    setOrders(Object.values(pedidos));

  }, []);

  const sair = () => {
    deleteCookie("session");
    redirect("/login");
  }

  const saveChanges = () => {
    var session = getCookie("session");
    
    var db = new DB_Access();
    var user_info = db.getUser(session);

    setEditMode(false)
  }

  return (
    <div className="min-h-screen"  style={{ minHeight: '100vh', background: '#faf7f2', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: style.color_background_primary,
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500,
              margin: 0, color: 'var(--color-text-primary)', letterSpacing: '-0.02em',
            }}>
              <Link href="/">Raízes do Nordeste</Link>
            </p>
            <p style={{
              fontSize: 10, margin: 0, color: 'var(--color-text-secondary)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Sabores autênticos 
            </p>
          </div>

          <a
              href="/user"
              style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 14px',
              cursor: 'pointer',
              background: '#FAEEDA',
              border: `0.5px solid #FAC775`,
              fontSize: 13,
          }}>
            Página do Usuário
          </a>
          <button
            onClick={() => redirect("/carrinho") /*cartCount > 0
              ? alert(`Seu pedido\n${'─'.repeat(30)}\n${Object.values(cart).map(i => `${i.qty}× ${i.name}  R$ ${(i.qty * i.price).toFixed(2)}`).join('\n')}\n${'─'.repeat(30)}\nTotal: R$ ${cartTotal.toFixed(2)}`)
              : alert('Seu carrinho está vazio.')*/
            }
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#FAEEDA',
              padding: '7px 14px',
              border: `0.5px solid #FAC775`,
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              color: '#854F0B',
              fontSize: 13, fontWeight: 500,
              transition: 'all 0.15s',
            }}
          >
            Carrinho
          </button>
        </div>
      </header>

      <main className="main-grid">
        {/* ── Left sidebar ── */}
        <aside className="sidebar">
          {/* Avatar + loyalty ring */}
          <div className="avatar-wrap">
            <svg className="ring-svg" viewBox="0 0 88 88" aria-hidden="true">
              <circle cx="44" cy="44" r="36" className="ring-track" />
              <circle
                cx="44"
                cy="44"
                r="36"
                className="ring-fill"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="avatar-circle"></div>
          </div>

          <h2 className="sidebar-name">{name}</h2>
          <p className="sidebar-since">{/*Membro desde {user.memberSince}*/}</p>

          {/* Loyalty badge */}
          <div className="loyalty-card">
            <div className="loyalty-top">
              <span className="loyalty-icon">⭐</span>
              <span className="loyalty-level">Estrelas</span>
            </div>
            <div className="loyalty-bar-bg">
              <div className="loyalty-bar-fill" style={{ width: `${(stars/stars_max)*100}%` }} />
            </div>
            <p className="loyalty-label">
              {stars} / {stars_max} estrelas
            </p>
          </div>

          <Link href="/pedidos" className="orders-cta">
            Ver todos os pedidos →
          </Link>
          <button style={{cursor: "pointer"}} onClick={() => sair()}>
            Sair →
          </button>
        </aside>

        {/* ── Right panel ── */}
        <section className="right-panel">
          {/* Tabs 
          <div className="tabs" role="tablist">
            {(["perfil", "enderecos", "pagamento"] as Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={activeTab === t}
                className={`tab-btn ${activeTab === t ? "tab-active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t === "perfil" && "Dados pessoais"}
                {t === "enderecos" && "Endereços"}
                {t === "pagamento" && "Pagamento"}
              </button>
            ))}
          </div>
          */}
          

          {/* Tab: Dados pessoais */}
          {activeTab === "perfil" && (
            <div className="tab-content">
              <div className="section-header">
                <h3 className="section-title">Dados pessoais</h3>
                {/*<button className="edit-btn" onClick={() => setEditMode((v) => !v)}>
                  {editMode ? "Cancelar" : "Editar"}
                </button>*/}
              </div>

              <div className="fields-grid">
                <div className="field">
                  <label className="field-label">Nome completo</label>
                  {editMode ? (
                    <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} />
                  ) : (
                    <p className="field-value">{name}</p>
                  )}
                </div>
                <div className="field">
                  <label className="field-label">E-mail</label>
                  {editMode ? (
                    <input className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                  ) : (
                    <p className="field-value">{email}</p>
                  )}
                </div>
                <div className="field">
                  <label className="field-label">Telefone</label>
                  {editMode ? (
                    <input className="field-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  ) : (
                    <p className="field-value">{phone}</p>
                  )}
                </div>
              </div>

              {editMode && (
                <button className="save-btn" onClick={() => saveChanges()}>
                  Salvar alterações
                </button>
              )}

              {/* Recent orders preview */}
              <div className="orders-section">
                <div className="section-header">
                  <h3 className="section-title">Pedidos recentes</h3>
                  <Link href="/pedidos" className="see-all-link">Ver todos</Link>
                </div>

                <div className="orders-list">
                  {orders.slice(0,3).map((order) => {

                    var names = ""

                    for (const compra of order.compras) {
                      if (names.length > 0) {
                        var names_new = `${names}, ${compra.name}`
                      }
                      else {
                        var names_new = `${compra.name}`
                      }
                      if (names_new.length <= 64) {
                        names = names_new
                      } else {
                        break;
                      }
                    }

                    return (
                    <div key={order.id} className="order-card">
                      <Link href="/pedidos">
                        <div className="order-top">
                          <div>
                            <p className="order-restaurant">{order.id}</p>
                            <p className="order-items">{names}</p>
                          </div>
                          <span className={`status-pill ${statusStyle[order.status]}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-bottom">
                          <span className="order-date">{order.date}</span>
                          <span className="order-total">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.price)}</span>
                        </div>
                      </Link>
                    </div>
                  )})}
                </div>

                <Link href="/pedidos" className="orders-full-btn">
                  Ver histórico completo
                </Link>
              </div>
            </div>
          )}

          {/* Tab: Endereços */}
          {activeTab === "enderecos" && (
            <div className="tab-content">
              <div className="section-header">
                <h3 className="section-title">Endereços salvos</h3>
                <button className="edit-btn">+ Adicionar</button>
              </div>
              <div className="address-list">
                {user.savedAddresses.map((addr) => (
                  <div key={addr.label} className="address-card">
                    <span className="address-label-pill">{addr.label}</span>
                    <p className="address-text">{addr.address}</p>
                    <div className="address-actions">
                      <button className="addr-btn">Editar</button>
                      <button className="addr-btn addr-btn-remove">Remover</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Pagamento */}
          {activeTab === "pagamento" && (
            <div className="tab-content">
              <div className="section-header">
                <h3 className="section-title">Formas de pagamento</h3>
                <button className="edit-btn">+ Adicionar</button>
              </div>
              <div className="card-list">
                <div className="payment-card">
                  <span className="card-icon">💳</span>
                  <div>
                    <p className="card-name">Visa terminando em 4821</p>
                    <p className="card-sub">Validade: 09/28 · Principal</p>
                  </div>
                  <span className="card-badge">padrão</span>
                </div>
                <div className="payment-card">
                  <span className="card-icon">💳</span>
                  <div>
                    <p className="card-name">Mastercard terminando em 7703</p>
                    <p className="card-sub">Validade: 03/27</p>
                  </div>
                </div>
                <div className="payment-card">
                  <span className="card-icon">⚡</span>
                  <div>
                    <p className="card-name">Pix</p>
                    <p className="card-sub">Chave: mfernanda@email.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </section>
      </main>

<footer style={{
        borderTop: '0.5px solid var(--color-border-tertiary)',
        background: style.color_background_primary,
        padding: '2.5rem 2rem', marginTop: '3rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem', marginBottom: '2rem',
          }}>
            {/* Brand */}
            <div>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500,
                margin: '0 0 8px', color: 'var(--color-text-primary)',
              }}>
                Raízes do Nordeste
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                Culinária nordestina autêntica com ingredientes frescos e receitas de família passadas de geração em geração.
              </p>
            </div>

            {/* Hours */}
            <div>
              <p style={{
                fontSize: 11, fontWeight: 500, margin: '0 0 10px',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                Horário
              </p>
              {[
                { day: 'Segunda a Sexta', time: '6h – 14h' },
                { day: 'Sábado',          time: '6h – 15h' },
                { day: 'Domingo',         time: '7h – 13h' },
              ].map(h => (
                <div key={h.day} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 13, marginBottom: 5,
                }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{h.day}</span>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p style={{
                fontSize: 11, fontWeight: 500, margin: '0 0 10px',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                Contato
              </p>
              {[
                { icon: 'ti-phone',            text: '(99) 9 9999-0000' },
                { icon: 'ti-brand-instagram',  text: '@raizesdonordeste' },
              ].map(c => (
                <div key={c.text} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, marginBottom: 7,
                }}>
                  <i className={`ti ${c.icon}`} style={{ fontSize: 15, color: '#BA7517', flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ color: 'var(--color-text-secondary)' }}>{c.text}</span>
                </div>
              ))}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, marginBottom: 7,
                    }}>
                  <i style={{ fontSize: 15, color: '#BA7517', flexShrink: 0 }} aria-hidden="true" />
                  <Link href="/termos" style={{ color: 'var(--color-text-secondary)' }}>Termos de Uso</Link>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, marginBottom: 7,
                    }}>
                  <i style={{ fontSize: 15, color: '#BA7517', flexShrink: 0 }} aria-hidden="true" />
                  <Link href="/privacidade" style={{ color: 'var(--color-text-secondary)' }}>Política de Privacidade</Link>
                </div>
            </div>
          </div>

          <div style={{
            borderTop: '0.5px solid var(--color-border-tertiary)',
            paddingTop: '1rem',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 8,
          }}>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              © 2026 Raízes do Nordeste · Todos os direitos reservados
            </span>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              Feito com amor
            </span>
          </div>
        </div>
      </footer>
      <style jsx>{`
        /* ── Reset & base ── */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page-root {
          min-height: 100vh;
          background: #FAF8F4;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #1A1A1A;
        }

        /* ── Nav ── */
        .topnav {
          background: #1A1A1A;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 1.25rem;
          font-weight: 800;
          color: #F5A623;
          letter-spacing: -0.5px;
        }
        .nav-links { display: flex; gap: 20px; align-items: center; }
        .nav-link {
          color: #ccc;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.15s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link-orders {
          background: #F5A623;
          color: #1A1A1A;
          padding: 6px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .nav-link-orders:hover { background: #e09515; color: #1A1A1A; }

        /* ── Main grid ── */
        .main-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: start;
        }

        /* ── Sidebar ── */
        .sidebar {
          background: #fff;
          border-radius: 20px;
          padding: 32px 24px 28px;
          border: 1px solid #EDEAE4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: sticky;
          top: 80px;
        }

        /* Avatar + ring */
        .avatar-wrap { position: relative; width: 88px; height: 88px; }
        .ring-svg { position: absolute; inset: 0; transform: rotate(-90deg); }
        .ring-track { fill: none; stroke: #EDEAE4; stroke-width: 4; }
        .ring-fill {
          fill: none;
          stroke: #F5A623;
          stroke-width: 4;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.8s ease;
        }
        .avatar-circle {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F5A623 0%, #e07b12 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .sidebar-name {
          font-size: 1.1rem;
          font-weight: 700;
          text-align: center;
          margin-top: 4px;
        }
        .sidebar-since {
          font-size: 0.78rem;
          color: #6B7B6E;
          margin-top: -6px;
        }

        /* Loyalty */
        .loyalty-card {
          background: #FFF8EC;
          border: 1px solid #F5D899;
          border-radius: 14px;
          padding: 14px 16px;
          width: 100%;
          margin-top: 4px;
        }
        .loyalty-top { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
        .loyalty-icon { font-size: 0.95rem; }
        .loyalty-level { font-size: 0.85rem; font-weight: 700; color: #c27a0a; }
        .loyalty-bar-bg {
          background: #F5D899;
          border-radius: 99px;
          height: 6px;
          overflow: hidden;
        }
        .loyalty-bar-fill {
          background: #F5A623;
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s ease;
        }
        .loyalty-label {
          font-size: 0.73rem;
          color: #8a6200;
          margin-top: 6px;
        }
        .loyalty-next { color: #b38800; }

        /* Stats */
        .stats-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }
        .stat-box {
          flex: 1;
          background: #FAF8F4;
          border: 1px solid #EDEAE4;
          border-radius: 12px;
          padding: 12px 8px;
          text-align: center;
        }
        .stat-num { display: block; font-size: 1.4rem; font-weight: 800; color: #1A1A1A; }
        .stat-label { font-size: 0.72rem; color: #6B7B6E; margin-top: 2px; display: block; }

        .orders-cta {
          display: block;
          text-align: center;
          background: #1A1A1A;
          color: #fff;
          text-decoration: none;
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          width: 100%;
          margin-top: 4px;
          transition: background 0.15s;
        }
        .orders-cta:hover { background: #333; }

        /* ── Right panel ── */
        .right-panel {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .tabs {
          display: flex;
          gap: 4px;
          background: #EDEAE4;
          border-radius: 14px;
          padding: 4px;
          margin-bottom: 24px;
        }
        .tab-btn {
          flex: 1;
          padding: 9px 12px;
          border: none;
          background: transparent;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #6B7B6E;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .tab-active {
          background: #fff;
          color: #1A1A1A;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        .tab-content {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #EDEAE4;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-title { font-size: 1rem; font-weight: 700; }

        .edit-btn {
          background: none;
          border: 1.5px solid #EDEAE4;
          border-radius: 8px;
          padding: 5px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #6B7B6E;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .edit-btn:hover { border-color: #F5A623; color: #c27a0a; }

        .fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .field { display: flex; flex-direction: column; gap: 4px; }
        .field-label { font-size: 0.75rem; font-weight: 600; color: #6B7B6E; text-transform: uppercase; letter-spacing: 0.05em; }
        .field-value { font-size: 0.95rem; color: #1A1A1A; padding: 2px 0; }
        .field-input {
          font-size: 0.95rem;
          border: 1.5px solid #EDEAE4;
          border-radius: 8px;
          padding: 8px 10px;
          outline: none;
          transition: border-color 0.15s;
        }
        .field-input:focus { border-color: #F5A623; }

        .save-btn {
          align-self: flex-start;
          background: #F5A623;
          color: #1A1A1A;
          border: none;
          border-radius: 10px;
          padding: 10px 24px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: -8px;
        }
        .save-btn:hover { background: #e09515; }

        /* Orders */
        .orders-section { display: flex; flex-direction: column; gap: 16px; }
        .see-all-link { font-size: 0.82rem; font-weight: 600; color: #F5A623; text-decoration: none; }
        .see-all-link:hover { text-decoration: underline; }

        .orders-list { display: flex; flex-direction: column; gap: 12px; }
        .order-card {
          border: 1px solid #EDEAE4;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: box-shadow 0.15s;
        }
        .order-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        .order-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
        .order-restaurant { font-size: 0.92rem; font-weight: 700; }
        .order-items { font-size: 0.8rem; color: #6B7B6E; margin-top: 2px; }
        .status-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 99px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .order-bottom { display: flex; justify-content: space-between; align-items: center; }
        .order-date { font-size: 0.78rem; color: #6B7B6E; }
        .order-total { font-size: 0.9rem; font-weight: 700; color: #1A1A1A; }

        .orders-full-btn {
          display: block;
          text-align: center;
          border: 1.5px solid #1A1A1A;
          border-radius: 12px;
          padding: 12px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1A1A1A;
          text-decoration: none;
          transition: background 0.15s;
        }
        .orders-full-btn:hover { background: #1A1A1A; color: #fff; }

        /* Addresses */
        .address-list { display: flex; flex-direction: column; gap: 12px; }
        .address-card {
          border: 1px solid #EDEAE4;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .address-label-pill {
          align-self: flex-start;
          background: #FFF8EC;
          color: #c27a0a;
          border: 1px solid #F5D899;
          border-radius: 99px;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 10px;
        }
        .address-text { font-size: 0.88rem; color: #1A1A1A; }
        .address-actions { display: flex; gap: 8px; }
        .addr-btn {
          background: none;
          border: 1.5px solid #EDEAE4;
          border-radius: 8px;
          padding: 4px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #6B7B6E;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .addr-btn:hover { border-color: #F5A623; color: #c27a0a; }
        .addr-btn-remove:hover { border-color: #f87171; color: #dc2626; }

        /* Payment */
        .card-list { display: flex; flex-direction: column; gap: 12px; }
        .payment-card {
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid #EDEAE4;
          border-radius: 14px;
          padding: 14px 16px;
        }
        .card-icon { font-size: 1.5rem; }
        .card-name { font-size: 0.9rem; font-weight: 600; }
        .card-sub { font-size: 0.78rem; color: #6B7B6E; margin-top: 2px; }
        .card-badge {
          margin-left: auto;
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
          border-radius: 99px;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 10px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr;
            padding: 20px 16px 60px;
          }
          .sidebar { position: static; }
          .fields-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
