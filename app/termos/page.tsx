"use client";

import { useState, useEffect, useRef } from "react";
import { style } from "../_style/style"

const sections = [
  {
    id: "introducao",
    title: "1. Introdução",
    content: `Bem-vindo(a) ao Raízes do Nordeste, uma lanchonete especializada em alimentos, temperos, iguarias e produtos artesanais da culinária nordestina brasileira. O presente documento estabelece os Termos de Uso que regulam o acesso e a utilização de nosso site, aplicativo e demais serviços disponibilizados.
Ao acessar, navegar ou utilizar qualquer funcionalidade de nossa plataforma, você — doravante denominado(a) Usuário(a) ou Cliente — declara ter lido, compreendido e concordado integralmente com as condições aqui estabelecidas, bem como com nossa Política de Privacidade.
Caso não concorde com qualquer disposição deste documento, recomendamos que não utilize nossos serviços.`,
  },
  {
    id: "identificacao",
    title: "2. Identificação",
    content: `A plataforma Raízes do Nordeste é operada por:

            Razão Social: RAÍZES DO NORDESTE
            CNPJ: [INSERIR CNPJ]
            Endereço: [INSERIR ENDEREÇO COMPLETO]
            E-mail: [INSERIR EMAIL]
            Telefone/WhatsApp: [INSERIR TELEFONE]
            Encarregado de Dados (DPO): [NOME DO DPO] —  [INSERIR EMAIL]
            `,
  },
  {
    id: "cadastro",
    title: "3. Cadastro e Conta de Usuário",
    content: `Para realizar compras em nossa plataforma, é necessário efetuar cadastro com informações verdadeiras, completas e atualizadas. O Usuário é responsável pela veracidade dos dados fornecidos, comprometendo-se a atualizá-los sempre que necessário.

    Para cadastrar-se, o Usuário deve:
•	Ter no mínimo 18 (dezoito) anos de idade ou ser emancipado nos termos da lei;
•	Possuir CPF válido e regular junto à Receita Federal;
•	Informar endereço de e-mail ativo e número de telefone para contato;
•	Manter uma senha segura e confidencial, não compartilhando-a com terceiros.

O Usuário é o único responsável por todas as atividades realizadas em sua conta. Em caso de uso não autorizado ou suspeita de violação de segurança, deverá notificar imediatamente a equipe Raízes do Nordeste pelo e-mail [INSERIR EMAIL]
`,
  },
  {
    id: "pedidos",
    title: "4. Produtos, Pedidos e Entrega",
    content: `Todos os produtos comercializados pela plataforma possuem descrição detalhada, incluindo ingredientes, informações nutricionais, peso, origem e prazo de validade, quando aplicável. As fotografias são meramente ilustrativas, podendo haver variações em relação ao produto real.

    Ao finalizar uma compra, o Usuário receberá confirmação por e-mail com o número do pedido e os detalhes da transação. O contrato de compra e venda é formalizado no momento da confirmação do pagamento.

A disponibilidade dos produtos está sujeita ao estoque existente. Caso um produto não esteja disponível após a confirmação do pedido, o Cliente será notificado e poderá optar por produto substituto, crédito na plataforma ou estorno integral do valor pago.

Os prazos de entrega variam conforme a região de destino e a modalidade de frete selecionada. Prazos estimados são informados no momento da compra. Não nos responsabilizamos por atrasos decorrentes de fatores externos, como condições climáticas adversas ou greves de transportadoras.

Produtos perecíveis são embalados e transportados conforme normas sanitárias vigentes. O Cliente deve conferir as condições do produto no ato do recebimento. Reclamações referentes a danos no transporte devem ser realizadas em até 24 (vinte e quatro) horas após a entrega.
`,
    
  },
  {
    id: "pagamentos",
    title: "5. Pagamentos e Forma de Cobrança",
    content: `A plataforma Raízes do Nordeste aceita as seguintes formas de pagamento:
•	Cartão de crédito (parcelamento em até 12x, sujeito a juros conforme bandeira);
•	Cartão de débito;
•	PIX (com desconto especial de 5% sobre o valor total);
•	Boleto bancário (compensação em até 3 dias úteis);
•	Carteiras digitais: Mercado Pago, PicPay e similares.
Todos os pagamentos são processados por gateways certificados e seguros. O Raízes do Nordeste não armazena dados completos de cartões de crédito ou débito em seus servidores.
`
  },
  {
    id: "trocas",
    title: "6. Políticas de Devolução, Troca e Cancelamento",
    content: `Nos termos do artigo 49 do Código de Defesa do Consumidor (Lei nº 8.078/1990), o Cliente pode exercer o direito de arrependimento em até 7 (sete) dias corridos a partir da data de recebimento do produto, para compras realizadas fora do estabelecimento comercial.
ATENÇÃO: O direito de arrependimento não se aplica a produtos alimentícios perecíveis ou que tenham sido abertos ou consumidos parcialmente.

Para solicitar troca, devolução ou cancelamento, o Cliente deverá:
•	Acessar sua conta e selecionar o pedido correspondente;
•	Clicar em 'Solicitar Devolução/Troca' e informar o motivo;
•	Aguardar contato de nossa equipe em até 2 (dois) dias úteis;
•	Devolver o produto em sua embalagem original, sem sinais de uso.

O reembolso será processado em até 10 (dez) dias úteis após o recebimento e análise do produto devolvido, pela mesma forma de pagamento utilizada na compra.
`
  },
  {
    id: "propriedade",
    title: "7. Propriedade Intelectual",
    content: `Todo o conteúdo disponibilizado na plataforma Raízes do Nordeste — incluindo, mas não se limitando a logotipos, marcas, imagens, textos, receitas, layout, código-fonte e design — é de propriedade exclusiva da empresa ou de seus licenciantes e está protegido pelas leis brasileiras de propriedade intelectual.
É vedada a reprodução, distribuição, modificação ou uso para fins comerciais de qualquer conteúdo da plataforma sem prévia autorização escrita do Raízes do Nordeste.
`,
  },
  {
    id: "proibido",
    title: "8. Condutas Proibidas",
    content: `É expressamente vedado ao Usuário:
•	Fornecer informações falsas no cadastro ou nas transações;
•	Utilizar a plataforma para fins ilícitos ou contrários à moral e aos bons costumes;
•	Tentar acessar áreas restritas da plataforma sem autorização;
•	Realizar engenharia reversa ou tentar reproduzir o código-fonte da plataforma;
•	Utilizar robôs, scrapers ou qualquer recurso automatizado para coletar dados;
•	Publicar avaliações falsas ou difamatórias sobre produtos ou a empresa;
•	Praticar qualquer ato que possa comprometer a segurança ou integridade da plataforma.
O descumprimento destas proibições poderá acarretar o cancelamento imediato da conta, sem prejuízo das medidas legais cabíveis.
`,
  },
  {
    id: "responsabilidade",
    title: "9. Limitação de Responsabilidades",
    content: `O Raízes do Nordeste não se responsabiliza por:
•	Danos decorrentes do uso indevido da plataforma pelo Usuário;
•	Indisponibilidade temporária dos serviços por motivos de manutenção ou falha técnica;
•	Danos causados por vírus, malware ou ataques cibernéticos de terceiros, desde que tenham sido adotadas as medidas de segurança razoáveis;
•	Informações incorretas fornecidas pelo Usuário no momento do cadastro ou pedido;
•	Atrasos em entregas por causas de força maior ou caso fortuito.
`
  },
  {
    id: "menores",
    title: "10. Proteção de Menores",
    content: `A plataforma Raízes do Nordeste não é direcionada a menores de 18 (dezoito) anos. Não coletamos conscientemente dados de menores de idade. Caso tomemos conhecimento de que dados de um menor foram coletados sem o consentimento dos responsáveis legais, procederemos à exclusão imediata dos referidos dados.
Os responsáveis legais que identificarem o cadastro indevido de menor de idade devem contatar nossa equipe imediatamente pelo e-mail [INSERIR EMAIL]
`,
  },
  {
    id: "alteracao",
    title: "11. Alterações nos Termos de Uso",
    content: `O Raízes do Nordeste reserva-se o direito de alterar o presente documento a qualquer momento, mediante publicação da versão atualizada na plataforma, com indicação da data da revisão. Alterações substanciais serão comunicadas aos Usuários cadastrados por e-mail com antecedência mínima de 15 (quinze) dias.
O uso continuado da plataforma após a publicação das alterações implicará a aceitação das novas condições.
`,
  },
  {
    id: "disposicoes",
    title: "12. Disposições Gerais",
    content: `Este documento é regido e interpretado de acordo com as leis da República Federativa do Brasil, em especial o Código de Defesa do Consumidor (Lei nº 8.078/1990), a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).

Fica eleito o foro da Comarca de [INSERIR CIDADE/ESTADO], com exclusão de qualquer outro, por mais privilegiado que seja, para dirimir eventuais controvérsias decorrentes deste instrumento.
`
  },
  {
    id: "contato",
    title: "13. Como nos Contatar",
    content: "Para dúvidas, solicitações ou reclamações relacionadas a estes termos ou ao tratamento de seus dados pessoais:",
    contactInfo: [
      { label: "E-mail geral", value: "privacidade@empresa.com.br" },
      { label: "DPO", value: "dpo@empresa.com.br" },
      { label: "Telefone", value: "(11) 0000-0000" },
      { label: "Endereço", value: "Rua Exemplo, 000 – São Paulo, SP – CEP 00000-000" },
    ],
    note: "Você também pode contatar a Autoridade Nacional de Proteção de Dados (ANPD) em: www.gov.br/anpd",
  },
];

export default function TermosDeUso() {
  const [activeSection, setActiveSection] = useState("introducao");
  const [scrolled, setScrolled] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const observersRef = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = sections.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(s.id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    observersRef.current = observers;
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="/" className="nav-brand">Raízes do Nordeste</a>
      </nav>

      {/* Header */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-ornament" />
        <div className="hero-inner">
          <div className="hero-eyebrow">Documentação Legal</div>
          <h1>
            Termos de <em>Uso</em>
          </h1>
          <div className="hero-meta">
            <span>📅 Última atualização: 19 de maio de 2026</span>
            <span>📋 Versão 1.0</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="toc-label">Índice</div>
          <ul className="toc-list">
            {sections.map((s) => (
              <li key={s.id} className="toc-item">
                <button
                  className={`toc-btn${activeSection === s.id ? " active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conteúdo */}
        <main className="content">
          {sections.map((s, i) => {
            const num = s.title.split(".")[0];
            const titleText = s.title.split(". ").slice(1).join(". ");
            return (
              <section key={s.id} id={s.id} className="section">
                <div className="section-header">
                  <span className="section-num">{num}</span>
                  <h2 className="section-title">{titleText}</h2>
                </div>

                {s.content && <p style={{ whiteSpace: "pre-line" }}>{s.content}</p>}

                {/* Lista */}
                {s.list && !s.table && !s.subsections && (
                  <>
                    {s.id === "definicoes" ? (
                      <div className="def-list">
                        {s.list.map((d, j) => (
                          <div key={j} className="def-item">
                            <span className="def-term">{d.term}</span>
                            <span className="def-desc">{d.def}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="bullet-list">
                        {s.list.map((item, j) => <li key={j}>{item}</li>)}
                      </ul>
                    )}
                    {s.note && <div className="note-box">{s.note}</div>}
                  </>
                )}

                {/* Subseções */}
                {s.subsections && s.subsections.map((sub, j) => (
                  <div key={j} className="subsection">
                    <div className="sub-title">{sub.subtitle}</div>
                    <ul className="bullet-list">
                      {sub.list.map((item, k) => <li key={k}>{item}</li>)}
                    </ul>
                  </div>
                ))}

                {/* Tabela */}
                {s.table && (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Finalidade</th>
                          <th>Base Legal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.map((row, j) => (
                          <tr key={j}>
                            <td>{row.finalidade}</td>
                            <td><span className="base-tag">{row.base}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Direitos */}
                {s.rights && (
                  <>
                    <div className="rights-grid">
                      {s.rights.map((r, j) => (
                        <div key={j} className="right-card">
                          <div className="right-icon">{r.icon}</div>
                          <div className="right-name">{r.right}</div>
                          <div className="right-desc">{r.desc}</div>
                        </div>
                      ))}
                    </div>
                    {s.howTo && <div className="note-box teal" style={{ marginTop: 20 }}>{s.howTo}</div>}
                  </>
                )}

                {/* Contact */}
                {s.contactInfo && (
                  <>
                    <div className="contact-grid">
                      {s.contactInfo.map((c, j) => (
                        <div key={j} className="contact-row">
                          <span className="contact-label">{c.label}</span>
                          <span className="contact-value">{c.value}</span>
                        </div>
                      ))}
                    </div>
                    {s.note && <div className="note-box teal">{s.note}</div>}
                  </>
                )}
              </section>
            );
          })}
        </main>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="footer">
          <p className="footer-text">
            © 2026 Raízes do Nordeste. Todos os direitos reservados.
          </p>
          <a href="https://www.gov.br/anpd" className="footer-anpd" target="_blank" rel="noopener noreferrer">
            ANPD — Autoridade Nacional de Proteção de Dados →
          </a>
        </div>
      </div>

      {/* MOBILE TOC */}
      <button className="mobile-toc-btn" onClick={() => setTocOpen(true)} aria-label="Abrir índice">
        ☰
      </button>
      {tocOpen && (
        <div className="mobile-drawer" onClick={(e) => e.target === e.currentTarget && setTocOpen(false)}>
          <div className="mobile-drawer-bg" onClick={() => setTocOpen(false)} />
          <div className="mobile-drawer-panel">
            <div className="mobile-drawer-title">Índice</div>
            <ul className="toc-list">
              {sections.map((s) => (
                <li key={s.id} className="toc-item">
                  <button
                    className={`toc-btn${activeSection === s.id ? " active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --ink: ${style.white};
          --ink-soft: ${style.white};
          --ink-mute: ${style.white};
          --paper: ${style.black};
          --paper-warm: #f1ede4;
          --rule: #e3ddd4;
          --accent: #c44b2b;
          --accent-light: #f5e8e4;
          --teal: #b5842a;
          --teal-light: #faf3e0;
          --gold: #b5842a;
          --gold-light: #faf3e0;
          --nav-h: 64px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.75;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          height: var(--nav-h);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px;
          z-index: 100;
          transition: background .3s, box-shadow .3s;
        }
        .nav.scrolled {
          background: var(--paper);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 var(--rule);
        }
        .nav-brand {
          font-family: 'Fraunces', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -.5px;
        }
        .nav-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--teal);
          background: var(--teal-light);
          border: 1px solid #b2ddd9;
          border-radius: 20px;
          padding: 3px 10px;
        }

        /* ── HEADER ── */
        .hero {
          min-height: 42vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 0 56px 0;
          border-bottom: 1px solid var(--rule);
          position: relative;
          overflow: hidden;
        }
        .hero-inner {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          padding: 0 40px;
          padding-top: calc(var(--nav-h) + 48px);
        }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block; width: 28px; height: 1px;
          background: var(--accent);
        }
        .hero h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -.03em;
          color: var(--ink);
          margin-bottom: 22px;
        }
        .hero h1 em {
          font-style: italic;
          color: var(--teal);
        }
        .hero-meta {
          display: flex; flex-wrap: wrap; gap: 24px;
          font-size: 13px; color: var(--ink-mute);
        }
        .hero-meta span { display: flex; align-items: center; gap: 6px; }

        /* ── LAYOUT ── */
        .layout {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 224px 1fr;
          gap: 64px;
          align-items: start;
          padding-top: 64px;
          padding-bottom: 120px;
        }

        /* ── SIDEBAR ── */
        .sidebar {
          position: sticky;
          top: calc(var(--nav-h) + 24px);
        }
        .toc-label {
          font-size: 10px; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--ink-mute);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--rule);
        }
        .toc-list { list-style: none; }
        .toc-item {
          padding: 1px 0;
        }
        .toc-btn {
          display: block; width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          color: var(--ink-mute);
          background: none; border: none;
          padding: 6px 10px 6px 12px;
          border-left: 2px solid transparent;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: color .2s, border-color .2s, background .2s;
          line-height: 1.4;
        }
        .toc-btn:hover { color: var(--paper); background: var(--paper-warm); }
        .toc-btn.active {
          color: var(--teal);
          border-left-color: var(--teal);
          background: var(--teal-light);
          font-weight: 500;
        }

        /* ── CONTÉUDO ── */
        .content { min-width: 0; }

        /* ── SEÇÃO ── */
        .section {
          margin-bottom: 72px;
          scroll-margin-top: calc(var(--nav-h) + 32px);
          animation: fadeUp .5s ease both;
        }


        .section-header {
          display: flex; align-items: baseline; gap: 14px;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--rule);
        }
        .section-num {
          font-family: 'Fraunces', serif;
          font-size: 1.7rem;
          font-weight: 300;
          color: var(--rule);
          line-height: 1;
          min-width: 32px;
        }
        .section-title {
          font-family: 'Fraunces', serif;
          font-size: 1.35rem;
          font-weight: 600;
          letter-spacing: -.02em;
          color: var(--ink);
        }

        .section p {
          color: var(--ink-soft);
          margin-bottom: 16px;
        }

        /* ── DEFINIÇÕES ── */
        .def-list { display: grid; gap: 10px; margin-top: 6px; }
        .def-item {
          display: grid; grid-template-columns: 168px 1fr;
          gap: 12px;
          padding: 12px 16px;
          background: var(--paper-warm);
          border-radius: 6px;
          border: 1px solid var(--rule);
        }
        .def-term {
          font-weight: 500; font-size: 13px;
          color: var(--paper);
          padding-top: 1px;
        }
        .def-desc { font-size: 13.5px; color: var(--paper); }

        /* ── SUBSSEÇÕES── */
        .subsection { margin-top: 22px; }
        .sub-title {
          font-size: 13px; font-weight: 500;
          letter-spacing: .05em; text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
        }
        .bullet-list { list-style: none; display: grid; gap: 6px; }
        .bullet-list li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: var(--paper);
          padding: 8px 12px;
          background: var(--paper-warm);
          border-radius: 5px;
        }
        .bullet-list li::before {
          content: '–';
          color: var(--teal);
          font-weight: 600;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* ── TABLE ── */
        .table-wrap { overflow-x: auto; margin-top: 8px; border-radius: 8px; border: 1px solid var(--rule); }
        table { width: 100%; border-collapse: collapse; }
        thead tr { background: var(--ink); }
        th {
          font-size: 11px; font-weight: 500;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--paper);
          padding: 12px 16px;
          text-align: left;
        }
        td {
          font-size: 13.5px; color: var(--ink-soft);
          padding: 11px 16px;
          border-bottom: 1px solid var(--rule);
          vertical-align: top;
          color: var(--paper);
          background: var(--paper-warm);
        }
        .base-tag {
          display: inline-block;
          font-size: 11px; font-weight: 500;
          padding: 2px 8px; border-radius: 20px;
          background: var(--teal-light);
          color: var(--teal);
          border: 1px solid var(--teal);
        }

        /* ── TABELA DIREITOS ── */
        .rights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }
        .right-card {
          padding: 16px;
          border: 1px solid var(--rule);
          border-radius: 8px;
          background: white;
          transition: border-color .2s, box-shadow .2s;
        }
        .right-card:hover {
          border-color: var(--teal);
          box-shadow: 0 4px 16px rgba(30,122,110,.08);
        }
        .right-icon { font-size: 1.4rem; margin-bottom: 8px; color: var(--paper); }
        .right-name {
          font-size: 13px; font-weight: 500;
          color: var(--paper); margin-bottom: 4px;
        }
        .right-desc { font-size: 12.5px; color: var(--paper); line-height: 1.5; }

        /* ── NOTE BOX ── */
        .note-box {
          margin-top: 16px;
          padding: 14px 18px;
          border-left: 3px solid var(--accent);
          background: var(--accent-light);
          border-radius: 0 6px 6px 0;
          font-size: 13.5px;
          color: var(--paper);
        }
        .note-box.teal {
          border-left-color: var(--teal);
          background: var(--teal-light);
        }
        .note-box.gold {
          border-left-color: var(--gold);
          background: var(--gold-light);
        }

        /* ── COOKIES ── */
        .cookie-grid { display: grid; gap: 10px; margin-top: 10px; }
        .cookie-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border: 1px solid var(--rule);
          border-radius: 7px;
          background: var(--paper-warm);
        }
        .cookie-info { flex: 1; }
        .cookie-type { font-weight: 500; font-size: 13.5px; color: var(--ink); }
        .cookie-desc { font-size: 13px; color: var(--ink-mute); margin-top: 2px; }
        .cookie-badge {
          flex-shrink: 0;
          font-size: 11px; font-weight: 500;
          padding: 3px 9px; border-radius: 20px;
          align-self: flex-start;
        }
        .badge-required { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .badge-optional { background: var(--teal-light); color: var(--teal); border: 1px solid #b2ddd9; }

        /* ── CONTACT ── */
        .contact-grid { display: grid; gap: 8px; margin-top: 10px; }
        .contact-row {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px;
          border: 1px solid var(--rule);
          border-radius: 6px;
          background: white;
        }
        .contact-label { font-size: 12px; font-weight: 500; color: var(--paper); min-width: 88px; }
        .contact-value { font-size: 14px; color: var(--teal); }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid var(--rule);
          padding: 40px;
          display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          gap: 16px;
          max-width: 1140px; margin: 0 auto;
        }
        .footer-text { font-size: 13px; color: var(--ink-mute); }
        .footer-anpd {
          font-size: 12.5px;
          color: var(--teal);
          text-decoration: none;
          border-bottom: 1px solid var(--teal);
          opacity: .8;
        }

        /* ── MOBILE TOC ── */
        .mobile-toc-btn {
          display: none;
          position: fixed; bottom: 24px; right: 24px;
          width: 48px; height: 48px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--paper);
          font-size: 1.1rem;
          border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,.2);
          z-index: 99;
        }
        .mobile-drawer {
          display: none;
          position: fixed; inset: 0; z-index: 98;
        }
        .mobile-drawer-bg {
          position: absolute; inset: 0;
          background: rgba(26,26,46,.4);
          backdrop-filter: blur(4px);
        }
        .mobile-drawer-panel {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: var(--paper);
          border-radius: 16px 16px 0 0;
          padding: 24px 24px 48px;
          max-height: 70vh; overflow-y: auto;
        }
        .mobile-drawer-title {
          font-family: 'Fraunces', serif;
          font-size: 1.1rem;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--rule);
        }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .hero-inner { padding: 0 20px; padding-top: calc(var(--nav-h) + 40px); }
          .hero-ornament { display: none; }
          .layout { grid-template-columns: 1fr; padding: 0 20px; gap: 0; padding-top: 40px; }
          .sidebar { display: none; }
          .mobile-toc-btn { display: flex; align-items: center; justify-content: center; }
          .mobile-drawer { display: block; }
          .def-item { grid-template-columns: 1fr; }
          .footer { padding: 32px 20px; }
        }
      `}</style>
    </>
  );
}
