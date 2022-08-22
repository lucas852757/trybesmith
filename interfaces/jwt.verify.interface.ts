/* source: https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data */
interface JwtVerify { 
  id?: number,
  username: string,
  classe: string,
  level: number,
  password?: string
}

export default JwtVerify;