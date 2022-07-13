import connection from "../config/database.js";

export interface Credential {
  id?: number;
  userId?: number;
  title: string;
  url: string;
  username: string;
  password: string;
  createdAt?: string;
};

export async function insert(data:Credential){
  const { userId, title, url, username, password } = data;
  await connection.query(`
    INSERT INTO credentials("userId", title, url, username, password)
    VALUES($1, $2, $3, $4, $5);
  `, [userId, title, url, username, password]);
};

export async function getByUserIdAndTitle(userId: number, title: string){
  const credential = await connection.query<Credential>(`
    SELECT *
    FROM credentials
    WHERE "userId" = $1 AND title = $2;
  `, [userId, title]);

  return credential.rows;
}