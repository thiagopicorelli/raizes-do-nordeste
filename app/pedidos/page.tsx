"use client";

import { useState, useEffect } from "react";
import {OrderStatus, Order} from "../_db/order"
import { getCookie } from "../_db/cookie";
import { DB_Access } from "../_db/dbaccess";
import { style } from "../_style/style";
import { redirect } from 'next/navigation'
import Link from "next/link";

const STATUS_META: Record<
  OrderStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  "entregue": {
    label: "Entregue",
    color: "#16a34a",
    bg: "#dcfce7",
    dot: "#22c55e",
  },
  "em trânsito": {
    label: "Em Trânsito",
    color: "#0369a1",
    bg: "#e0f2fe",
    dot: "#38bdf8",
  },
  "processando": {
    label: "Processando",
    color: "#92400e",
    bg: "#fef3c7",
    dot: "#f59e0b",
  },
  "cancelado": {
    label: "Cancelado",
    color: "#991b1b",
    bg: "#fee2e2",
    dot: "#f87171",
  },
};

const ALL_FILTERS: { value: "todos" | OrderStatus; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "em trânsito", label: "Em Trânsito" },
  { value: "processando", label: "Processando" },
  { value: "entregue", label: "Entregue" },
  { value: "cancelado", label: "Cancelado" },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<"todos" | OrderStatus>("todos");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    //localStorage.setItem("pedidos", JSON.stringify(ORDERS)); 
    var session = getCookie("session");

    var db = new DB_Access();
    var pedidos = db.getPedidos(session);

    setOrders(Object.values(pedidos));
  }, []);

  const filtered =
    filter === "todos" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={styles.page}>
      {/* Grain overlay */}
      <div style={styles.grain} aria-hidden />
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
                margin: 0, color: 'black', letterSpacing: '-0.02em',
              }}>
                <Link href="/">Raízes do Nordeste</Link>
              </p>
              <p style={{
                fontSize: 10, margin: 0, color: 'black',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Sabores autênticos 
              </p>
            </div>

            <a
                href="/user"
                style={{
                display: 'flex', alignItems: 'center', gap: 8,
                color: 'black',
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

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Meus Pedidos</h1>
          </div>
          <div style={styles.orderCount}>
            <span style={styles.orderCountNum}>{orders.length}</span>
            <span style={styles.orderCountLabel}>pedidos</span>
          </div>
        </div>

        {/* Filters */}
        <nav style={styles.filterBar} aria-label="Filtrar pedidos">
          {ALL_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                ...styles.filterBtn,
                ...(filter === f.value ? styles.filterBtnActive : {}),
              }}
            >
              {f.label}
            </button>
          ))}
        </nav>

        {/* Orders List */}
        <ul style={styles.list}>
          {filtered.map((order) => {
            const meta = STATUS_META[order.status];
            const isExpanded = expandedId === order.id;

            return (
              <li key={order.id} style={styles.card}>
                {/* Card Header */}
                <button
                  style={styles.cardHeader}
                  onClick={() =>
                    setExpandedId(isExpanded ? null : order.id)
                  }
                  aria-expanded={isExpanded}
                >
                  <div style={styles.cardLeft}>
                    <span style={styles.orderId}>{order.id}</span>
                    <span style={styles.orderDate}>{order.date}</span>
                  </div>

                  <div style={styles.cardRight}>
                    <span
                      style={{
                        ...styles.badge,
                        color: meta.color,
                        background: meta.bg,
                      }}
                    >
                      <span
                        style={{
                          ...styles.badgeDot,
                          background: meta.dot,
                          boxShadow: `0 0 6px ${meta.dot}`,
                        }}
                      />
                      {meta.label}
                    </span>

                    <span style={styles.total}>
                      R${" "}
                      {order.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>

                    <span
                      style={{
                        ...styles.chevron,
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      }}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={styles.details}>
                    <div style={styles.divider} />

                    {order.estimatedDelivery && (
                      <p style={styles.deliveryInfo}>
                        📦 Previsão de entrega:{" "}
                        <strong>{order.estimatedDelivery}</strong>
                      </p>
                    )}

                    <table style={styles.itemsTable}>
                      <thead>
                        <tr>
                          <th style={{ ...styles.th, textAlign: "left" }}>
                            Produto
                          </th>
                          <th style={{ ...styles.th, textAlign: "center" }}>
                            Qtd
                          </th>
                          <th style={{ ...styles.th, textAlign: "right" }}>
                            Preço
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.compras.map((item, i) => (
                          <tr key={i} style={styles.itemRow}>
                            <td style={styles.itemName}>{item.name}</td>
                            <td style={styles.itemQty}>{item.qty}</td>
                            <td style={styles.itemPrice}>
                              R${" "}
                              {item.price.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div style={styles.detailsFooter}>
                      {/*<button style={styles.actionBtn}>Ver detalhes</button>*/}
                      {order.status === "entregue" && (
                        <button
                          style={{ ...styles.actionBtn, ...styles.reviewBtn }}
                        >
                          Avaliar pedido
                        </button>
                      )}
                      {order.status === "em trânsito" && (
                        <button
                          style={{ ...styles.actionBtn, ...styles.trackBtn }}
                        >
                          Rastrear envio
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            <span style={styles.emptyIcon}>🗂</span>
            <p style={styles.emptyText}>Nenhum pedido encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Styles ──────────────────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0d0d0d",
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    color: "#f0ece4",
    position: "relative",
    padding: "0 0 80px",
  },
  grain: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.035,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: "150px 150px",
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: 720,
    margin: "0 auto",
    padding: "60px 24px 0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#888",
    margin: "0 0 6px",
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
    color: "#f0ece4",
  },
  orderCount: {
    textAlign: "right",
    lineHeight: 1,
  },
  orderCountNum: {
    display: "block",
    fontSize: 42,
    fontWeight: 800,
    color: "#e8d5b0",
    letterSpacing: "-0.03em",
  },
  orderCountLabel: {
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#666",
  },
  filterBar: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 32,
  },
  filterBtn: {
    background: "transparent",
    border: "1px solid #2a2a2a",
    borderRadius: 100,
    padding: "7px 18px",
    fontSize: 13,
    color: "#888",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
    letterSpacing: "0.02em",
  },
  filterBtnActive: {
    background: "#e8d5b0",
    borderColor: "#e8d5b0",
    color: "#0d0d0d",
    fontWeight: 600,
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  card: {
    background: "#161616",
    border: "1px solid #242424",
    borderRadius: 16,
    overflow: "hidden",
    transition: "border-color 0.2s",
  },
  cardHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    gap: 16,
  },
  cardLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  orderId: {
    fontSize: 15,
    fontWeight: 700,
    color: "#f0ece4",
    letterSpacing: "0.02em",
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
  },
  cardRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 100,
    letterSpacing: "0.02em",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
  },
  total: {
    fontSize: 15,
    fontWeight: 700,
    color: "#e8d5b0",
    letterSpacing: "-0.01em",
  },
  chevron: {
    fontSize: 18,
    color: "#555",
    transition: "transform 0.2s",
    lineHeight: 1,
  },
  details: {
    padding: "0 24px 24px",
  },
  divider: {
    height: 1,
    background: "#242424",
    marginBottom: 20,
  },
  deliveryInfo: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 16,
    margin: "0 0 16px",
  },
  itemsTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#555",
    padding: "0 0 10px",
    fontWeight: 500,
  },
  itemRow: {
    borderTop: "1px solid #1e1e1e",
  },
  itemName: {
    fontSize: 13,
    color: "#ccc",
    padding: "12px 0",
    textAlign: "left",
  },
  itemQty: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    padding: "12px 0",
  },
  itemPrice: {
    fontSize: 13,
    color: "#ccc",
    textAlign: "right",
    padding: "12px 0",
    fontVariantNumeric: "tabular-nums",
  },
  detailsFooter: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  actionBtn: {
    background: "transparent",
    border: "1px solid #2e2e2e",
    borderRadius: 8,
    padding: "9px 18px",
    fontSize: 13,
    color: "#aaa",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  reviewBtn: {
    borderColor: "#22c55e40",
    color: "#22c55e",
  },
  trackBtn: {
    borderColor: "#38bdf840",
    color: "#38bdf8",
  },
  empty: {
    textAlign: "center",
    padding: "80px 0",
    color: "#555",
  },
  emptyIcon: {
    fontSize: 40,
    display: "block",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    margin: 0,
    letterSpacing: "0.05em",
  },
};
