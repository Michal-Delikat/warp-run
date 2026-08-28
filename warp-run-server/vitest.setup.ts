import { beforeEach } from "vitest";
import { sql } from "drizzle-orm";
import { db } from "./src/db/index.ts";

beforeEach(async () => {
  const tablesResult = await db.execute(sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
  `);
  
  const tables = tablesResult.map(row => row.table_name);
  
  if (tables.length > 0) {
    await db.execute(sql.raw(`
      TRUNCATE TABLE ${tables.join(", ")}
      RESTART IDENTITY CASCADE
    `));
  }
});