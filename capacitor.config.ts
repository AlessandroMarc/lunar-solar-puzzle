import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.lovable.lunarsolar',
  appName: 'Lunar Solar Puzzle',
  webDir: 'dist',
  server: {
    url: 'https://c3506715-7a84-4bd6-9849-51f2de13bba8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;