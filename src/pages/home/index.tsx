import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Uncomplicate your scheduling | Arvrtise Call"
        description="Connect your calendar and allow people to schedule appointments in their free time. "
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Uncomplicated Scheduled Scheduling
          </Heading>
          <Text size="xl">
            Connect your calendar and allow people to schedule appointments in
            their free time. No pressure.
          </Text>

          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Arvrtise Call"
          />
        </Preview>
      </Container>
    </>
  )
}
