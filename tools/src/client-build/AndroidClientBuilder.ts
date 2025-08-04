import path from 'path';

import { ClientBuilder, ClientBuildFlavor, Platform } from './types';
import { EXPO_GO_ANDROID_DIR } from '../Constants';
import logger from '../Logger';
import { androidAppVersionAsync } from '../ProjectVersions';
import { getAssetName, spawnAsync } from '../Utils';
import * as GitHub from '../GitHub';

export default class AndroidClientBuilder implements ClientBuilder {
  platform: Platform = 'android';

  getAppPath(): string {
    return path.join(
      EXPO_GO_ANDROID_DIR,
      'app',
      'build',
      'outputs',
      'apk',
      'versioned',
      'release',
      'app-versioned-release.apk'
    );
  }

  getClientUrl(appVersion: string): string {
    const assetName = getAssetName(appVersion, 'android');
    return GitHub.getReleaseAssetUrl(appVersion, assetName);
  }

  async getAppVersionAsync(): Promise<string> {
    return androidAppVersionAsync();
  }

  async buildAsync(flavor: ClientBuildFlavor = ClientBuildFlavor.VERSIONED) {
    await spawnAsync('fastlane', ['android', 'build', 'build_type:Release', `flavor:${flavor}`], {
      stdio: 'inherit',
    });

    if (flavor === ClientBuildFlavor.VERSIONED) {
      logger.info('Uploading Crashlytics symbols');
      await spawnAsync('fastlane', ['android', 'upload_crashlytics_symbols', `flavor:${flavor}`], {
        stdio: 'inherit',
      });
    }
  }

  async uploadBuildAsync(appVersion: string) {
    const assetName = getAssetName(appVersion, 'android');
    const buildFilePath = this.getAppPath();

    await GitHub.uploadBuildAsync(appVersion, buildFilePath, assetName);
  }
}
