import { Client } from "minecraft-launcher-core";
import { writeFileSync } from "fs";
import { hostname } from "os";

const launcher = new Client();

let uuid;
if (!process.env.MC_UUID) {
  console.log("gerando uuid");
  uuid = crypto.randomUUID();
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

writeFileSync(
  ".env",
  `MC_UUID=${uuid}\nMC_NAME=${name}\n`,
  "utf8"
);

const opts = {
  root: "mc",
  authorization: {
    uuid,
    name,
  },
  version: {
    number: "1.21.10",
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
