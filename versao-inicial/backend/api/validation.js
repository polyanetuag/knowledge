module.exports = (app) => {
  //para valores se existirem
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === "string" && !value.trim()) throw msg;
  }

  //para valores se não existirem
  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }

  //para valores iguais
  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg;
  }

  return { existsOrError, notExistsOrError, equalsOrError };
};
