import fs from 'fs-extra';
import path from 'path';

import { ClientBuilder, ClientBuildFlavor, Platform } from './types';
import { podInstallAsync } from '../CocoaPods';
import { EXPO_DIR, EXPO_GO_IOS_DIR } from '../Constants';
import { iosAppVersionAsync } from '../ProjectVersions';
import { getAssetName, spawnAsync } from '../Utils';
import * as GitHub from '../GitHub';

export default class IosClientBuilder implements ClientBuilder {
  platform: Platform = 'ios';

  getAppPath(): string {
    return path.join(
      EXPO_GO_IOS_DIR,
      'simulator-build',
      'Build',
      'Products',
      'Release-iphonesimulator',
      'Expo Go.app'
    );
  }

  getClientUrl(appVersion: string): string {
    const assetName = getAssetName(appVersion, 'ios');
    return GitHub.getReleaseAssetUrl(appVersion, assetName);
  }

  async getAppVersionAsync(): Promise<string> {
    return await iosAppVersionAsync();
  }

  async buildAsync(flavor: ClientBuildFlavor = ClientBuildFlavor.VERSIONED) {
    await podInstallAsync(EXPO_GO_IOS_DIR, {
      stdio: 'inherit',
    });
    await spawnAsync('fastlane', ['ios', 'create_simulator_build', `flavor:${flavor}`], {
      stdio: 'inherit',
    });
  }

  async uploadBuildAsync(appVersion: string) {
    const tempAppPath = path.join(EXPO_DIR, 'temp-app.tar.gz');
    const assetName = getAssetName(appVersion, 'ios');

    try {
      await spawnAsync('tar', ['-zcvf', tempAppPath, '-C', this.getAppPath(), '.'], {
        stdio: ['ignore', 'ignore', 'inherit'],
      });

      await GitHub.uploadBuildAsync(appVersion, tempAppPath, assetName);
    } finally {
      await fs.remove(tempAppPath);
    }
  }
}
