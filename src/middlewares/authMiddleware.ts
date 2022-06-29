import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { baseURL } from '../API/API';
import { apiPath, ERoutes, serverRoutes } from '../utils/constants/routes';
import { logR } from '../utils/log';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let user = null;

  if (req.headers.cookie) {
    try {
      const { data } = await axios.get(`${baseURL}/auth/user`, {
        headers: { Cookie: req.headers.cookie }
      });
      user = data;

      res.locals.user = user;
    } catch (error) {
      logR(error);
    }
  }

  if (user === null && (req.url).includes(apiPath) && req.url !== serverRoutes.THEME) {
    res.status(403).send();

    return;
  }

  if (user === null && ![ERoutes.LOGIN, ERoutes.REGISTER, ERoutes.START].includes(req.url as ERoutes)) {
    res.redirect(ERoutes.LOGIN);

    return;
  }

  if (user && [ERoutes.LOGIN, ERoutes.REGISTER].includes(req.url as ERoutes)) {
    res.redirect(ERoutes.START);

    return;
  }

  next();
};
