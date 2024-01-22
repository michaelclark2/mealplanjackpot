import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import { useEffect, useState } from 'react'

export function HomeScreen() {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    fetch(
      (process.env.NEXT_PUBLIC_CONVEX_SITE ??
        process.env.EXPO_PUBLIC_CONVEX_SITE) + '/getRandom',
    ).then((res) => {
      res.json().then(setRecipes)
    })
  }, [])

  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to Meal Plan Jackpot.</H1>
      <View className="max-w-xl">
        {recipes?.length > 0 ? (
          recipes?.map((r) => <P className="text-center">{r.title}</P>)
        ) : (
          <P className="text-center">Let's get spinning!</P>
        )}
        <P className="text-center">
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Fernando Rojo
          </A>
          .
        </P>
        <P className="text-center">
          NativeWind is made by{' '}
          <A
            href="https://twitter.com/mark__lawlor"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Mark Lawlor
          </A>
          .
        </P>
      </View>
      <View className="h-[32px]" />
      <Row className="space-x-8">
        <TextLink href="/user/fernando">Regular Link</TextLink>
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text selectable={false} className="text-base font-bold">
            Moti Link
          </Text>
        </MotiLink>
      </Row>
    </View>
  )
}
