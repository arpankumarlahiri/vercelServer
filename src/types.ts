export {};
declare global {
  namespace Express {
    interface User {
      role: 'admin' | 'user';
      id: number;
      email: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}
