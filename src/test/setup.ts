import '@testing-library/jest-dom';

// Compatibility workaround for Node 24 + JSDOM AbortSignal mismatch with Undici Request
const OriginalRequest = globalThis.Request;

if (OriginalRequest) {
  globalThis.Request = class extends OriginalRequest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(input: any, init?: any) {
      if (init && init.signal) {
        try {
          super(input, init);
          return;
        } catch {
          const { signal: _signal, ...rest } = init;
          super(input, rest);
          return;
        }
      }
      super(input, init);
    }
  };
}
