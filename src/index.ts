import {
  registerCommand,
  runCommand,
  type CommandsRegistry,
} from "./commands";
import { handlerAddFeed } from "./handler_addfeed";
import { handlerAgg } from "./handler_agg";
import { handlerListFeeds } from "./handler_feeds";
import { handlerLogin } from "./handler_login";
import { handlerRegister } from "./handler_register";
import { handlerReset } from "./handler_reset";
import { handlerListUsers } from "./handler_users";

async function main() {                 // ← async
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry,"users", handlerListUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", handlerAddFeed);
  registerCommand(registry, "feeds", handlerListFeeds);

  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("usage: cli <command> [args...]");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  try {
    await runCommand(registry, cmdName, ...cmdArgs);   // ← await
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }

  process.exit(0);        //عشان يطلع  ← جديد ومهم جداً!
}

main();