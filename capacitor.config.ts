import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.betradating',
  appName: 'Betra',
  webDir: 'dist/betra',
  ios: { contentInset: 'always'},
  bundledWebRuntime: false
};

export default config;
