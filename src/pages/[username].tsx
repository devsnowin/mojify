import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { data: profile, isLoading } =
    api.profile.getProfileByUsername.useQuery({ username });

  if (isLoading) return <Spinner tw="min-h-screen" />;
  if (!profile) return <p>404</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={profile.profileImageUrl}
        alt="user profile"
        width={58}
        height={58}
        className="rounded-full"
      />
      <span className="text-center">
        <h1 className="text-4xl font-bold">
          {profile.firstName} {profile.lastName}
        </h1>
        <span>{`@${profile.username as string}`}</span>
      </span>
    </div>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.username;

  if (typeof slug !== "string") throw new Error("no username");

  const username = slug.replace("@", "");

  await ssg.profile.getProfileByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default Profile;
