export class DataProcessorError extends Error {
  constructor(message, code = "DATA_PROCESSOR_ERROR", details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export class FileError extends DataProcessorError {
  constructor(message, filePath, originalError = null) {
    super(message, "FILE_ERROR", { filePath, originalError: originalError?.message });
  }
}

export class ValidationError extends DataProcessorError {
  constructor(message, field, value) {
    super(message, "VALIDATION_ERROR", { field, value });
  }
}

export class TransformationError extends DataProcessorError {
  constructor(message, transformationType, payload) {
    super(message, "TRANSFORMATION_ERROR", { transformationType, payload });
  }
}
