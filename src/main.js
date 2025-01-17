import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { LinterConfirmation } from "./constants.js";
import { writeLintFile } from "./writeLintFile.js";
import { writePackageFile } from "./writePackageFile.js";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options, templateBundler) {
  console.log("options.linter", options.linter);

  if (options.linter !== LinterConfirmation.No) {
    await writeLintFile(options);
  }
  await writePackageFile(options, templateBundler);

  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

export async function createAwesomePackage(options) {
  const refinedOptions = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  };
  const currentFilePath = import.meta.url;
  const pathname = new URL(currentFilePath).pathname;

  console.log("Bootstrapping package for", options.template);

  const templateBundler = `${options.template}${options.bundler}`;

  const templateDir = path.resolve(
    pathname,
    `../../templates/${templateBundler}`
  );

  console.log("Using template Directory :", templateDir);

  refinedOptions.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error("%s Invalid template path", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  await copyTemplateFiles(refinedOptions, templateBundler);

  console.log("Now you can write code for your awesome package! 🚀");
  console.log("RUN ---");
  console.log("npm i");
  console.log("To Build the package RUN - npm run build");
}
