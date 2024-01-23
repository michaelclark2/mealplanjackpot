import { Provider } from 'app/provider'
import { Tabs } from 'expo-router'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'

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
              fontSize: 32,
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
        <Tabs.Screen options={{ title: 'Plans' }} name="user/[id]" />
      </Tabs>
    </Provider>
  )
}
