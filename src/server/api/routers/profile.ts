import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { filteredUser } from "~/server/utils/helper";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getProfileByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });

      return filteredUser(user);
    }),
});
