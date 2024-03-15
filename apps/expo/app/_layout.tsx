import { Provider } from 'app/provider/index.native'
import { Tabs, Link, useRouter } from 'expo-router'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { SignedOut } from '@clerk/clerk-expo'
import { Text } from 'app/design/typography'
import { Button } from 'app/design/button'
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
            headerRightContainerStyle: { paddingRight: 12 },
            headerRight: () => {
              const router = useRouter()
              const goToSignIn = () => router.push('user/signin')
              return (
                <SignedOut>
                  <View className="flex-1 justify-center">
                    <Button className="p-2" onPress={goToSignIn}>
                      <Text>Login</Text>
                    </Button>
                  </View>
                </SignedOut>
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
            headerTitleAlign: 'center',
            tabBarIcon: ({ size, color, focused }) => (
              <Icon
                name="calendar-outline"
                width={size}
                height={size}
                fill={color}
              />
            ),
          }}
          name="plans/index"
        />
        <Tabs.Screen
          options={{ href: null, title: 'Settings', headerLeft: BackButton }}
          name="settings/index"
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
        <Tabs.Screen
          name="plans/[mealPlanId]/index"
          options={{
            href: null,
            title: 'Meal Plan',
            headerLeft: BackButton,
          }}
        />
        <Tabs.Screen
          name="plans/[mealPlanId]/list"
          options={{
            href: null,
            title: 'Shopping List',
            headerLeft: BackButton,
          }}
        />
      </Tabs>
    </Provider>
  )
}
