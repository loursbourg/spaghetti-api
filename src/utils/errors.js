const serializeErrors = errors => {
  const messageBag = {};
  errors.forEach(error => {
    const hasError = Object.prototype.hasOwnProperty.call(messageBag, error.path.join('_'));
    if (!hasError) {
      messageBag[error.path.join('_')] = {
        type: error.type,
        message: error.path.join('_'),
      };
    }
  });
  return messageBag;
};

module.exports = {
  serializeErrors,
};
