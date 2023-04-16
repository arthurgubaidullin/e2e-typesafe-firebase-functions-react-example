import * as t from 'io-ts';

const RequestMessage = t.readonly(
  t.exact(
    t.type({
      content: t.string,
    })
  )
);

const ResponseMessage = t.readonly(
  t.exact(
    t.type({
      result: t.string,
    })
  )
);

export const SimpleContract = Object.freeze({
  request: RequestMessage,
  response: ResponseMessage,
});
