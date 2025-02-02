import { Token } from 'services/observables/tokens';

export const shortenString = (
  string: string,
  separator = '...',
  toLength = 13
): string => {
  const startEndLength = Math.floor((toLength - separator.length) / 2);
  const start = string.substring(0, startEndLength);
  const end = string.substring(string.length - startEndLength, string.length);
  return start + separator + end;
};

export const classNameGenerator = (object: {
  [key: string]: unknown;
}): string => {
  return Object.entries(object)
    .filter(([k, v]) => k && v)
    .map((x) => x[0])
    .join(' ');
};

export const sanitizeNumberInput = (
  input: string,
  precision?: number
): string => {
  const sanitized = input
    .replace(/,/, '.')
    .replace(/[^\d.]/g, '')
    .replace(/\./, 'x')
    .replace(/\./g, '')
    .replace(/x/, '.');
  if (!precision) return sanitized;
  const [integer, decimals] = sanitized.split('.');
  if (decimals) return `${integer}.${decimals.substring(0, precision)}`;
  else return sanitized;
};

export const findOrThrow = <T>(
  arr: readonly T[],
  iteratee: (obj: T, index: number, arr: readonly T[]) => unknown,
  message?: string
) => {
  const res = arr.find(iteratee);
  if (!res)
    throw new Error(message || 'Failed to find object in find or throw');
  return res;
};

export const updateArray = <T>(
  arr: T[],
  conditioner: (element: T) => boolean,
  updater: (element: T) => T
) => arr.map((element) => (conditioner(element) ? updater(element) : element));

export const mapIgnoreThrown = async <T, V>(
  input: readonly T[],
  iteratee: (value: T, index: number) => Promise<V>
): Promise<V[]> => {
  const IGNORE_TOKEN = 'IGNORE_TOKEN';
  const res = await Promise.all(
    input.map((val, index) => iteratee(val, index).catch(() => IGNORE_TOKEN))
  );
  return res.filter((res) => res !== IGNORE_TOKEN) as V[];
};

export const splitArrayByVal = <T>(
  arr: T[],
  predicate: (value: T) => boolean
) => {
  return arr.reduce<[T[], T[]]>(
    (result, element) => {
      const res: T[] = result[predicate(element) ? 0 : 1];
      res.push(element);
      return result;
    },
    [[], []]
  );
};

export const wait = async (ms: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const get7DaysAgo = () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

export const sortTokenBalanceAlphabetic = (a: Token, b: Token) => {
  if (a.balance && b.balance && b.balance !== '0' && a.balance !== '0')
    return Number(b.balance) - Number(a.balance);

  if (
    (a.balance && a.balance !== '0') ||
    a.symbol < b.symbol ||
    a.name < b.name
  )
    return -1;

  if (
    (b.balance && b.balance !== '0') ||
    a.symbol > b.symbol ||
    a.name > b.name
  )
    return 1;

  return 0;
};
