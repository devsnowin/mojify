import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const session = useUser();

  return (
    <header className="flex items-center justify-between p-8">
      <h1 className="text-2xl font-bold">Mo .</h1>
      <nav className="flex items-center gap-4">
        {session.isSignedIn ? (
          <>
            <SignOutButton />
            <Image
              src={session.user.profileImageUrl}
              alt="user profile"
              width={42}
              height={42}
              className="rounded-full"
            />
          </>
        ) : (
          <SignInButton />
        )}
      </nav>
    </header>
  );
};
export default Header;
