import { JwtPayload } from "jsonwebtoken";

export interface Decode extends JwtPayload {
  user_id: string;
  email: string;
}

// declare module "express" {
//   interface Request {
//     user?: {
//       user_id: string;
//       email: string;
//     };
//   }
// }
