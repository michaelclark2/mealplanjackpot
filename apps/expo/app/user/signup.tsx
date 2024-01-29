import { useSignUp } from '@clerk/clerk-expo'
import { Text } from 'app/design/typography'
import { Input } from 'app/design/input'
import { View } from 'app/design/view'
import { useState } from 'react'
import { Button, Pressable } from 'app/design/button'
import { useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'

export default function SignUpScreen() {
  const [isError, setErrorState] = useState<boolean>(false)
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signInPress = async () => {
    if (!isLoaded) return

    try {
      setErrorState(false)
      const completeSignUp = await signUp.create({
        emailAddress: email,
        password,
      })
      setActive({ session: completeSignUp.createdSessionId })
      router.push('/')
    } catch (err: any) {
      console.log(err)
      setErrorState(true)
    }
  }

  return (
    <View className="p-4">
      <View
        className="flex min-h-[50%] max-w-7xl rounded-3xl bg-slate-200 p-4"
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
          />
          <Text className="text-xs font-bold">Password</Text>
          <Input
            onChangeText={setPassword}
            textContentType="newPassword"
            secureTextEntry
          />
        </View>
        <View className="items-center space-y-2">
          <Button onPress={() => signInPress()}>
            <Text>Sign Up</Text>
          </Button>
          <Pressable onPress={() => router.push('user/signin')}>
            <Text>Already signed up?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
