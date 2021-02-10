import { DatabaseSingleton } from "../src/core/mongo";

const app = (async ()=>{
  await DatabaseSingleton.start();
  return require("../src/core/server");
})();

export {
  app
};