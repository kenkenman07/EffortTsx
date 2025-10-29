// isSubscribed.ts
import { isSubscribed as internalCheck } from "./subscribeToStatus";

/**
 * 現在チャンネルが購読済みかどうかを返す
 */
const isSubscribed = (): boolean => {
  const status = internalCheck();
  console.log("[isSubscribed] 現在の状態:", status ? "購読中" : "未購読");
  return status;
};

export default isSubscribed;
