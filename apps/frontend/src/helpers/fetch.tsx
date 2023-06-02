const ABORT_REQUEST_CONTROLLERS = new Map();

export const fetchData = async (
  url: string,
  { signalKey, ...rest }: { signalKey?: string; rest?: [] | object } = {},
) => {
  try {
    const response = await fetch(url, {
      ...(signalKey && { signal: abortAndGetSignalSafe(signalKey) }),
      ...rest,
    });
    if (response.status === 499) {
      return { data: [], isAborted: true }; //aborted
    }
    const json = await response.json();
    return { data: json, isAborted: false };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return new Response(JSON.stringify({}), {
        status: 499, // Client Closed Request
        statusText: error.message || 'Client Closed Request',
      });
    }
    return new Response(JSON.stringify({}), {
      status: 599, // Network Connect Timeout Error
      statusText: error.message || 'Network Connect Timeout Error',
    });
  }
};

export function abortRequestSafe(key: any, reason = 'CANCELLED') {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason);
}

function abortAndGetSignalSafe(key: any) {
  abortRequestSafe(key); // abort previous request, if any
  const newController = new AbortController();
  ABORT_REQUEST_CONTROLLERS.set(key, newController);
  return newController.signal;
}
