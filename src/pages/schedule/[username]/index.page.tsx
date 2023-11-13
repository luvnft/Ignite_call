import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '../../../lib/prisma'
import { Container, UserHeader } from './styles'
import { ScheduleForm } from './ScheduleForm'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}

// Carregando a pagina somente quando acessada e gerando pagina estatica
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // carregando a pagina somente quando os dados de getStaticProps tiverem carregado
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  // Retorna pagina de erro 404 se nao tiver user
  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    // Atualizando a pagina 1 vez por dia
    revalidate: 60 * 60 * 24, // 1 day
  }
}
