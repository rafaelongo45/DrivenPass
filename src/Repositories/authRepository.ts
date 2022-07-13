import connection from "../config/database.js";

export interface User {
  id?: number;
  email: string;
  password: string;
  createdAt?: string;
};

export interface Session {
  id: number;
  token: string;
  userId: number;
  isValid: boolean;
  createdAt: string;
}

export async function findByEmail(email: string){
  const result = await connection.query<User>(`
    SELECT * 
    FROM users
    WHERE email = $1;
  `, [email]);

  return result.rows;
};

export async function insert(email: string, password: string){
  await connection.query(`
    INSERT INTO users(email, password)
    VALUES ($1, $2);
  `, [email, password]);
};

export async function createSession(userId: number, token: string){
  await connection.query(`
    INSERT INTO sessions("userId", token)
    VALUES($1, $2);
  `, [userId, token])
};

export async function findSessionByToken(token: string){
  const request = await connection.query<Session>(`
    SELECT *
    FROM SESSIONS 
    WHERE token = $1;
  `, [token]);

  return request.rows;
}
