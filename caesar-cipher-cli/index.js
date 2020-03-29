const {
  getInputStream,
  getOutputStream,
  getTransformStream
} = require('./validate');

getInputStream
  .then(
    rs =>
      getOutputStream.then(
        ws =>
          getTransformStream.then(
            ts => rs.pipe(ts).pipe(ws),
            transformError => {
              throw transformError;
            }
          ),
        outputError => {
          throw outputError;
        }
      ),
    inputError => {
      throw inputError;
    }
  )
  .catch(error => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
