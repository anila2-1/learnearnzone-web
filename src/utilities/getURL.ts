export const getClientSideURL = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || 'https://learnearnzone.com'
}

export const getServerSideURL = (): string => {
  // For server-side, use NEXT_PUBLIC_SERVER_URL or fallback
  return process.env.NEXT_PUBLIC_SERVER_URL || 'https://learnearnzone.com'
}
