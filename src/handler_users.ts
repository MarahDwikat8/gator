import { getUsers } from "./lib/db/queries/users";
import { readConfig } from "./config";



export async function handlerListUsers(cmdName :string):Promise<void>{
const allUsers = await getUsers();
const config = readConfig();
 

for (const user of allUsers)
{
    if(user.name === config.currentUserName){
        console.log(`* ${user.name} (current)`);
        continue;
    }
    console.log(`* ${user.name}`);

}}