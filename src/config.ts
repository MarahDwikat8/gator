import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName?: string;
};
function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

export function readConfig(): Config {
  const fullPath = getConfigFilePath();
  const data = fs.readFileSync(fullPath, { encoding: "utf-8" });
  const rawConfig = JSON.parse(data);
  return validateConfig(rawConfig);
}
function writeConfig(cfg: Config): void {
  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig, null, 2), {
    encoding: "utf-8",
  });
}

function validateConfig(rawConfig: any): Config {
  if (typeof rawConfig !== "object" || rawConfig === null) {
    throw new Error("config file must contain a JSON object");
  }
  if (typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is missing or not a string in the config file");
  }
  if (
    rawConfig.current_user_name !== undefined &&
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name must be a string");
  }

  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };
}

export function setUser(userName: string): void {
  const cfg = readConfig();
  cfg.currentUserName = userName;
  writeConfig(cfg);
}