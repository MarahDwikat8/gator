export type CommandHandler =(
    cmdName :string ,
    ...args :string[]
)=>Promise<void> ;// نوع الكوماند 

export type CommandsRegistry = Record<string , CommandHandler>;
/*
قاموس: مفتاحه اسم الأمر، وقيمته الدالة 🔗

ts
{
  login: handlerLogin,
  register: handlerRegister,
  ...
}
*/


export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
):void{
 registry[cmdName]=handler;

}

export async function runCommand(
    registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
):Promise<void>{
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`Unknown command: ${cmdName}`);
  }
  await handler(cmdName, ...args);
}