const databases = require("../../configs/databases");
const { checkDatabaseConnection } = require("../../configs/databases");
const { checkDatabaseLock } = require("../../configs/databases");

const logger = require("../../configs/logger"),
  { ErrorBadRequest, ErrorNotFound } = require("../../configs/errorMethods");

async function checkMultipleApis() {
  const apiUrls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3",
    "https://jsonplaceholder.typicode.com/todos/4",
    "https://jsonplaceholder.typicode.com/todos/5",
    "https://jsonplaceholder.typicode.com/todos/6",
    "https://jsonplaceholder.typicode.com/todos/7",
    "https://jsonplaceholder.typicode.com/todos/8",
    "https://jsonplaceholder.typicode.com/todos/9",
    "https://jsonplaceholder.typicode.com/todos/10",
    "https://jsonplaceholder.typicod.com/todo/10",
  ];
  const results = await Promise.all(apiUrls.map((url) => pingApi(url)));
  return results;
}

async function pingApi(url) {
  const start = Date.now();
  try {
    const response = await fetch(url);
    const responseTime = Date.now() - start;
    return {
      status: response.ok ? "UP" : "DOWN",
      url,
      responseTime,
      statusCode: response.status,
      error: null,
    };
  } catch (error) {
    const responseTime = Date.now() - start;
    return {
      status: "DOWN",
      url,
      responseTime,
      statusCode: 422,
      error: error.message || "Unknown error occurred",
    };
  }
}

const methods = {
  processCheck() {
    return new Promise(async (resolve, reject) => {
      try {
        const resultConnect = await checkDatabaseConnection();

        const resultDatabaseLock = await checkDatabaseLock();

        const resultAPI = await checkMultipleApis();

        const finalResult = {
          ConnectionStatus: resultConnect,
          DatabaseStatus: resultDatabaseLock,
          APIStatus: resultAPI,
        };

        resolve(finalResult);
      } catch (error) {
        throw new ErrorBadRequest(error);
      }
    });
  },
};

module.exports = { ...methods };
