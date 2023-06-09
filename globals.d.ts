export interface Location {
  id: number;
  position: [number, number];
  name: string;
  description: string;
  tags: string[];
}


export interface FirebaseUser {
  uid: number,
  username: string,
  user_email: string,
}