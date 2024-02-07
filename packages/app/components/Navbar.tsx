import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignInButton, SignOutButton, SignedIn } from '@clerk/clerk-react'
import { Text } from 'app/design/typography'
import { styled } from 'nativewind'

const StyledSignOutButton = styled(SignOutButton)
const StyledSignInButton = styled(SignInButton)

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated } = useConvexAuth()
  return (
    <nav className="mb-2 flex w-full items-center justify-between bg-orange-500 p-2 px-4 text-white shadow sm:px-8">
      <div>
        <h1 className="cursor-default text-lg font-bold">Meal Plan Jackpot</h1>
      </div>
      <div className="">
        <ul className="flex items-center space-x-6 sm:space-x-12">
          <SignedIn>
            <li>
              <Link
                href="/"
                className={router.pathname == '/' ? 'font-bold' : ''}
              >
                Spin
              </Link>
            </li>
            <li>
              <Link
                href="/plans"
                className={
                  router.pathname.startsWith('/plans') ? 'font-bold' : ''
                }
              >
                Plans
              </Link>
            </li>
          </SignedIn>
          <li>
            {isAuthenticated ? (
              <StyledSignOutButton className="cursor-pointer rounded bg-green-500 p-1.5 px-3">
                <Text className="text-white">Logout</Text>
              </StyledSignOutButton>
            ) : (
              <StyledSignInButton className="cursor-pointer rounded bg-green-500 p-1.5 px-3">
                <Text className="text-white">Login</Text>
              </StyledSignInButton>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
