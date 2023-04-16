import { HttpsError } from 'firebase-functions/v1/https';
import { isLeft } from 'fp-ts/Either';
import { Mixed, TypeOf, OutputOf, Validation } from 'io-ts';
import { failure } from 'io-ts/PathReporter';
import { DataTransferContract } from './data-transfer-contract';

export const enforceHandler =
  <Contract extends DataTransferContract<Mixed, Mixed>>(contract: Contract) =>
  <Context>(
    f: (
      data: TypeOf<Contract['request']>,
      context?: Context
    ) => Promise<TypeOf<Contract['response']>>
  ) =>
  async (
    data: unknown,
    context?: Context
  ): Promise<OutputOf<Contract['response']>> => {
    const reqCodec = contract.request;
    const resCodec = contract.response;
    const eitherData: Validation<TypeOf<Contract['request']>> =
      reqCodec.decode(data);
    if (isLeft(eitherData)) {
      const details: Readonly<{ errors: string[] }> = {
        errors: failure(eitherData.left),
      };
      throw new HttpsError(
        'invalid-argument',
        'Invalid request schema.',
        details
      );
    }
    const result = await f(eitherData.right, context);
    return resCodec.encode(result);
  };
