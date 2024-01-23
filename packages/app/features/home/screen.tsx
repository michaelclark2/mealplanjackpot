import { P, Text } from 'app/design/typography'
import { Button, SpinButton } from 'app/design/button'
import { View, ScrollView } from 'app/design/view'
import { useState } from 'react'

export function HomeScreen() {
  const [recipes, setRecipes] = useState([
    { title: 'chicken and cheese' },
    { title: 'macaroni and cheese' },
    { title: 'beef and cheese' },
    { title: 'fish and cheese' },
  ])

  const getRandomRecipes = () => {
    fetch(
      (process.env.NEXT_PUBLIC_CONVEX_SITE ??
        process.env.EXPO_PUBLIC_CONVEX_SITE) + '/getRandom',
    ).then((res) => {
      res.json().then(setRecipes)
    })
  }
  return (
    <ScrollView
      className="p-4 md:p-8"
      contentContainerStyle={{
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View className="min-h-[50%] w-full max-w-7xl rounded-3xl bg-slate-200 ">
        {recipes?.length > 0 ? (
          recipes?.map((r) => <P className="text-center">{r.title}</P>)
        ) : (
          <P className="text-center">Let's get spinning!</P>
        )}
      </View>
      <View className="w-full max-w-7xl flex-1 flex-col items-center justify-between">
        <View className="m-3 md:absolute md:self-center">
          <SpinButton className="" onPress={() => getRandomRecipes()}>
            <Text className="font-extrabold text-white">Spin</Text>
          </SpinButton>
        </View>
        <View className="min-h-32 pointer-events-none w-full flex-1 flex-row items-start justify-center space-x-3 md:m-10 md:justify-between">
          <Button
            className="pointer-events-auto relative w-24"
            onPress={() => console.log('clicky button')}
          >
            <Text className="text-center text-white">Save</Text>
          </Button>
          <Button
            className="pointer-events-auto relative w-24 bg-orange-500"
            onPress={() => console.log('clicky button')}
          >
            <Text className="text-center text-white">Settings</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
