import { channel, subscribeToStatus } from "./subscribeToStatus";
import type { StatusPayload } from "../types/db";

/** 自分のPresence（オンライン／オフライン）を送信 */
const sendStatus = async (payload: StatusPayload) => {
  let ch = channel;
  if (!ch) ch = await subscribeToStatus();

  await ch.track(payload); // presence情報を登録
  console.log("[sendPresence] presence送信:", payload);
};

export default sendStatus;
