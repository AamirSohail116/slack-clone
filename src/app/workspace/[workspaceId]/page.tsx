"use client";

import { useRouter } from "next/navigation";

import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useEffect, useMemo } from "react";
import { useCreateChannelModal } from "@/features/channels/store/use-createchannel-modal";
import { Loader, TriangleAlert } from "lucide-react";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [open, setOpnen] = useCreateChannelModal();

  const { data: workspace, isLoading: workspaceLaoding } = useGetWorkSpace({
    id: workspaceId,
  });

  const { data: channels, isLoading: channelLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (workspaceLaoding || channelLoading || !workspace) return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open) {
      setOpnen(true);
    }
  }, [
    workspaceLaoding,
    channelLoading,
    workspace,
    open,
    setOpnen,
    router,
    workspaceId,
    channelId,
  ]);

  if (workspaceLaoding || channelLoading) {
    return (
      <div className=" h-full flex-1 items-center justify-center flex-col gap-2">
        <Loader className=" size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className=" h-full flex-1 items-center justify-center flex-col gap-2">
        <TriangleAlert className=" size-6 animate-spin text-muted-foreground" />
        <span className=" text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }

  return null;
};

export default WorkspaceIdPage;
