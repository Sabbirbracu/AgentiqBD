import { ImageResponse } from 'next/og';

export const alt = 'Agentiq BD — Turn Complexity into Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0A0A0B',
          color: '#FCFCF4',
          backgroundImage:
            'radial-gradient(circle at 15% 10%, rgba(232,79,61,0.35), transparent 45%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 800, letterSpacing: 4 }}>
          AGENTIQ
          <span
            style={{
              background: '#E84F3D',
              color: '#FCFCF4',
              fontSize: 20,
              padding: '4px 10px',
              borderRadius: 6,
              letterSpacing: 1,
            }}
          >
            BD
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          <span>Turn complexity</span>
          <span style={{ display: 'flex' }}>
            into&nbsp;<span style={{ color: '#E84F3D' }}>intelligence.</span>
          </span>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: 'rgba(252,252,244,0.6)' }}>
          AI Engineering · Business Automation · Industrial AI
        </div>
      </div>
    ),
    size,
  );
}
