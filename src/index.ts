import { Eta as EtaCore } from "./core.ts";
import { readFile, resolvePath } from "./file-handling.ts";

export class Eta extends EtaCore {
  readFile = readFile;

  resolvePath = resolvePath;
}

export { EtaError } from "./err.ts";
export { Eta as EtaCore } from "./core.ts";
export type { Options, trimConfig } from "./config.ts";
export type { TemplateFunction } from "./compile.ts"
