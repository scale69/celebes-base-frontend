import type { Metadata } from 'next'
import {
  Shield,
  User,
  Users,
  Briefcase,
  Scale,
  Code2,
  Building2,
  Globe,
  FileText,
  MapPin,
  Hash,
  Mail,
  Phone,
  ChevronRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Redaksi | CELEBES SULTRA - Portal Berita Sulawesi Tenggara',
  description:
    'Susunan Redaksi CELEBES SULTRA - Tim redaksi portal berita terpercaya dari Sulawesi Tenggara.',
}

const daftarReporter = [
  'Yusran',
  'La Ode Biku',
  'Muhammad Adryan Lusa',
  'La Ode Muh. Arjuna Matadjo Djimen',
]

interface RedaksiCardProps {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}

function RedaksiCard({ icon, label, value, highlight = false }: RedaksiCardProps) {
  return (
    <div
      className={`redaksi-card ${highlight ? 'redaksi-card--highlight' : ''}`}
    >
      <div className="redaksi-card__icon">{icon}</div>
      <div className="redaksi-card__body">
        <span className="redaksi-card__label">{label}</span>
        <span className="redaksi-card__value">{value}</span>
      </div>
    </div>
  )
}

export default function RedaksiPage() {
  return (
    <>
      <style>{`
        /* ===== REDAKSI PAGE STYLES ===== */
        .redaksi-wrapper {
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* --- Hero Banner --- */
        .redaksi-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0e7490 100%);
          border-radius: 16px;
          padding: 40px 32px;
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
        }
        .redaksi-hero::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 220px;
          height: 220px;
          background: rgba(14, 165, 233, 0.15);
          border-radius: 50%;
        }
        .redaksi-hero::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -30px;
          width: 180px;
          height: 180px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 50%;
        }
        .redaksi-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 9999px;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .redaksi-hero__title {
          color: #ffffff;
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 10px;
          position: relative;
          z-index: 1;
        }
        .redaksi-hero__title span {
          background: linear-gradient(90deg, #6ee7b7, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .redaksi-hero__sub {
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          position: relative;
          z-index: 1;
          margin: 0;
        }

        /* --- Section heading --- */
        .section-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .section-heading__dot {
          width: 4px;
          height: 28px;
          border-radius: 4px;
          background: linear-gradient(180deg, #10b981, #0ea5e9);
          flex-shrink: 0;
        }
        .section-heading__title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* --- Redaksi Card --- */
        .redaksi-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          margin-bottom: 10px;
        }
        .redaksi-card:hover {
          box-shadow: 0 4px 16px rgba(14, 116, 144, 0.1);
          border-color: #38bdf8;
          transform: translateY(-1px);
        }
        .redaksi-card--highlight {
          border-color: #6ee7b7;
          background: linear-gradient(135deg, #f0fdf4, #ecfeff);
        }
        .redaksi-card--highlight:hover {
          border-color: #10b981;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15);
        }
        .redaksi-card__icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e0f2fe, #d1fae5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0e7490;
        }
        .redaksi-card__body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .redaksi-card__label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .redaksi-card__value {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          white-space: normal;
          word-break: break-word;
        }

        /* --- Panel / White box --- */
        .redaksi-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        /* --- Reporter list --- */
        .reporter-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .reporter-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
        }
        .reporter-item:hover {
          background: #ecfeff;
          border-color: #a5f3fc;
        }
        .reporter-item__num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0e7490, #10b981);
          color: white;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .reporter-item__name {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }
        .reporter-item__icon {
          margin-left: auto;
          color: #94a3b8;
        }

        /* --- Legal info panel --- */
        .legal-panel {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%);
          border: 1px solid #a7f3d0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .legal-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(167, 243, 208, 0.6);
          font-size: 13.5px;
          color: #1e293b;
        }
        .legal-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .legal-row__icon {
          color: #059669;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .legal-row__label {
          font-weight: 700;
          white-space: nowrap;
          color: #065f46;
          margin-right: 4px;
        }

        /* --- Address panel --- */
        .address-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .address-panel__icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0f172a, #1e3a5f);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .address-panel__label {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
        }
        .address-panel__text {
          font-size: 13.5px;
          color: #334155;
          line-height: 1.7;
        }

        /* --- Footer tag --- */
        .redaksi-footer-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #0f172a, #1e3a5f);
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          font-size: 12.5px;
          font-weight: 500;
          margin-top: 4px;
        }
        .redaksi-footer-tag strong {
          color: #6ee7b7;
          font-weight: 700;
        }
      `}</style>

      <div className="redaksi-wrapper">
        {/* ── Hero ── */}
        <div className="redaksi-hero">
          <div className="redaksi-hero__badge">
            <Shield size={12} />
            Struktur Organisasi
          </div>
          <h1 className="redaksi-hero__title">
            Redaksi <span>CELEBES SULTRA</span>
          </h1>
          <p className="redaksi-hero__sub">
            Susunan dewan pengawas, pimpinan redaksi, dan tim jurnalis kami
          </p>
        </div>

        {/* ── Dewan Pengawas ── */}
        <div className="redaksi-panel">
          <div className="section-heading">
            <div className="section-heading__dot" />
            <span className="section-heading__title">Dewan Pengawas / Komisaris</span>
          </div>
          <RedaksiCard
            icon={<Shield size={18} />}
            label="Ketua"
            value="Muh. Syarif S.SI"
            highlight
          />
          <RedaksiCard
            icon={<User size={18} />}
            label="Wakil Ketua"
            value="Muh. Farhan"
          />
        </div>

        {/* ── Pimpinan ── */}
        <div className="redaksi-panel">
          <div className="section-heading">
            <div className="section-heading__dot" />
            <span className="section-heading__title">Pimpinan Redaksi</span>
          </div>
          <RedaksiCard
            icon={<Briefcase size={18} />}
            label="Direktur"
            value="Drs. Abd. Azis Senong"
            highlight
          />
          <RedaksiCard
            icon={<Briefcase size={18} />}
            label="Penanggung Jawab / Pimpinan Redaksi"
            value="Drs. Abdul Azis Senong"
          />
          <RedaksiCard
            icon={<Users size={18} />}
            label="Redaksi Pelaksana"
            value="-"
          />
          <RedaksiCard
            icon={<User size={18} />}
            label="Editor"
            value="Muh. Yasir Putra A."
          />
        </div>

        {/* ── Reporter ── */}
        <div className="redaksi-panel">
          <div className="section-heading">
            <div className="section-heading__dot" />
            <span className="section-heading__title">Reporter</span>
          </div>
          <div className="reporter-list">
            {daftarReporter.map((nama, i) => (
              <div key={i} className="reporter-item">
                <div className="reporter-item__num">{i + 1}</div>
                <span className="reporter-item__name">{nama}</span>
                <ChevronRight size={14} className="reporter-item__icon" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Divisi Lain ── */}
        <div className="redaksi-panel">
          <div className="section-heading">
            <div className="section-heading__dot" />
            <span className="section-heading__title">Divisi Pendukung</span>
          </div>
          <RedaksiCard
            icon={<Briefcase size={18} />}
            label="Marketing"
            value="Sitti Mirnawati"
          />
          <RedaksiCard
            icon={<Briefcase size={18} />}
            label="Admin dan Keuangan"
            value="Wa Ode Muliana, S.E"
          />
          <RedaksiCard
            icon={<Scale size={18} />}
            label="Penasehat Hukum"
            value="La Ode Muh. Ichsan, S.H., M.H"
          />
          <RedaksiCard
            icon={<Code2 size={18} />}
            label="Web Programmer"
            value="La Ode Muhamad Wan Azmi, A.Md. T"
          />
        </div>

        {/* ── Legal / Perusahaan ── */}
        <div className="legal-panel">
          <div className="section-heading">
            <div className="section-heading__dot" />
            <span className="section-heading__title">Informasi Perusahaan</span>
          </div>

          <div className="legal-row">
            <Building2 size={16} className="legal-row__icon" />
            <span>
              <span className="legal-row__label">Perusahaan:</span>
              PT CELEBES NUSANTARA UTAMA
            </span>
          </div>
          <div className="legal-row">
            <Globe size={16} className="legal-row__icon" />
            <span>
              <span className="legal-row__label">Penerbit / Pengelola:</span>
              Celebessultra.com
            </span>
          </div>
          <div className="legal-row">
            <FileText size={16} className="legal-row__icon" />
            <span>
              <span className="legal-row__label">Akta Notaris:</span>
              Karlina, SH, M.Kn — No; 832 Tanggal 16 Desember 2025
            </span>
          </div>
          <div className="legal-row">
            <Scale size={16} className="legal-row__icon" />
            <span>
              <span className="legal-row__label">S.K. Menkumham:</span>
              AHU-0108825.AH.01.01 Tahun 2025
            </span>
          </div>
          <div className="legal-row">
            <Hash size={16} className="legal-row__icon" />
            <span>
              <span className="legal-row__label">NOMOR INDUK BERUSAHA:</span>
              0702260078452
            </span>
          </div>
          <div className="legal-row">
            <FileText size={16} className="legal-row__icon" />
            <span>
              <span className="legal-row__label">Berdiri Tahun:</span>
              2025
            </span>
          </div>
        </div>

        {/* ── Alamat ── */}
        <div className="address-panel">
          <div className="address-panel__icon">
            <MapPin size={20} />
          </div>
          <div>
            <p className="address-panel__label">Alamat Kantor</p>
            <p className="address-panel__text">
              Jalan D.I Panjaitan Komplek BTN Pepabri Lepo-Lepo Indah,<br />
              Blok A.10/No.20, Kelurahan Wundudopi,<br />
              Kec. Baruga, Kota Kendari,<br />
              Provinsi Sulawesi Tenggara — Kode Pos: 93116
            </p>
          </div>
        </div>

        {/* ── Footer tag ── */}
        <div className="redaksi-footer-tag">
          <Mail size={14} />
          <span>
            Kontak Redaksi:{' '}
            <a
              href="mailto:ptcelebesnusantarautama@gmail.com"
              style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}
            >
              ptcelebesnusantarautama@gmail.com
            </a>
          </span>
        </div>
      </div>
    </>
  )
}