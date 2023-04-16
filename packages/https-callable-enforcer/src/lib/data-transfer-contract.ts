import { Mixed } from 'io-ts';

export interface DataTransferContract<T1 extends Mixed, T2 extends Mixed> {
  request: T1;
  response: T2;
}
