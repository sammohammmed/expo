/**
 * Copyright © 2023 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@expo/metro-runtime';
export declare function getStaticContent(location: URL, options?: {
    mode?: 'development' | 'production';
    minify?: boolean;
    basePath?: string;
    loaderData?: Record<string, any>;
}): Promise<string>;
export { getBuildTimeServerManifestAsync, getManifest } from './getServerManifest';
//# sourceMappingURL=renderStaticContent.d.ts.map