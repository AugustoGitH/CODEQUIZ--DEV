"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createRouters = ({ router, middleware, routers, }) => {
    const midCond = middleware !== null && middleware !== void 0 ? middleware : ((req, res, next) => {
        next();
    });
    routers.forEach((route) => {
        router[route.method](route.path, midCond, route.controller);
    });
};
exports.default = createRouters;
