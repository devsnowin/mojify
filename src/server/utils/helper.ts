import { type User } from "@clerk/nextjs/dist/api";

export const filteredUser = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
