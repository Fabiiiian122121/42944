#!/usr/bin/env node
'use strict';

(function () {
  const chalk = require('chalk');
  const fs = require('fs');
  const http = require('http');
  const path = require('path');
  const request = require('request');
  const zipFolder = require('zip-folder');

  const API_KEY = process.env.API_KEY || 'doremifasollasido';
  const MARKETPLACE_API_HOST = process.env.MARKET_URL || 'localhost';
  const MARKETPLACE_API_PATH = process.env.MARKETPLACE_API_PATH || '/widget/create';

  const CWD = process.cwd();
  const DIST_DIR = 'dist';
  const DIST_PATH = path.normalize(`${CWD}/${DIST_DIR}`);
  const DIST_ZIP_FILE = 'dist.zip';
  const DIST_ZIP_PATH = path.normalize(`${CWD}/${DIST_ZIP_FILE}`);
  const MANIFEST_FILE = 'manifest.yaml';
  const DIST_MANIFEST_PATH = path.normalize(`${CWD}/${DIST_DIR}/${MANIFEST_FILE}`);

  const agentOptions = {
    host: MARKETPLACE_API_HOST,
    port: '3000',
    path: '/',
    rejectUnauthorized: false,
  };

  const agent = new http.Agent(agentOptions);

  _publish();

  function _publish() {
    try {
      if (!API_KEY) {
        throw new Error('Missing API key, please set the MARKET_API_KEY environment variable');
      }

      if (!fs.existsSync(DIST_PATH) ) {
        throw new Error(`ENOENT: ${DIST_PATH} doesn't exist`);
      }

      if (fs.readdirSync(DIST_PATH).length === 0) {
        throw new Error(`${DIST_PATH} is empty`);
      }

      if (!fs.existsSync(DIST_MANIFEST_PATH)) {
        throw new Error(`ENOENT: ${DIST_MANIFEST_PATH} doesn't exist`);
      }

      zipFolder(DIST_PATH, DIST_ZIP_PATH, (error) => {
        if (error) {
          console.error(chalk.bold.red(error));
          process.exit(1);
        }
        console.info(chalk.bold(`Zip file created at ${chalk.blue(DIST_ZIP_PATH)}`));

        request(
          {
            url: `http://${MARKETPLACE_API_HOST}${MARKETPLACE_API_PATH}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/zip',
              'x-api-key': API_KEY,
              'User-Agent': 'Widget uploader',
            },
            family: 4,
            agent,
            encoding: null,
            body: fs.createReadStream(DIST_ZIP_PATH),
          },
          (error, response, body) => {
            const code = response && response.statusCode;

            if (error || (code !== 201)) {
              if (error) {
                console.error(chalk.bold.red('Error:'), chalk.bold.red(error));
              } else {
                console.info(chalk.bold.red('Fail!'), request.headers);
              }
              _logResponse(code, body);
              process.exit(1);
            }

            console.info(chalk.bold.green('Success!'));
            _logResponse(code, body);
          }
        );
      });
    } catch (error) {
      console.error(chalk.bold.red(error));
      process.exit(1);
    }
  }

  function _logResponse(code, body) {
    console.info(chalk.bold('Response status:'), chalk.bold.blue(code));
    console.info(chalk.bold('Response body:'));
    try {
      console.info(body.toString());
    } catch {
      console.info(body);
    }
  }
})();
