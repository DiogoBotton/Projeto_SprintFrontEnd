export default interface Token {
    email: string,
    unique_name: string,
    jti: number,
    role: string,
    iss: string,
    aud: string
}