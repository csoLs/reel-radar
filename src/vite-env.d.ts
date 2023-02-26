type Environment = {
  ACCESS_TOKEN: string
}

declare global {
  const environment: Environment
}

/// <reference types="vite/client" />
