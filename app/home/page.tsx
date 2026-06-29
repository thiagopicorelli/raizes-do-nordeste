'use client';

import { useState, useEffect } from "react";
import { style } from "../_style/style";
import { PRODUCTS, CATEGORIES, TAG_COLORS, CATEGORY_COLORS, UNIDADES } from "./catalogo";
import { redirect } from 'next/navigation'
import Link from "next/link";
import { Pedido, Compra } from "../_db/dbtypes"

export default function Catalogo() {

  const settingFiltered = () => {
    return PRODUCTS.filter(p => (activeCategory === 'todos' ? true : p.category === activeCategory) && p.available.includes(activeCity));
  }

  const settingFilteredCat = (cat) => {
    return PRODUCTS.filter(p => (cat === 'todos' ? true : p.category === cat) && p.available.includes(activeCity) );
  }

  const settingFilteredCity = (city) => {
    return PRODUCTS.filter(p => (activeCategory === 'todos' ? true : p.category === activeCategory) && p.available.includes(city));
  }

  const [activeCity, setActiveCity] = useState('recife');
  const [activeCategory, setActiveCategory] = useState('tapiocas');
  const [filtered, setFiltered] = useState(settingFiltered());
  const [cart, setCart] = useState([]);
  const [firstEnter, setFirstEnter] = useState(true);

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);

  useEffect(() => {
    
    if (firstEnter) {
      let new_compras = localStorage.getItem("carrinho");
      new_compras = JSON.parse(new_compras);
      if(new_compras == null) {
        new_compras = [];
      }
      setCart(new_compras);
      setFirstEnter(false);
      return;
    }

    localStorage.setItem("carrinho", JSON.stringify(cart));

  }, [cart]);

  const addToCart = (product) => {
    var compra : Compra = {
      id: product.id,
      name: product.name,    
      qty: product.qty,                  
      price: product.price,
      unidade: activeCity
    };

    setCart(prev => ({
      ...prev,
      [compra.id]: { ...compra, qty: (prev[compra.id]?.qty || 0) + 1 },
    }));
  };

  const catLabel = CATEGORIES.find(c => c.id === activeCategory)?.label;

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

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

      {/* ── Hero ── */}
      <section style={{
        background: style.color_background_primary,
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '4rem 2rem 3rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#FAEEDA', border: '0.5px solid #FAC775',
            borderRadius: 'var(--border-radius-md)', padding: '4px 12px',
            marginBottom: '1.5rem',
          }}>
            <i className="ti ti-map-pin" style={{ fontSize: 13, color: '#854F0B' }} aria-hidden="true" />
            <span style={{ fontSize: 12, color: '#854F0B', letterSpacing: '0.06em' }}>
              Ingredientes direto do Nordeste brasileiro
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 500, margin: '0 0 1rem', color: 'var(--color-text-primary)',
            lineHeight: 1.1, maxWidth: 640, letterSpacing: '-0.02em',
          }}>
            A culinária que vem do coração do Nordeste
          </h1>

          <p style={{
            fontSize: 16, color: 'var(--color-text-secondary)',
            margin: '0 0 2rem', maxWidth: 480, lineHeight: 1.7,
          }}>
            Tapiocas artesanais, cuscuz recheado, bolos de macaxeira e sucos regionais preparados com ingredientes frescos e receitas de família.
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { icon: 'ti-chef-hat', text: '16 pratos no cardápio' },
              { icon: 'ti-leaf',     text: 'Ingredientes frescos e naturais' },
              { icon: 'ti-clock',    text: 'Aberto das 6h às 14h' },
            ].map(s => (
              <div key={s.text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 15, color: '#BA7517' }} aria-hidden="true" />
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── City tabs ── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 40,
        background: style.color_background_primary,
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: 4,
          overflowX: 'auto', padding: '12px 0',
          scrollbarWidth: 'none',
        }}>
          {UNIDADES.map(city => {
            const active = activeCity === city.id;
            return (
              <button
                key={city.id}
                onClick={() => {setActiveCity(city.id); setFiltered(settingFilteredCity(city.id));}}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px',
                  borderRadius: 'var(--border-radius-md)',
                  border: active ? '0.5px solid #FAC775' : '0.5px solid var(--color-border-tertiary)',
                  background: active ? '#FAEEDA' : 'transparent',
                  color: active ? '#854F0B' : 'var(--color-text-secondary)',
                  fontSize: 13, fontWeight: active ? 500 : 400,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
              >
                <i className={`ti ${city.icon}`} style={{ fontSize: 14 }} aria-hidden="true" />
                {city.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 40,
        background: style.color_background_primary,
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: 4,
          overflowX: 'auto', padding: '12px 0',
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {setActiveCategory(cat.id); setFiltered(settingFilteredCat(cat.id));}}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px',
                  borderRadius: 'var(--border-radius-md)',
                  border: active ? '0.5px solid #FAC775' : '0.5px solid var(--color-border-tertiary)',
                  background: active ? '#FAEEDA' : 'transparent',
                  color: active ? '#854F0B' : 'var(--color-text-secondary)',
                  fontSize: 13, fontWeight: active ? 500 : 400,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
              >
                <i className={`ti ${cat.icon}`} style={{ fontSize: 14 }} aria-hidden="true" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product grid ── */}
      <main id="cardapio" style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', margin: '0 0 1.5rem', letterSpacing: '0.03em' }}>
          {filtered.length} {filtered.length === 1 ? 'item' : 'itens'}
          {activeCategory !== 'todos' ? ` em ${catLabel}` : ' no cardápio'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {filtered.map(product => {
            const colors  = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.cafe;
            const tagC    = product.tag ? (TAG_COLORS[product.tagColor] || TAG_COLORS.amber) : null;
            const qty     = cart[product.id]?.qty || 0;

            return (
              <div key={product.id} style={{
                background: style.color_background_primary,
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Icon band */}
                <div style={{
                  background: colors.bg,
                  height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <i className={`ti ${product.icon}`} style={{ fontSize: 34, color: colors.iconColor }} aria-hidden="true" />
                  {product.tag && (
                    <div style={{
                      position: 'absolute', top: 10, right: 10,
                      background: tagC.bg, color: tagC.text,
                      border: `0.5px solid ${tagC.border}`,
                      borderRadius: 'var(--border-radius-md)',
                      padding: '2px 8px', fontSize: 11, fontWeight: 500,
                    }}>
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 500,
                    margin: '0 0 4px', color: 'var(--color-text-primary)',
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    fontSize: 13, color: 'var(--color-text-secondary)',
                    margin: '0 0 1rem', lineHeight: 1.55, flex: 1,
                  }}>
                    {product.desc}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderTop: '0.5px solid var(--color-border-tertiary)', paddingTop: 12,
                  }}>
                    <div>
                      <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>a partir de </span>
                      <span style={{ fontSize: 18, fontWeight: 500, color: colors.iconColor }}>
                      {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>

                    {qty > 0 ? (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: '#FAEEDA', border: '0.5px solid #FAC775',
                        borderRadius: 'var(--border-radius-md)', padding: '5px 10px',
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#854F0B' }}>{qty}×</span>
                        <button
                          onClick={() => addToCart(product)}
                          aria-label={`Adicionar mais ${product.name}`}
                          style={{
                            background: '#BA7517', border: 'none',
                            borderRadius: 6, width: 22, height: 22,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'white',
                          }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        aria-label={`Adicionar ${product.name} ao carrinho`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '6px 12px',
                          background: 'transparent',
                          border: '0.5px solid var(--color-border-secondary)',
                          borderRadius: 'var(--border-radius-md)',
                          cursor: 'pointer', fontSize: 13,
                          color: 'var(--color-text-secondary)',
                          transition: 'all 0.15s',
                        }}
                      >
                        <i className="ti ti-plus" style={{ fontSize: 14 }} aria-hidden="true" />
                        Adicionar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ── Footer ── */}
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
    </div>
  );
}
