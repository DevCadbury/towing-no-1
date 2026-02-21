import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = '24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Image() {
  const imageBuffer = await readFile(join(process.cwd(), 'public/preview.jpg'))
  const base64 = imageBuffer.toString('base64')
  const src = `data:image/jpeg;base64,${base64}`

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '1200px', height: '630px' }}>
        <img
          src={src}
          width={1200}
          height={630}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
    ),
    { ...size }
  )
}
