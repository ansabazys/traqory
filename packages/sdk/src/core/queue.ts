// import type { EventPayload } from '../types';
// import { sendEvent } from './transport';

// interface QueueItem {
//   payload: EventPayload;
//   attempts: number;
// }

// class EventQueue {
//   private queue: QueueItem[] = [];

//   private flushing = false;

//   private readonly MAX_RETRIES = 3;

//   add(payload: EventPayload): void {
//     this.queue.push({
//       payload,
//       attempts: 0,
//     });

//     void this.flush();
//   }

//   private async flush(): Promise<void> {
//     if (this.flushing) {
//       return;
//     }

//     this.flushing = true;

//     try {
//       while (this.queue.length > 0) {
//         const item = this.queue[0];

//         try {
//           await sendEvent(item.payload);

//           this.queue.shift();
//         } catch {
//           item.attempts++;

//           if (item.attempts >= this.MAX_RETRIES) {
//             this.queue.shift();
//           } else {
//             await this.delay(Math.pow(2, item.attempts) * 1000);
//           }
//         }
//       }
//     } finally {
//       this.flushing = false;
//     }
//   }

//   private delay(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
// }

// export const eventQueue = new EventQueue();
