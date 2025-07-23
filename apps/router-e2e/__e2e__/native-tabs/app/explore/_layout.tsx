import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import { Appearance } from 'react-native';

Appearance.setColorScheme('dark');

export default function Layout() {
  return (
    <NativeTabs
      style={{
        tintColor: 'orange',
        blurEffect: 'systemChromeMaterial',
      }}>
      <NativeTabs.Trigger name="index">
        <Icon sf="light.beacon.max" />
        <Label>All</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="news">
        <Icon sf="newspaper.fill" />
        <Label>News</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
