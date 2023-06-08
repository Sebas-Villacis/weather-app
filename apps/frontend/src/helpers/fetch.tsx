import { fetchDataType } from '../types';

const ABORT_REQUEST_CONTROLLERS = new Map();

export const fetchData = async (
  url: string,
  { signalKey, ...rest }: { signalKey?: string; rest?: [] | object } = {},
): Promise<fetchDataType> => {
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
  } catch (error: unknown) {
    console.log('There was an error', error);
    return { data: [], isAborted: false };
  }
};

export function abortRequestSafe(key: string, reason = 'CANCELLED') {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason);
}

function abortAndGetSignalSafe(key: string) {
  abortRequestSafe(key); // abort previous request, if any
  const newController = new AbortController();
  ABORT_REQUEST_CONTROLLERS.set(key, newController);
  return newController.signal;
}
