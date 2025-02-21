/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCurrentmember } from "@/features/members/api/use-current-member";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import WorkspaceHeader from "./workspace-header";
import SidebarItem from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import WorkspaceSection from "./workspace-section";
import { UseGetmembers } from "@/features/members/api/use-get-members";
import UserItem from "./user-item";
import { useCreateChannelModal } from "@/features/channels/store/use-createchannel-modal";
import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";

const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const [_open, setOpen] = useCreateChannelModal();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { data: member, isLoading: memberLoading } = useCurrentmember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLaoding } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLaoding } = UseGetmembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className=" flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className=" size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className=" flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className=" size-5  text-white" />
        <p className=" text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-col bg-[#5E2C5F] h-full ">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className=" flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>

      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Message"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={item._id === memberId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
