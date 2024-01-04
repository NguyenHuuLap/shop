export const ApplicationError = class extends Error {
  static type = {
    APP_ERROR: "APP_ERROR",
    INTERNAL: "INTERNAL",
    NETWORK: "NETWORK",
    UNKNOWN: "UNKNOWN",
  };

  constructor(options) {
    super();
    Object.assign(options);

    if (!ApplicationError.type.hasOwnProperty(options.type)) {
      throw new Error(`ApplicationError: ${options.type} is not a valid type.`);
    }

    if (!options.message) {
      throw new Error("ApplicationError: error message required.");
    }

    if (!options.code) {
      throw new Error("ApplicationError: error code required.");
    }

    this.name = "ApplicationError";
    this.type = options.type;
    this.code = options.code;
    this.message = options.message;
    this.errors = options.errors;
    this.statusCode = options.statusCode;
  }
};

const errorFormat = (err) => {
  return {
    error: {
      type: err.type,
      detail: err.message,
      code: err.code,
      errors: err.errors,
      stack: (JSON.stringify(err, ["stack"], 4) || {}).stack,
    },
  };
};

export default {
  ApplicationError,
  errorFormat,
};
