import { Members, Profile, Server } from "./lib/generated/prisma";

export type ServerWithMembersWithProfiles = Server & {
  member: (Members & { profile: Profile })[];
};
