/**
 * Lightweight JSON schema validation helper.
 */
export function validateSchema(data, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    const isOptional = key.endsWith("?");
    const fieldName = isOptional ? key.slice(0, -1) : key;
    const value = data[fieldName];

    if (value === undefined || value === null) {
      if (!isOptional) {
        errors.push(`Missing required field: '${fieldName}'`);
      }
      continue;
    }

    const actualType = Array.isArray(value) ? "array" : typeof value;
    if (actualType !== expectedType) {
      errors.push(`Field '${fieldName}' expected type '${expectedType}', got '${actualType}'`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
