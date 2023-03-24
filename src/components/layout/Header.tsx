import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const session = useUser();

  return (
    <header className="flex items-center justify-between p-4 md:p-8">
      <Link href="/">
        <h1 className="text-2xl font-bold">Mo .</h1>
      </Link>
      <nav className="flex items-center gap-4">
        {session.isSignedIn ? (
          <>
            <SignOutButton />
            <Link href={`/@${session.user.username as string}`}>
              <Image
                src={session.user.profileImageUrl}
                alt="user profile"
                width={42}
                height={42}
                className="rounded-full"
              />
            </Link>
          </>
        ) : (
          <SignInButton />
        )}
      </nav>
    </header>
  );
};
export default Header;
