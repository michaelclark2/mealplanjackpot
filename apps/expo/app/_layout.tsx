import { Provider } from 'app/provider'
import { Stack } from 'expo-router'

export default function Root() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen options={{ title: 'index' }} name="index" />
        <Stack.Screen options={{ title: 'user/[id]' }} name="user/[id]" />
      </Stack>
    </Provider>
  )
}
