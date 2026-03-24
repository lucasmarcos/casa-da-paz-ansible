import { Client } from "minecraft-launcher-core";
import { randomUUID } from "crypto";
import { writeFileSync } from "fs";
import { hostname } from "os";

const launcher = new Client();

let uuid;
if (!process.env.MC_UUID) {
  console.log("gerando uuid");
  uuid = randomUUID();
} else {
  uuid = process.env.MC_UUID;
}

let name;
if (!process.env.MC_NAME) {
  console.log("gerando nome");
  name = hostname();
} else {
  name = process.env.MC_NAME;
}

let version;
if (!process.env.MC_VERSION) {
  console.log("usando versao padrao");
  version = "26.1";
} else {
  version = process.env.MC_VERSION;
}

writeFileSync(
  ".env",
  `MC_UUID=${uuid}\nMC_NAME=${name}\nMC_VERSION=${version}\n`,
  "utf8"
);

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

launcher.launch(opts);

launcher.on("debug", console.log);
launcher.on("data", console.log);
