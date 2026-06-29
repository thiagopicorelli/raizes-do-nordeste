"use client";

import { useState, useEffect, useRef } from "react";
import { style } from "../_style/style"

const sections = [
  {
    id: "introducao",
    title: "1. Introdução",
    content: `Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018). Ao utilizar nossos serviços, você concorda com as práticas descritas neste documento. Caso não concorde, solicitamos que interrompa o uso de nossos serviços e entre em contato para exercer seus direitos.`,
  },
  {
    id: "definicoes",
    title: "2. Definições",
    content: null,
    list: [
      { term: "Titular", def: "Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento." },
      { term: "Controlador", def: "Pessoa natural ou jurídica responsável pelas decisões referentes ao tratamento de dados pessoais." },
      { term: "Operador", def: "Pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do controlador." },
      { term: "Dado Pessoal", def: "Informação relacionada a pessoa natural identificada ou identificável." },
      { term: "Dado Sensível", def: "Dado pessoal sobre origem racial ou étnica, convicção religiosa, saúde, vida sexual, dado genético ou biométrico." },
      { term: "Tratamento", def: "Toda operação realizada com dados pessoais, como coleta, uso, armazenamento, transmissão e eliminação." },
      { term: "ANPD", def: "Autoridade Nacional de Proteção de Dados, órgão responsável por zelar, implementar e fiscalizar a LGPD." },
    ],
  },
  {
    id: "dados-coletados",
    title: "3. Dados que Coletamos",
    content: "Podemos coletar os seguintes tipos de dados pessoais:",
    subsections: [
      {
        subtitle: "3.1 Dados fornecidos por você",
        list: ["Nome completo", "Idade", "Endereço de e-mail", "Número de telefone", "CPF / CNPJ", "Endereço residencial ou comercial", "Dados de pagamento (processados com segurança por terceiros certificados)"],
      },
      {
        subtitle: "3.2 Dados coletados automaticamente",
        list: ["Endereço IP", "Tipo de dispositivo e sistema operacional", "Páginas visitadas e frequência de consumo", "Cookies e identificadores de sessão", "Localização geográfica aproximada"],
      },
      {
        subtitle: "3.3 Dados de terceiros",
        list: ["Informações de redes sociais quando você faz login por elas", "Dados de parceiros comerciais para validação de identidade"],
      },
    ],
  },
  {
    id: "finalidade",
    title: "4. Finalidade do Tratamento",
    content: "Tratamos seus dados pessoais para as seguintes finalidades, com base nas hipóteses legais previstas na LGPD:",
    table: [
      { finalidade: "Prestação dos serviços contratados", base: "Execução de contrato (Art. 7º, V)" },
      { finalidade: "Comunicações de suporte e atendimento ao cliente", base: "Execução de contrato / Legítimo interesse (Art. 7º, V e IX)" },
      { finalidade: "Envio de comunicações de marketing", base: "Consentimento (Art. 7º, I)" },
      { finalidade: "Cumprimento de obrigações legais e regulatórias", base: "Obrigação legal (Art. 7º, II)" },
      { finalidade: "Prevenção a fraudes e segurança da plataforma", base: "Legítimo interesse (Art. 7º, IX)" },
      { finalidade: "Análise e melhoria dos serviços", base: "Legítimo interesse (Art. 7º, IX)" },
      { finalidade: "Exercício regular de direitos em processos judiciais", base: "Exercício regular de direitos (Art. 7º, VI)" },
    ],
  },
  {
    id: "compartilhamento",
    title: "5. Compartilhamento de Dados",
    content: "Seus dados podem ser compartilhados com:",
    list: [
      "Prestadores de serviço que atuam como operadores (hospedagem, pagamento, análise de dados), mediante contratos com cláusulas de proteção de dados;",
      "Autoridades públicas, quando exigido por lei ou ordem judicial;",
      "Parceiros de negócio, somente com seu consentimento explícito ou para cumprimento contratual;",
      "Empresas do mesmo grupo econômico, para fins operacionais e administrativos.",
    ],
    note: "Não vendemos seus dados pessoais a terceiros.",
  },
  {
    id: "transferencia",
    title: "6. Transferência Internacional",
    content: "Alguns de nossos fornecedores e parceiros podem estar localizados fora do Brasil. Quando realizamos transferências internacionais de dados, adotamos as seguintes salvaguardas:\n\n• Transferências para países com nível de proteção adequado reconhecido pela ANPD;\n• Cláusulas contratuais padrão aprovadas pela ANPD;\n• Consentimento específico do titular, quando aplicável.\n\nEm todos os casos, garantimos que o nível de proteção seja equivalente ao exigido pela LGPD.",
  },
  {
    id: "retencao",
    title: "7. Retenção dos Dados",
    content: "Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política ou para atender exigências legais e regulatórias. Os critérios para definir os prazos incluem:\n\n• Duração do contrato ou do relacionamento com o usuário;\n• Obrigações legais de guarda de informações (ex.: dados fiscais por 5 anos);\n• Prazos prescricionais para exercício de direitos em litígios;\n• Diretrizes e recomendações da ANPD.\n\nApós o encerramento do prazo de retenção, os dados são eliminados de forma segura.",
  },
  {
    id: "direitos",
    title: "8. Seus Direitos como Titular",
    content: "Nos termos da LGPD (Art. 18), você possui os seguintes direitos:",
    rights: [
      { icon: "👁", right: "Acesso", desc: "Confirmar a existência e acessar seus dados pessoais que tratamos." },
      { icon: "✏️", right: "Correção", desc: "Solicitar a correção de dados incompletos, inexatos ou desatualizados." },
      { icon: "🚫", right: "Anonimização / Bloqueio / Eliminação", desc: "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos." },
      { icon: "📋", right: "Portabilidade", desc: "Receber seus dados em formato estruturado e interoperável." },
      { icon: "🔗", right: "Informação sobre compartilhamento", desc: "Saber com quais entidades públicas e privadas seus dados são compartilhados." },
      { icon: "❌", right: "Revogação do consentimento", desc: "Revogar o consentimento dado a qualquer momento, sem prejuízo das operações anteriores." },
      { icon: "⚖️", right: "Oposição", desc: "Opor-se ao tratamento realizado com base em outras hipóteses legais em caso de descumprimento." },
      { icon: "🔍", right: "Revisão de decisões automatizadas", desc: "Solicitar revisão de decisões tomadas exclusivamente com base em tratamento automatizado." },
    ],
    howTo: "Para exercer seus direitos, entre em contato pelo e-mail: privacidade@empresa.com.br. Responderemos em até 15 dias úteis.",
  },
  {
    id: "seguranca",
    title: "9. Segurança dos Dados",
    content: "Implementamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou divulgação indevida:",
    list: [
      "Criptografia em trânsito (TLS/SSL) e em repouso;",
      "Controles de acesso baseados no princípio do menor privilégio;",
      "Monitoramento contínuo de vulnerabilidades;",
      "Plano de resposta a incidentes de segurança;",
      "Treinamentos regulares da equipe em proteção de dados;",
      "Realização periódica de avaliações de impacto à proteção de dados (RIPD).",
    ],
    note: "Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, notificaremos a ANPD e os afetados no prazo legal.",
  },
  {
    id: "cookies",
    title: "10. Cookies e Tecnologias de Rastreamento",
    content: "Você pode gerenciar suas preferências de cookies a qualquer momento nas configurações do navegador ou nas configurações de consentimento do nosso site.",
  },
  {
    id: "encarregado",
    title: "11. Encarregado de Proteção de Dados (DPO)",
    content: "Possuímos um Encarregado de Proteção de Dados (Data Protection Officer – DPO), conforme previsto no Art. 41 da LGPD:\n\nNome: [Nome do Encarregado]\nE-mail: dpo@empresa.com.br\nEndereço: [Endereço da empresa]\n\nO DPO é o canal oficial de comunicação entre nossa empresa, os titulares de dados e a ANPD.",
  },
  {
    id: "atualizacoes",
    title: "12. Atualizações desta Política",
    content: 'Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas, na legislação ou nas determinações da ANPD. Publicaremos a versão atualizada nesta página com a data de revisão. Em caso de alterações materiais, notificaremos você por e-mail ou por aviso no nosso site. Recomendamos a leitura periódica desta política.',
  },
  {
    id: "contato",
    title: "13. Como nos Contatar",
    content: "Para dúvidas, solicitações ou reclamações relacionadas a esta política ou ao tratamento de seus dados pessoais:",
    contactInfo: [
      { label: "E-mail geral", value: "privacidade@empresa.com.br" },
      { label: "DPO", value: "dpo@empresa.com.br" },
      { label: "Telefone", value: "(11) 0000-0000" },
      { label: "Endereço", value: "Rua Exemplo, 000 – São Paulo, SP – CEP 00000-000" },
    ],
    note: "Você também pode contatar a Autoridade Nacional de Proteção de Dados (ANPD) em: www.gov.br/anpd",
  },
];

export default function PoliticaDePrivacidade() {
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
            Política de<br />
            <em>Privacidade</em>
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
