import { Response, NextFunction, Request } from "express";

/**
 * Deshabilita el Intercambio de Recursos Cruzados (Cross-Origin-Resource-Sharing) a las
 * ip agregadas en el arreglo declarado en la misma función.
 */
export const cors = function () {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(11111);
    const allowedOrigins = [
      "http://localhost:8080"
    ];
    const origin = <string>request.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      response.header("Access-Control-Allow-Origin", origin);
      response.header("Access-Control-Allow-Credentials", "true");
      response.header("Access-Control-Allow-Headers", "*");
    }
    next();
  };
};
