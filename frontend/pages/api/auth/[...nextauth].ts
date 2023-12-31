import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse } from 'axios';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "backend",
      id:"backend",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "gavin@hooli.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        let authCall: AxiosResponse | null = null;
        let profileCall: AxiosResponse | null = null;

        if (credentials) {
          try {
            authCall = await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE + '/api/auth/signin', {
              email: credentials.email,
              password: credentials.password
            })

          } catch (error: any) {
            console.error('Failure', error.toString())
          }

          if (!!authCall && authCall.data.accessToken) {
            profileCall = await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE + '/api/users/profile', {
              headers: {
                'Authorization': 'Bearer ' + authCall.data.accessToken
              }
            })

            if (profileCall) {
              const userProfile = profileCall.data as {
                id: string;
                email: string;
              }

              const user = {
                accessToken: authCall.data.accessToken,
                ...userProfile
              }
              return user
            }
          }
        }

        return null
      },

    }),
    CredentialsProvider({
      name: "blockchain",
      id:"blockchain",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0"
        }
      },
      async authorize(credentials) {
        let authCall: AxiosResponse | null = null;
        let profileCall: AxiosResponse | null = null;

        try {
          authCall = await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE + '/api/auth/evm', {
            message: credentials?.message,
            signature: credentials?.signature,
            address: credentials?.address
          })
        } catch (error: any) {
          console.debug(error.toString())
        }

        if (!!authCall && authCall.data.accessToken) {
          profileCall = await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE + '/api/users/profile', {
            headers: {
              'Authorization': 'Bearer ' + authCall.data.accessToken
            }
          })

          if (profileCall) {
            const userProfile = profileCall.data as {
              id: string;
              evmAddress: string;
            }

            const user = {
              accessToken: authCall.data.accessToken,
              ...userProfile
            }

            return user
          }
        }
        return null

      },
    })

  ],
  callbacks: {
    jwt: function ({ token, user, account, profile, session }) {
      if (user) {
        token.accessToken = (user as any).accessToken
        token.email = user.email
        token.evmAddress = (user as any).evmAddress;
      }

      return token
    },
    session: function ({ session, token, user }) {
      const sess = {
        ...session,
        accessToken: token.accessToken
      }
      return sess;
    },
  }
}

export default NextAuth(authOptions)