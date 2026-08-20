import EventEmitter from "events";

/**
 * Lightweight test client for validating asynchronous event streams and WebSockets.
 */
export class WebSocketTestHarness extends EventEmitter {
  constructor() {
    super();
    this.messages = [];
  }

  /**
   * Simulates receiving an incoming WebSocket message frame.
   */
  receiveMessage(eventData) {
    const timestamped = {
      ...eventData,
      _receivedAt: Date.now(),
    };
    this.messages.push(timestamped);
    this.emit(eventData.type || "message", timestamped);
    this.emit("*", timestamped);
  }

  /**
   * Awaits a specific event matching a predicate with timeout.
   */
  waitForEvent(eventType, predicate = () => true, timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
      // Check existing history first
      const existing = this.messages.find((m) => m.type === eventType && predicate(m));
      if (existing) return resolve(existing);

      const timer = setTimeout(() => {
        this.removeListener(eventType, onEvent);
        reject(new Error(`Timeout waiting for event '${eventType}' after ${timeoutMs}ms`));
      }, timeoutMs);

      const onEvent = (data) => {
        if (predicate(data)) {
          clearTimeout(timer);
          this.removeListener(eventType, onEvent);
          resolve(data);
        }
      };

      this.on(eventType, onEvent);
    });
  }

  clear() {
    this.messages = [];
  }
}
