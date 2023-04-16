import { HttpsCallable } from 'firebase/functions';
import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import { DataTransferContract } from './data-transfer-contract';

export const enforceCaller =
  <Contract extends DataTransferContract<t.Mixed, t.Mixed>>(
    contract: Contract
  ) =>
  (callable: HttpsCallable<unknown, unknown>) =>
  async (
    data: t.TypeOf<Contract['request']>
  ): Promise<t.TypeOf<Contract['response']>> => {
    const result = await callable(contract.request.encode(data));

    const eitherResult: t.TypeOf<Contract['response']> =
      contract.response.decode(result.data);
    if (isLeft(eitherResult)) {
      const errors: string[] = failure(eitherResult.left);
      throw new SchemaTypeError(errors);
    }

    return eitherResult.right;
  };

export class SchemaTypeError extends TypeError {
  constructor(public readonly errors: string[]) {
    super('Invalid schema.');
  }
}
