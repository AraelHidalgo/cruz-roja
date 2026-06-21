import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// Secret key for JWT. In production, this should be in .env
const secretKey = process.env.JWT_SECRET || 'secret-key-cruz-roja-123456789'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function getSession() {
  const session = (await cookies()).get('admin_session')?.value
  if (!session) return null
  try {
    return await decrypt(session)
  } catch (error) {
    return null
  }
}

export async function login(username: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ username, expires })

  ;(await cookies()).set('admin_session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function logout() {
  ;(await cookies()).set('admin_session', '', {
    expires: new Date(0),
    httpOnly: true,
  })
}
