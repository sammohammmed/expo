export type ExpoRouterServerManifestV1Route<TRegex = string> = {
    page: string;
    routeKeys: Record<string, string>;
    namedRegex: TRegex;
    generated?: boolean;
};
export type ExpoRouterServerManifestV1FunctionRoute = ExpoRouterServerManifestV1Route<RegExp>;
/**
 * A wrapper around the Request object that prevents access to the body and modifications to headers.
 * This is passed to middleware functions to ensure they cannot consume the request body.
 */
export interface ShallowRequest extends Omit<Request, 'body' | 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text' | 'clone' | 'bytes'> {
    /**
     * The request body is not accessible in middleware.
     * @throws {Error} Always throws an error when accessed.
     */
    readonly body: never;
    /**
     * @throws {Error} Always throws an error when called.
     */
    arrayBuffer(): Promise<never>;
    /**
     * @throws {Error} Always throws an error when called.
     */
    blob(): Promise<never>;
    /**
     * @throws {Error} Always throws an error when called.
     */
    formData(): Promise<never>;
    /**
     * @throws {Error} Always throws an error when called.
     */
    json(): Promise<never>;
    /**
     * @throws {Error} Always throws an error when called.
     */
    text(): Promise<never>;
    /**
     * @throws {Error} Always throws an error when called.
     */
    bytes(): Promise<never>;
    /**
     * Creates a clone of the ShallowRequest.
     */
    clone(): ShallowRequest;
}
/**
 * Middleware function type that runs before route matching.
 * Can return a Response to short-circuit the request, or void/undefined to continue.
 *
 * @param request - A ShallowRequest object with read-only headers and no body access
 */
export type MiddlewareFunction = (request: ShallowRequest) => Promise<Response | void> | Response | void;
