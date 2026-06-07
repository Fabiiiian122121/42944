#!/usr/bin/env node
'use strict';

(function () {
  const chalk = require('chalk');
  const envsub = require('envsub');
  const fs = require('fs');
  const path = require('path');
  const yaml = require('js-yaml');

  const WIDGET_VERSION = process.env.CI_COMMIT_SHORT_SHA || 'local';
  const CWD = process.cwd();

  const MANIFEST_FILE = path.normalize(`${CWD}/src/manifest.yaml`);
  const ENVIRONMENT_FILE = path.normalize(`${CWD}/src/environments/environment.prod.ts`);
  const manifest = yaml.load(fs.readFileSync(MANIFEST_FILE, 'utf8'));

  if (!manifest) {
    console.error(chalk.bold.red('Missing widget manifest'));
    process.exit(1);
  }

  const widgetTagName = _generateWidgetTag(manifest.id, WIDGET_VERSION);

  _saveData({
    all: false,
    diff: false,
    envs: [
      {
        name: 'VERSION',
        value: WIDGET_VERSION
      },
      {
        name: 'HTML_TAG',
        value: widgetTagName
      },
    ],
    protect: false,
    syntax: 'default',
  });

  async function _saveData(options) {
    try {
      const manifestData = await envsub({
        templateFile: MANIFEST_FILE,
        outputFile: MANIFEST_FILE,
        options
      });

      const environmentData = await envsub({
        templateFile: ENVIRONMENT_FILE,
        outputFile: ENVIRONMENT_FILE,
        options
      });

      if (manifestData && environmentData) {
        console.info(chalk.bold(chalk`{blue ╒} Manifest has been set to: {blue ${'═'.repeat(67)}╕}`));
        console.info(manifestData.outputContents);
        console.info(chalk.bold.blue(`╘${'═'.repeat(94)}╛`));
        console.info('');
        console.info(chalk.bold(chalk`{blue ╒} Environment has been set to: {blue ${'═'.repeat(64)}╕}`));
        console.info(environmentData.outputContents);
        console.info(chalk.bold.blue(`╘${'═'.repeat(94)}╛`)
        );
      }
    } catch (error) {
      console.error(chalk.bold.red(error));
      process.exit(1);
    }
  }

  /**
   * Generates HTML tag name for web component according to the widget id and widget version.
   * @param {string} widgetId
   * @param {string} widgetVersion
   * @returns {string}
   */
  function _generateWidgetTag(widgetId, widgetVersion) {
    const validTagNameReg = /^[a-z0-9][a-z0-9\-]+[a-z0-9]$/;
    const nameAsTag = widgetId.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const versionAsTag = widgetVersion.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const tagName = versionAsTag ? `${nameAsTag}-${versionAsTag}` : nameAsTag;

    if (!validTagNameReg.test(tagName)) {
      console.error(chalk.bold(chalk`{red Generate widget tag error. Tag '}${tagName}{red ' is not valid with regex '}${validTagNameReg}{red '.}`));
      process.exit(1);
    }

    return tagName;
  };
})();

