import { Members, Profile, Server } from "./lib/generated/prisma";

type Member = Members;

export type ServerWithMembersWithProfiles = Server & {
  member: (Member & { profile: Profile })[];
};
