export type OperationType = {
  login: (userId: string) => void
  logout: () => void
}

export type Order = 'asc' | 'desc'
