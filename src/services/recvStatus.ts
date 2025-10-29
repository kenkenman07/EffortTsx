import type { RealtimeChannel } from "@supabase/supabase-js";
import type { StatusPayload } from "../types/db";

/**
 * 他ユーザーのpresence変化を監視
 * event: "sync" は状態同期時に呼ばれる
 * @param channel Presenceチャンネル
 * @param onUpdate 現在の全ユーザーリストを渡すコールバック
 */
const recvStatus = (
  channel: RealtimeChannel,
  onUpdate: (list: StatusPayload[]) => void
) => {
  // 現在のstateが同期された時に発火
  channel.on("presence", { event: "sync" }, () => {
    const state = channel.presenceState<StatusPayload>();
    const all = Object.values(state).flat();
    console.log("[recvPresence] 現在のpresence:", all);
    onUpdate(all);
  });
};

export default recvStatus;
