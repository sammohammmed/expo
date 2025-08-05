import { Manifest, Route } from './types';
export declare function createRequestHandler({ getRoutesManifest, getHtml, getApiRoute, handleRouteError, }: {
    getHtml: (request: Request, route: Route) => Promise<string | Response | null>;
    getRoutesManifest: () => Promise<Manifest | null>;
    getApiRoute: (route: Route) => Promise<any>;
    handleRouteError: (error: Error) => Promise<Response>;
}): (request: Request) => Promise<Response>;
