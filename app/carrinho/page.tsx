"use client";

import Image from "next/image";
import { style } from "../_style/style";
import { useState, useEffect } from "react";
import { redirect } from 'next/navigation';
import Link from "next/link";
import { DB_Access } from "../_db/dbaccess";
import { getCookie } from "../_db/cookie.tsx";
import { Pedido, Compra } from "../_db/dbtypes"

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 9.90;

var db;
var session;

export default function Home() {
  const [start, setStart] = useState(true);

  const [compras, setCompras] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCEP] = useState("");

  const [discountStars, setDiscountStars] = useState(false);

  //const [redirect, setRedirect] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setCompras((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );

    var compras_obj = JSON.parse(localStorage.getItem("carrinho"));
    compras_obj[id].qty += delta;

    localStorage.setItem("carrinho", JSON.stringify(compras_obj))
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setCompras((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 350);

    var compras_obj = JSON.parse(localStorage.getItem("carrinho"));
    delete compras_obj[id];
    localStorage.setItem("carrinho", JSON.stringify(compras_obj))
  };

  const cartCount = Object.values(compras).reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = Object.values(compras).reduce((sum, item) => sum + item.qty * item.price, 0);
  const subtotal = compras.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = (couponApplied && (coupon == "DESCONTO10"))? subtotal * 0.1 : ((couponApplied && (coupon == "DESCONTO25"))? subtotal * 0.25 : 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal - discount + shipping;
  const freeShippingLeft = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  const coupons = ["DESCONTO10"]
  const coupons_estrelas = ["DESCONTO25"]

  const applyCoupon = () => {
    if (coupons.find(cupom => cupom === coupon.toUpperCase())) {
      setCouponApplied(true);
    }

    if (coupons_estrelas.find(cupom => cupom === coupon.toUpperCase())) {
      setCouponApplied(true);
    }
  };

  const sendPrice = () => {

    const currentDateTime = new Date();

    const timeFormat = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false // Set to true for AM/PM format
    });

    const currentDateTime_str = timeFormat.format(currentDateTime);

    currentDateTime.setMinutes(currentDateTime.getMinutes() + 60);

    var delivery = currentDateTime;

    const uuid = crypto.randomUUID()

    var pedido : Pedido = {
      id: uuid,
      date: currentDateTime_str,
      estimatedDelivery: timeFormat.format(delivery),
      address: `${rua} - ${numero} - ${complemento} - ${cep}`,
      price: total,
      status: "processando",
      unidade: compras[0].unidade,
      compras: compras
    }

    localStorage.setItem("pedido", JSON.stringify(pedido));
    redirect("/pagamento");
  }

  useEffect(() => {
    if (start) {
      session = getCookie("session");

      if (session === "") {
        redirect("/login")
      }

      db = new DB_Access();
      var user_info = db.getUser(session);

      if (!user_info) {
        redirect("/login");
      }

      let new_compras = localStorage.getItem("carrinho");

      if (!new_compras){
        return;
      }

      new_compras = Object.values(JSON.parse(new_compras));

      var stars = db.getStars(session);

      if (stars >= 500)
      {
        setDiscountStars(true);
      }

      setCompras(new_compras);
      setStart(false);
    }

  }, [compras]);

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
              background: cartCount > 0 ? '#FAEEDA' : 'transparent',
              padding: '7px 14px',
              border: `0.5px solid ${cartCount > 0 ? '#FAC775' : 'var(--color-border-secondary)'}`,
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              color: cartCount > 0 ? '#854F0B' : 'var(--color-text-secondary)',
              fontSize: 13, fontWeight: cartCount > 0 ? 500 : 400,
              transition: 'all 0.15s',
            }}
          >
            <i className="ti ti-shopping-cart" style={{ fontSize: 16 }} aria-hidden="true" />
            {cartCount > 0
              ? `${cartCount} ${cartCount === 1 ? 'item' : 'itens'} · ${cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
              : 'Carrinho'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Meu Carrinho</h1>
          <p className="text-gray-500 mt-1 text-sm">{compras.reduce((s, i) => s + i.qty, 0)} {compras.reduce((s, i) => s + i.qty, 0) === 1 ? "item" : "itens"} selecionados</p>
        </div>

        {compras.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-6">
              <svg width="36" height="36" fill="none" stroke="#ccc" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-400 mb-8 text-sm">Adicione produtos para continuar comprando</p>
            <Link href="#" className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-700 transition-colors">
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            {/* Items */}
            <div className="space-y-4">
              {/* Free shipping progress */}
              {freeShippingLeft > 0 && (
                <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-600">Faltam <strong className="text-gray-900">{formatPrice(freeShippingLeft)}</strong> para frete grátis</span>
                    <span className="text-[#e85d26] font-semibold">🚚</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e85d26] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {shipping === 0 && (
                <div className="bg-green-50 border border-green-100 rounded-2xl px-5 py-3 text-sm text-green-700 font-medium flex items-center gap-2">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Parabéns! Você ganhou frete grátis.
                </div>
              )}

              {/* Cart items */}
              <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                {compras.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-5 transition-all duration-350 ${removingId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-gray-900 font-semibold text-sm leading-snug mt-0.5">{item.name}</h3>
                          <span className="text-[11px] font-bold text-[#e85d26] tracking-widest uppercase">{item.desc}</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 flex-shrink-0"
                          aria-label="Remover item"
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-0 border border-gray-200 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light"
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-800">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light"
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-sm">{formatPrice(item.price * item.qty)}</p>
                          {item.qty > 1 && (
                            <p className="text-[11px] text-gray-400">{formatPrice(item.price)} cada</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue shopping */}
              <div className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                  Continuar comprando
                </Link>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-5 text-base">Endereço</h2>

                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Rua</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      placeholder="Rua"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Número</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      placeholder="Número"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Complemento</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      placeholder="Complemento"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">CEP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cep}
                      onChange={(e) => setCEP(e.target.value)}
                      placeholder="Complemento"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                  </div>
                </div>


              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-5 text-base">Resumo do pedido</h2>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Cupom de desconto</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Ex: DESCONTO10"
                      disabled={couponApplied}
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponApplied || !coupon}
                      className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
                    >
                      {couponApplied ? "✓" : "Aplicar"}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-green-600 text-xs mt-1.5 font-medium">Cupom aplicado! {coupon === "DESCONTO10" ? "10" : "25"}% de desconto.</p>
                  )}
                  <br></br>

                  {discountStars && (
                    <div style={{textAlign:"center"}}className="mt-6 w-full bg-[#e85d26] text-white font-bold py-4 rounded-xl text-sm tracking-wide">
                      CUPOM DE 500 ESTRELAS: DESCONTO25
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-50 pt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto {coupon === "DESCONTO10" ? "10" : "25"}%</span>
                      <span>− {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 text-right">
                    ou 12× de {formatPrice(total / 12)} sem juros
                  </p>
                </div>

                <button onClick={() => sendPrice()} className="mt-6 w-full bg-[#e85d26] hover:bg-[#d04e1f] active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all duration-150 text-sm tracking-wide">
                  Ir para o pagamento
                </button>
                <div className="mt-4 flex items-center justify-center gap-4 text-gray-300">
                  {["Visa", "Mastercard", "Pix"].map((m) => (
                    <span key={m} className="text-[11px] font-semibold border border-gray-100 rounded px-2 py-1 text-gray-400">{m}</span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 justify-center text-xs text-gray-400">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Compra 100% segura e criptografada
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
