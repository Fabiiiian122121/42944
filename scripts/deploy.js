#!/usr/bin/env node
'use strict';

(function () {
  const chalk = require('chalk');
  const fs = require('fs');
  const https = require('https');
  const path = require('path');
  const request = require('request');
  const zipFolder = require('zip-folder');
  const yaml = require('js-yaml');

  const API_KEY = process.env.API_KEY || 'doremifasollasido';
  const API_KEY_PROD = process.env.API_KEY_PROD || 'doremifasollasido';

  const MARKETPLACE_API_HOST = process.env.MARKET_URL || 'localhost';
  const MARKETPLACE_API_HOST_PROD = process.env.MARKET_URL_PROD || 'localhost';

  const MARKETPLACE_API_PATH = process.env.MARKETPLACE_API_PATH || '/widget/create';
  const MARKETPLACE_API_PATH_PROD = process.env.MARKETPLACE_API_PATH_PROD || '/widget/create';

  const CWD = process.cwd();
  const DIST_DIR = 'dist';
  const DIST_PATH = path.normalize(`${CWD}/${DIST_DIR}`);
  const DIST_ZIP_FILE = 'dist.zip';
  const DIST_ZIP_PATH = path.normalize(`${CWD}/${DIST_ZIP_FILE}`);
  const MANIFEST_FILE = 'manifest.yaml';
  const DIST_MANIFEST_PATH = path.normalize(`${CWD}/${DIST_DIR}/${MANIFEST_FILE}`);

  const manifest = yaml.load(fs.readFileSync(DIST_MANIFEST_PATH, 'utf8'));

  _publish();

  function _publish() {
    try {
      if (!API_KEY) throw new Error('Missing API key, please set the API_KEY environment variable');
      if (!fs.existsSync(DIST_PATH)) throw new Error(`ENOENT: ${DIST_PATH} doesn't exist`);
      if (fs.readdirSync(DIST_PATH).length === 0) throw new Error(`${DIST_PATH} is empty`);
      if (!fs.existsSync(DIST_MANIFEST_PATH)) throw new Error(`ENOENT: ${DIST_MANIFEST_PATH} doesn't exist`);

      zipFolder(DIST_PATH, DIST_ZIP_PATH, (error) => {
        if (error) {
          console.error(chalk.bold.red(error));
          process.exit(1);
        }

        console.info(chalk.bold(`Zip file created at ${chalk.blue(DIST_ZIP_PATH)}`));

        // 1) Deploy to DEVELOP
        deployTo({
          envName: 'DEVELOP',
          host: MARKETPLACE_API_HOST,
          apiPath: MARKETPLACE_API_PATH,
          apiKey: API_KEY,
        }, (devErr, devRes) => {
          if (devErr) process.exit(1);

          console.info(chalk.bold.green('DEVELOP Success!'));

          // 2) If prodReady -> deploy to PROD
          if (manifest?.prodReady) {
            if (!API_KEY_PROD) {
              console.error(chalk.bold.red('prodReady=true but missing API_KEY_PROD'));
              process.exit(1);
            }

            return deployTo({
              envName: 'PROD',
              host: MARKETPLACE_API_HOST_PROD,
              apiPath: MARKETPLACE_API_PATH_PROD,
              apiKey: API_KEY_PROD,
            }, (prodErr, prodRes) => {
              if (prodErr) process.exit(1);

              console.info(chalk.bold.green('PROD Success!'));
              process.exit(0);
            });
          }

          // If not prodReady, finish after develop
          process.exit(0);
        });
      });
    } catch (error) {
      console.error(chalk.bold.red(error));
      process.exit(1);
    }
  }

  function deployTo({ envName, host, apiPath, apiKey }, cb) {
    // sanity: host bez protokołu
    const cleanHost = String(host || '').replace(/^https?:\/\//i, '').replace(/\/+$/, '');

    // Agent tylko od TLS; servername = SNI
    const agent = new https.Agent({
      rejectUnauthorized: false,
      servername: cleanHost,
    });

    const url = `https://${cleanHost}${apiPath}`;

    request(
      {
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/zip',
          'x-api-key': apiKey,
          'User-Agent': 'Widget uploader',
        },
        family: 4,
        agent,
        encoding: null,
        body: fs.createReadStream(DIST_ZIP_PATH),
      },
      (error, response, body) => {
        const code = response && response.statusCode;

        if (error || code !== 201) {
          if (error) {
            console.error(chalk.bold.red(`${envName} Error:`), chalk.bold.red(error));
          } else {
            console.error(chalk.bold.red(`${envName} Fail! Expected 201, got ${code}`));
          }
          _logResponse(code, body);
          return cb(new Error(`${envName} deploy failed`));
        }

        _logResponse(code, body);
        return cb(null, { code, body });
      }
    );
  }

  function _logResponse(code, body) {
    console.info(chalk.bold('Response status:'), chalk.bold.blue(code));
    console.info(chalk.bold('Response body:'));
    try {
      console.info(body?.toString?.() ?? body);
    } catch {
      console.info(body);
    }
  }
})();
