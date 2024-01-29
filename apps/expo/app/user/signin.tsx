import { useSignIn } from '@clerk/clerk-expo'
import { Text } from 'app/design/typography'
import { Input } from 'app/design/input'
import { View } from 'app/design/view'
import { useState } from 'react'
import { Button, Pressable } from 'app/design/button'
import { useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'

export default function SignInScreen() {
  const [isError, setErrorState] = useState<boolean>(false)
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signInPress = async () => {
    if (!isLoaded) return

    try {
      setErrorState(false)
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      })
      await setActive({ session: completeSignIn.createdSessionId })
      router.push('/')
    } catch (err: any) {
      console.log(err)
      setErrorState(true)
    }
  }

  return (
    <View className="min-h-[50vh] flex-1 p-4">
      <View
        className=" flex-1 rounded-3xl bg-slate-200 p-4"
        style={
          isError ? { borderColor: colors['red']['500'], borderWidth: 2 } : {}
        }
      >
        {isError ? (
          <View className="items-center">
            <Text className="text-red-500">Oops! That didn't work</Text>
          </View>
        ) : (
          <View>
            <Text></Text>
          </View>
        )}
        <View className="flex-1 justify-center space-y-2 bg-slate-200">
          <Text className="text-xs font-bold">Email</Text>
          <Input
            onChangeText={setEmail}
            textContentType="emailAddress"
            value={email}
            className="w-full"
          />
          <Text className="text-xs font-bold">Password</Text>
          <Input
            onChangeText={setPassword}
            textContentType="password"
            secureTextEntry
          />
        </View>
        <View className="flex-1" />
        <View className="items-center space-y-2">
          <Button onPress={() => signInPress()}>
            <Text>Sign In</Text>
          </Button>
          <Pressable onPress={() => router.push('user/signup')}>
            <Text>Need an account?</Text>
          </Pressable>
        </View>
        <View className="flex-1" />
      </View>
    </View>
  )
}
