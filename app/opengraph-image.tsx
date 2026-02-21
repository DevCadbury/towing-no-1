import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #050d1f 0%, #0d1f3c 50%, #0a1628 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Amber glow blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '200px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(251,191,36,0.08)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '100px', width: '340px', height: '340px', borderRadius: '50%', background: 'rgba(251,191,36,0.06)', display: 'flex' }} />

        {/* Left amber accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: 'linear-gradient(180deg, #fbbf24, #f59e0b)', display: 'flex' }} />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px', height: '100%' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)', borderRadius: '999px', padding: '6px 20px' }}>
              <span style={{ color: '#fbbf24', fontSize: '18px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                🚛  BC · Lower Mainland · Available 24/7
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '28px' }}>
            <span style={{ color: '#ffffff', fontSize: '68px', fontWeight: 900, lineHeight: '1.05', letterSpacing: '-1px' }}>
              24/7 Emergency Towing BC
            </span>
            <span style={{ color: '#fbbf24', fontSize: '52px', fontWeight: 900, lineHeight: '1.1', letterSpacing: '-0.5px' }}>
              We Are Coming To You!
            </span>
          </div>

          {/* Subtext */}
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.7)', fontSize: '24px', fontWeight: 400, marginBottom: '36px', letterSpacing: '0.01em' }}>
            Fast · Affordable · Licensed &amp; Insured · 30-Min Response
          </div>

          {/* Bottom row: brand + phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', background: '#fbbf24', color: '#050d1f', fontWeight: 900, fontSize: '26px', padding: '16px 36px', borderRadius: '14px', letterSpacing: '0.02em' }}>
              TowingNo.1
            </div>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 700, fontSize: '24px', padding: '16px 32px', borderRadius: '14px' }}>
              towing-no-1.vercel.app
            </div>
          </div>
        </div>

        {/* Decorative right grid lines */}
        <div style={{ position: 'absolute', right: '60px', top: '40px', bottom: '40px', width: '1px', background: 'rgba(251,191,36,0.12)', display: 'flex' }} />
        <div style={{ position: 'absolute', right: '120px', top: '80px', bottom: '80px', width: '1px', background: 'rgba(251,191,36,0.07)', display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}
