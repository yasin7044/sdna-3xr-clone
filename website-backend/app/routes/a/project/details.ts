// SPDX-License-Identifier: Apache-2.0
import express from 'express';
import { Project } from '@models/project';
import { studioCors } from '@cors/studio';
import ConnectEnsureLogin from 'connect-ensure-login';
const Router = express.Router();

Router.options('/', studioCors);

Router.get(
  '/:uid',
  studioCors,
  ConnectEnsureLogin.ensureLoggedIn('/a/user/unauthorized'),
  (req: express.Request, res: express.Response) => {
    Project.scope('details')
      .findOne({ where: { uid: req.params.uid } })
      .then(project => {
        res.json(project);
      })
      .catch((err: Error) => {
        res.json(err);
      });
  },
);

module.exports = Router;
