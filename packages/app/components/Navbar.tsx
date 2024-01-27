import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignInButton, SignOutButton } from '@clerk/clerk-react'

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated } = useConvexAuth()
  return (
    <nav className="mb-2 flex w-full items-center justify-between bg-orange-500 p-2 px-8 text-white shadow">
      <div>
        <h1 className="cursor-default text-lg font-bold">Meal Plan Jackpot</h1>
      </div>
      <div className="">
        <ul className="flex items-center space-x-12">
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
              href="/user/plans"
              className={
                router.pathname.startsWith('/user/') ? 'font-bold' : ''
              }
            >
              Plans
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <SignOutButton className="rounded bg-green-500 p-1.5 px-3">
                Logout
              </SignOutButton>
            ) : (
              <SignInButton className="rounded bg-green-500 p-1.5 px-3">
                Login
              </SignInButton>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
