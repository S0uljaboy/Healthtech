// Pilot-Safe Mode configurations for Go-To-Market

export const PilotConfig = {
  // Tenant boundaries
  maxTenantsAllowed: 3,
  
  // AI Limits
  maxAiTokensPerDay: 5000,
  
  // Observability & Verbose Mode
  verboseObservability: process.env.NODE_ENV === 'development',
  debugFlags: {
    showRealtimeStatus: true,
    forceOfflineMode: false,
    simulateHighLatency: false,
  },
  
  log: (event: string, meta?: any) => {
    if (PilotConfig.verboseObservability) {
      console.log(`[PILOT:${event}]`, meta);
    }
  }
};
