import { Client } from "minecraft-launcher-core";
import { randomUUID } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { hostname } from "os";

const launcher = new Client();
const localEnvPath = ".env.local";

function readLocalEnv() {
  if (!existsSync(localEnvPath)) {
    return {};
  }

  const entries = {};
  const content = readFileSync(localEnvPath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    entries[key] = value;
  }

  return entries;
}

function writeLocalEnv(entries) {
  const lines = Object.entries(entries).map(([key, value]) => `${key}=${value}`);
  writeFileSync(localEnvPath, `${lines.join("\n")}\n`, "utf8");
}

const localEnv = readLocalEnv();

let uuid;
if (!process.env.MC_UUID) {
  if (!localEnv.MC_UUID) {
    console.log("gerando uuid");
    uuid = randomUUID();
  } else {
    uuid = localEnv.MC_UUID;
  }
} else {
  uuid = process.env.MC_UUID;
}

let name;
if (!process.env.MC_NAME) {
  if (!localEnv.MC_NAME) {
    console.log("gerando nome");
    name = hostname();
  } else {
    name = localEnv.MC_NAME;
  }
} else {
  name = process.env.MC_NAME;
}

const version = process.env.MC_VERSION || "26.1";
const javaPath = process.env.JAVA_PATH || localEnv.JAVA_PATH;

if (localEnv.MC_UUID !== uuid || localEnv.MC_NAME !== name) {
  writeLocalEnv({
    ...localEnv,
    MC_UUID: uuid,
    MC_NAME: name,
  });
}

const opts = {
  root: "mc",
  authorization: {
    uuid,
    name,
  },
  version: {
    number: version,
    type: "release",
  },
  memory: {
    max: "2G",
    min: "2G",
  },
};

if (javaPath) {
  opts.javaPath = javaPath;
}

launcher.launch(opts);

launcher.on("debug", console.log);
launcher.on("data", console.log);
