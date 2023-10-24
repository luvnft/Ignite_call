import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            // Scope significa qual aplicacao ou informacao queremos ter permissao do usuario
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      // signIn e uma funcao que vai ser chamada no fluxo de permissao do usuario
      // entao adicionamos um condicionamento para redirecionar o usuario se nao houver permissao do escopo
      async signIn({ account }) {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar?error=permissions'
        }

        return true
      },

      // Retornando os dados do usuario logado na sessao atual
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res))
}
