const SESSION_EXPIRED_EVENT =
  "auth:session-expired";

export function emitSessionExpired() {
  window.dispatchEvent(
    new Event(SESSION_EXPIRED_EVENT)
  );
}

export function onSessionExpired(
  callback
) {
  window.addEventListener(
    SESSION_EXPIRED_EVENT,
    callback
  );

  return function unsubscribe() {
    window.removeEventListener(
      SESSION_EXPIRED_EVENT,
      callback
    );
  };
}