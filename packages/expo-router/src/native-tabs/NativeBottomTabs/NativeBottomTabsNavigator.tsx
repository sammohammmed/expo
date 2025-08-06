'use client';

import {
  createNavigatorFactory,
  NavigationState,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';

import { NativeBottomTabsRouter } from './NativeBottomTabsRouter';
import { NativeTabsView } from './NativeTabsView';
import { NativeTabOptions, type NativeTabsViewProps } from './types';
import { withLayoutContext } from '../..';

export interface NativeTabsNavigatorProps
  extends PropsWithChildren<Omit<NativeTabsViewProps, 'builder'>> {
  /**
   * The behavior when navigating back with the back button.
   *
   * @platform android
   */
  backBehavior?: 'none' | 'initialRoute' | 'history';
}

// In Jetpack Compose, the default back behavior is to go back to the initial route.
const defaultBackBehavior = 'initialRoute';

export function NativeTabsNavigator({
  children,
  backBehavior = defaultBackBehavior,
  ...rest
}: NativeTabsNavigatorProps) {
  const builder = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    Record<string, (...args: any) => void>,
    NativeTabOptions,
    Record<string, any>
  >(NativeBottomTabsRouter, {
    children,
    backBehavior,
  });

  return <NativeTabsView builder={builder} {...rest} />;
}

const createNativeTabNavigator = createNavigatorFactory(NativeTabsNavigator);

export const NativeTabsNavigatorWithContext = withLayoutContext<
  NativeTabOptions,
  typeof NativeTabsNavigator,
  NavigationState,
  {}
>(createNativeTabNavigator().Navigator, (screens) => {
  return screens;
});
