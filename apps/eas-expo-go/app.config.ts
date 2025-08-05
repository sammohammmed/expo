import { ExpoConfig } from '@expo/config';
import assert from 'assert';

const base = {};

const mapBuildProfileToConfig: Record<string, ExpoConfig> = {
  'versioned-client-add-sdk': {
    ...base,
    slug: 'versioned-expo-go-add-sdk',
    name: 'Expo Go (versioned) + add sdk',
    extra: {
      eas: {
        projectId: '3d7abddb-e00a-4c01-a613-db3de44dd8dd',
      },
    },
  },
  'versioned-client': {
    ...base,
    slug: 'versioned-expo-go',
    name: 'Expo Go (versioned)',
    extra: {
      eas: {
        projectId: '3d7abddb-e00a-4c01-a613-db3de44dd8dd',
      },
    },
  },
  'unversioned-client': {
    ...base,
    slug: 'unversioned-expo-go',
    name: 'Expo Go (unversioned)',
    extra: {
      eas: {
        projectId: '3d7abddb-e00a-4c01-a613-db3de44dd8dd',
      },
    },
  },
  'release-client': {
    ...base,
    slug: 'release-expo-go',
    name: 'Expo Go',
    extra: {
      eas: {
        projectId: '3d7abddb-e00a-4c01-a613-db3de44dd8dd',
      },
    },
  },
  'publish-client': {
    ...base,
    slug: 'release-expo-go',
    name: 'Expo Go',
    extra: {
      eas: {
        projectId: '3d7abddb-e00a-4c01-a613-db3de44dd8dd',
      },
    },
  },
};

const buildType = process.env.EAS_BUILD_PROFILE;
assert(
  buildType && mapBuildProfileToConfig[buildType],
  'Set EAS_BUILD_PROFILE=release-client to run an eas-cli command in this directory against the release project.'
);

const config = mapBuildProfileToConfig[buildType];
export default config;
