import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        // get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get all the in-memory json found in /assets/database
        const tables: IDatabaseTables = databaseServer.getTables();
    
        // Edit the start condition of TerraGroup Employee to only have a level requirement
        tables.templates.quests["5edac63b930f5454f51e128b"].conditions.AvailableForStart.splice(1,2);

        // Same but for Swift One
        tables.templates.quests["60e729cf5698ee7b05057439"].conditions.AvailableForStart.splice(0);
    
        // And finally for The Huntsman Path - Relentless
        tables.templates.quests["60e71e8ed54b755a3b53eb67"].conditions.AvailableForStart.splice(5);
    }

}


export const mod = new Mod();
