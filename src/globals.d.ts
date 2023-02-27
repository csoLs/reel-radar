type Environment = {
  ACCESS_TOKEN: string
}

declare global {
  const environment: Environment
}

export {}
