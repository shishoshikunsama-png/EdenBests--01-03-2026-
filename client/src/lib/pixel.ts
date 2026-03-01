// Meta Pixel helper for SPA - waits for fbq to be ready before firing events

declare global {
  interface Window {
    fbq: any;
  }
}

const waitForFbq = (callback: () => void, maxRetries = 50) => {
  let retries = 0;
  const check = () => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      callback();
    } else if (retries < maxRetries) {
      retries++;
      setTimeout(check, 100);
    }
  };
  check();
};

export const trackPageView = () => {
  waitForFbq(() => {
    window.fbq('track', 'PageView');
  });
};

export const trackLead = () => {
  waitForFbq(() => {
    window.fbq('track', 'Lead');
  });
};
