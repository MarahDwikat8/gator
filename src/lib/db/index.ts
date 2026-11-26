import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../../config";

const config = readConfig();//جابت الرابط من ~/.gatorconfig.json 
const conn = postgres(config.dbUrl);//فتحت اتصال فعلي بالسيرفر

export const db = drizzle(conn, { schema });//لفّت الاتصال بواجهة آمنة الأنواع


/*
ليش بنمرّر { schema }؟

عشان Drizzle يعرف شكل جداولك، فيقدر يستنتج الأنواع تلقائياً. بدونه كل نتيجة بتكون
*/