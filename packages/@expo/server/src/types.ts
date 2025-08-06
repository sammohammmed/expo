import { ImmutableRequest } from './ImmutableRequest';

export type ExpoRouterServerManifestV1Route<TRegex = string> = {
  page: string;
  routeKeys: Record<string, string>;
  namedRegex: TRegex;
  generated?: boolean;
};

export type ExpoRouterServerManifestV1FunctionRoute = ExpoRouterServerManifestV1Route<RegExp>;

/**
 * Middleware function type that runs before route matching.
 * Can return a Response to short-circuit the request, or void/undefined to continue.
 *
 * @param request - A ShallowRequest object with read-only headers and no body access
 */
export type MiddlewareFunction = (
  request: ImmutableRequest
) => Promise<Response | void> | Response | void;
