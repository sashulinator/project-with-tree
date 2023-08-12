export type Box<T> = { type: string; action: 'copy' | 'cut'; data: T[] }
