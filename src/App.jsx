import { useState, useEffect, useRef } from 'react'
import content from './content.json'

const ACCENT = '#2d6fba'
const ACCENT_DARK = '#1f5491'
const ACCENT_SOFT = '#eef4fb'
const TEXT = '#1a1a1a'
const TEXT_BODY = '#2a2a2a'
const TEXT_SECONDARY = '#5a5a5a'
const TEXT_MUTED = '#8a8a8a'
const BG = '#fafafa'
const BORDER = '#e8e8e8'
const BORDER_SOFT = '#f0f0f0'

// Базовый путь к публичным файлам (учитывает GitHub Pages base)
const BASE = import.meta.env.BASE_URL || '/'

// Хук для появления при скролле
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h2
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: ACCENT,
          margin: 0,
        }}
      >
        {children}
      </h2>
      <div style={{ height: 1, background: BORDER, marginTop: 9 }} />
    </div>
  )
}

function SkillRow({ label, value }) {
  return (
    <div style={{ marginBottom: 7, lineHeight: 1.6 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.7px',
          textTransform: 'uppercase',
          color: TEXT,
          marginRight: 10,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 14, color: TEXT_BODY }}>{value}</span>
    </div>
  )
}

function JobBlock({ job }) {
  return (
    <div style={{ marginBottom: 32, paddingLeft: 16, borderLeft: `2px solid ${BORDER_SOFT}` }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 6,
          marginLeft: -18,
          paddingLeft: 16,
          borderLeft: `2px solid ${ACCENT}`,
          marginBottom: 6,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT, margin: 0, lineHeight: 1.3 }}>
          {job.company}
        </h3>
        <span
          style={{
            fontSize: 12.5,
            color: TEXT_MUTED,
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
        >
          {job.dates}
        </span>
      </div>
      <div style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: 500, marginBottom: 12 }}>
        {job.role}
      </div>
      {job.blocks.map((b, i) => (
        <div key={i} style={{ marginTop: i > 0 ? 14 : 0 }}>
          {b.title && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: TEXT,
                marginBottom: 4,
                letterSpacing: '0.1px',
              }}
            >
              {b.title}
            </div>
          )}
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: TEXT_BODY, margin: 0 }}>{b.text}</p>
        </div>
      ))}
      {job.award && (
        <p
          style={{
            fontSize: 13,
            fontStyle: 'italic',
            color: TEXT_SECONDARY,
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${BORDER_SOFT}`,
          }}
        >
          {job.award}
        </p>
      )}
    </div>
  )
}

function CertificateCard({ cert }) {
  return (
    <a
      href={cert.file ? `${BASE}certificates/${cert.file}` : '#'}
      target={cert.file ? '_blank' : undefined}
      rel="noreferrer"
      style={{
        display: 'block',
        padding: 16,
        background: 'white',
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        transition: 'all 0.25s ease',
        cursor: cert.file ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (cert.file) {
          e.currentTarget.style.borderColor = ACCENT
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 111, 186, 0.08)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = BORDER
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{cert.title}</div>
      <div style={{ fontSize: 12.5, color: TEXT_SECONDARY }}>
        {cert.issuer}
        {cert.year && <span style={{ color: TEXT_MUTED }}> · {cert.year}</span>}
      </div>
    </a>
  )
}

function RecommendationCard({ rec }) {
  return (
    <div
      style={{
        padding: 20,
        background: 'white',
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 16,
          fontSize: 40,
          color: ACCENT_SOFT,
          fontFamily: 'Georgia, serif',
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        ”
      </div>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: TEXT_BODY,
          margin: 0,
          marginBottom: 14,
          paddingLeft: 4,
          fontStyle: 'italic',
        }}
      >
        {rec.text}
      </p>
      <div style={{ paddingTop: 12, borderTop: `1px solid ${BORDER_SOFT}` }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT }}>{rec.author}</div>
        <div style={{ fontSize: 12.5, color: TEXT_SECONDARY, marginTop: 2 }}>{rec.role}</div>
      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('ru')
  const [downloadOpen, setDownloadOpen] = useState(false)
  const downloadRef = useRef(null)
  const d = content[lang]

  // Закрытие dropdown при клике вне
  useEffect(() => {
    function handleClickOutside(e) {
      if (downloadRef.current && !downloadRef.current.contains(e.target)) {
        setDownloadOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Title страницы при смене языка
  useEffect(() => {
    document.title = `${d.name} · ${d.tagline.split('·')[0].trim()}`
    document.documentElement.lang = lang
  }, [lang, d.name, d.tagline])

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      {/* TOP BAR */}
      <div
        className="no-print"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(250, 250, 250, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: 780,
            margin: '0 auto',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: TEXT_MUTED,
            }}
          >
            {d.navLabel}
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Language toggle */}
            <div
              style={{
                display: 'flex',
                borderRadius: 8,
                overflow: 'hidden',
                border: `1px solid ${BORDER}`,
                background: 'white',
              }}
            >
              {['ru', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    background: lang === l ? ACCENT : 'transparent',
                    color: lang === l ? 'white' : TEXT_SECONDARY,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Download dropdown */}
            <div ref={downloadRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDownloadOpen((v) => !v)}
                style={{
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  background: ACCENT,
                  color: 'white',
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ACCENT_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT)}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PDF
              </button>
              {downloadOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 6px)',
                    background: 'white',
                    borderRadius: 10,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: `1px solid ${BORDER}`,
                    overflow: 'hidden',
                    minWidth: 180,
                    zIndex: 200,
                    animation: 'fadeUp 0.2s ease-out',
                  }}
                >
                  <a
                    href={`${BASE}Bulatov_CV_RU.pdf`}
                    download
                    style={{
                      display: 'block',
                      padding: '11px 16px',
                      fontSize: 13,
                      color: TEXT,
                      borderBottom: `1px solid ${BORDER_SOFT}`,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ACCENT_SOFT)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                  >
                    {d.downloadRu}
                  </a>
                  <a
                    href={`${BASE}Bulatov_CV_EN.pdf`}
                    download
                    style={{
                      display: 'block',
                      padding: '11px 16px',
                      fontSize: 13,
                      color: TEXT,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ACCENT_SOFT)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                  >
                    {d.downloadEn}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 80px' }}>
        {/* HEADER */}
        <div className="fade-in" style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 44px)',
              fontWeight: 700,
              color: TEXT,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.6px',
            }}
          >
            {d.name}
          </h1>
          <div
            style={{
              fontSize: 14.5,
              fontWeight: 500,
              color: ACCENT,
              marginTop: 10,
              letterSpacing: '0.2px',
            }}
          >
            {d.tagline} <span style={{ color: '#b0cce8', margin: '0 4px' }}>·</span> {d.experience}
          </div>
          <div
            style={{
              fontSize: 13,
              color: TEXT_SECONDARY,
              marginTop: 14,
              lineHeight: 1.7,
            }}
          >
            <span>{d.contact.location}</span>
            <span style={{ color: BORDER, margin: '0 8px' }}>·</span>
            <a
              href={`tel:${d.contact.phone.replace(/[^+\d]/g, '')}`}
              style={{ color: TEXT_SECONDARY, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_SECONDARY)}
            >
              {d.contact.phone}
            </a>
            <span style={{ color: BORDER, margin: '0 8px' }}>·</span>
            <a
              href={`mailto:${d.contact.email}`}
              style={{ color: TEXT_SECONDARY, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_SECONDARY)}
            >
              {d.contact.email}
            </a>
            <span style={{ color: BORDER, margin: '0 8px' }}>·</span>
            <span>{d.contact.lang}</span>
          </div>
          <div
            style={{
              height: 2.5,
              background: ACCENT,
              marginTop: 22,
              maxWidth: 60,
              borderRadius: 2,
            }}
          />
        </div>

        {/* SUMMARY */}
        <Reveal>
          <section style={{ marginBottom: 36 }}>
            <SectionTitle>{d.sections.summary}</SectionTitle>
            {d.summaryText.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.75,
                  color: TEXT_BODY,
                  margin: '0 0 10px',
                }}
              >
                {p}
              </p>
            ))}
          </section>
        </Reveal>

        {/* SKILLS */}
        <Reveal>
          <section style={{ marginBottom: 36 }}>
            <SectionTitle>{d.sections.skills}</SectionTitle>
            {d.skills.map((s, i) => (
              <SkillRow key={i} label={s.label} value={s.value} />
            ))}
          </section>
        </Reveal>

        {/* EXPERIENCE */}
        <Reveal>
          <section style={{ marginBottom: 36 }}>
            <SectionTitle>{d.sections.experience}</SectionTitle>
            {d.jobs.map((job, i) => (
              <JobBlock key={i} job={job} />
            ))}
          </section>
        </Reveal>

        {/* CERTIFICATES — показывается только если есть */}
        {d.certificates && d.certificates.length > 0 && (
          <Reveal>
            <section style={{ marginBottom: 36 }}>
              <SectionTitle>{d.sections.certificates}</SectionTitle>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 12,
                }}
              >
                {d.certificates.map((c, i) => (
                  <CertificateCard key={i} cert={c} />
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* RECOMMENDATIONS — показывается только если есть */}
        {d.recommendations && d.recommendations.length > 0 && (
          <Reveal>
            <section style={{ marginBottom: 36 }}>
              <SectionTitle>{d.sections.recommendations}</SectionTitle>
              <div style={{ display: 'grid', gap: 14 }}>
                {d.recommendations.map((r, i) => (
                  <RecommendationCard key={i} rec={r} />
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* EDUCATION + LANGUAGES */}
        <Reveal>
          <section className="edu-grid">
            <div>
              <SectionTitle>{d.sections.education}</SectionTitle>
              {d.edu.map((e, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: TEXT }}>
                    {e.school}{' '}
                    <span style={{ fontWeight: 400, color: TEXT_MUTED, fontSize: 13 }}>
                      · {e.year}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_BODY, marginTop: 3 }}>{e.degree}</div>
                </div>
              ))}
            </div>
            <div>
              <SectionTitle>{d.sections.languages}</SectionTitle>
              {d.langs.map((l, i) => (
                <SkillRow key={i} label={l.label} value={l.value} />
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      <style>{`
        .edu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
        }

        @media (max-width: 600px) {
          .edu-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  )
}
