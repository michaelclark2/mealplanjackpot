import { Provider } from 'app/provider/index.native'
import { Tabs, Link, useRouter } from 'expo-router'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { SignOutButton } from '@clerk/clerk-react'
import { Text, TextLink } from 'app/design/typography'
import { Button, Pressable } from 'app/design/button'
import { View } from 'app/design/view'

const BackButton = () => {
  return (
    <View className="p-2">
      <Link href="/" className="">
        <Icon name="arrow-back" height={24} width={24} fill={'black'} />
      </Link>
    </View>
  )
}

export default function Root() {
  return (
    <Provider>
      <Tabs
        screenOptions={{
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            backgroundColor: colors.orange['500'],
          },
          tabBarInactiveTintColor: colors.orange['100'],
          tabBarInactiveBackgroundColor: colors.orange['600'],
          tabBarActiveTintColor: colors.white,
        }}
      >
        <Tabs.Screen
          options={{
            headerTitle: 'Meal Plan Jackpot',
            headerTitleStyle: {
              fontSize: 24,
            },
            headerRight: () => {
              const router = useRouter()
              const goToSignIn = () => router.push('user/signin')
              return (
                <View className="p-2">
                  <SignedOut>
                    <Button className="p-1" onPress={goToSignIn}>
                      <Text>Login</Text>
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <SignOutButton>
                      <Text>Logout</Text>
                    </SignOutButton>
                  </SignedIn>
                </View>
              )
            },
            tabBarLabel: 'Spin',
            tabBarIcon: ({ size, color, focused }) => (
              <Icon
                name="grid-outline"
                width={size}
                height={size}
                fill={color}
              />
            ),
            headerTitleAlign: 'center',
          }}
          name="index"
        />
        <Tabs.Screen
          options={{
            title: 'Plans',
            tabBarIcon: ({ size, color, focused }) => (
              <Icon
                name="calendar-outline"
                width={size}
                height={size}
                fill={color}
              />
            ),
          }}
          name="user/[id]"
        />
        <Tabs.Screen
          name="user/signin"
          options={{
            href: null,
            title: 'Sign In',
            headerLeft: BackButton,
          }}
        />
        <Tabs.Screen
          name="user/signup"
          options={{
            href: null,
            title: 'Sign Up',
            headerLeft: BackButton,
          }}
        />
      </Tabs>
    </Provider>
  )
}
