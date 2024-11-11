import { useProfileMemberId } from "@/features/members/api/store/use-profile-member-id";
import { useParentMessageId } from "@/features/messages/store/use-parent-message-id";

export const usePanel = () => {
  const [parentMessageId, setParentMesssageId] = useParentMessageId();
  const [profileMemberId, setProfielMemberId] = useProfileMemberId();

  const onOpenProfile = (memberId: string) => {
    setProfielMemberId(memberId);
    setParentMesssageId(null);
  };

  const onOpenMessage = (messageId: string) => {
    setParentMesssageId(messageId);
    setProfielMemberId(null);
  };

  const onClose = () => {
    setParentMesssageId(null);
    setProfielMemberId(null);
  };

  return {
    parentMessageId,
    profileMemberId,
    onOpenMessage,
    onOpenProfile,
    onClose,
  };
};
