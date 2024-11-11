import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface uUseGetmembers {
  workspaceId: Id<"workspaces">;
}

export const UseGetmembers = ({ workspaceId }: uUseGetmembers) => {
  const data = useQuery(api.members.get, { workspaceId });

  const isLoading = data === undefined;

  return {
    data,
    isLoading,
  };
};
