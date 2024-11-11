import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface uUseGetmember {
  id: Id<"members">;
}

export const UseGetmember = ({ id }: uUseGetmember) => {
  const data = useQuery(api.members.getById, { id });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
