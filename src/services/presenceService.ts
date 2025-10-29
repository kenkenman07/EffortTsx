// services/presenceService.ts
import { supabase } from "./makeSupabase"
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { PresencePayload } from "../types/realtime"

// Presenceのチャンネルを作成して購読
export const subscribePresence = (userId: string, username: string, 
  onSync: (state: Record<string, PresencePayload[]>) => void): RealtimeChannel => {
  // presence:online-status というチャンネルを作る
  const channel = supabase.channel("presence:online-status", {
    config: { presence: { key: userId } },
  })

  // 同期イベント: 全員の最新状態が届くたびに呼ばれる
  channel.on("presence", { event: "sync" }, () => {
    const state = channel.presenceState() as Record<string, PresencePayload[]>
    onSync(state)
  })

  // チャンネル購読開始
  channel.subscribe(async (status) => {
    if (status !== "SUBSCRIBED") return
    console.log('SUBSCRIBED: OK')
    // 自分のpresenceをトラック（オンライン通知）
    const OK = await channel.track({ userId: userId, username } satisfies PresencePayload )
    console.log('track結果:', OK)
  })

  return channel
}

// 離脱（オフライン通知）
export const unsubscribePresence = async (channel: RealtimeChannel) => {
  try {
    await channel.untrack()
    await channel.unsubscribe()
  } catch (err) {
    console.error("unsubscribe error:", err)
  }
}
