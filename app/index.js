import { DatabaseSingleton } from "../src/core/mongo";

(async ()=>{
  await DatabaseSingleton.start();
  require("../src/core/server");
})();
