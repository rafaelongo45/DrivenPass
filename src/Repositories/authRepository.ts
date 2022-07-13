import connection from "../config/database.js";

export interface User {
  id?: number;
  email: string;
  password: string;
  createdAt?: string;
};

export async function findByEmail(email: string){
  const result = await connection.query<User>(`
    SELECT * 
    FROM users
    WHERE email = $1;
  `, [email]);

  return result.rows;
}

export async function insert(email: string, password: string){
  await connection.query(`
    INSERT INTO users(email, password)
    VALUES ($1, $2);
  `, [email, password]);
};