import { prisma } from '../server';
import { users } from '@prisma/client'
import { FirebaseUser } from '../../globals';

//Add new firebase signup to database
export async function addNewUser (user: FirebaseUser) {
    const newUser = await prisma.users.create({
        data: {
            firebase_uuid: user.uid,
            username: user.username,
            user_email: user.user_email,
        }
    });

    return newUser;
};

export async function getUserByFirebaseUUID (uid: string) {
    const user = await prisma.users.findUnique({
        where: {
            firebase_uuid: uid
        }
    });
    return user
};

//Delete user from database
export async function deleteUser(uid: string) {
    const deletedUser = await prisma.users.delete({
        where: {
            firebase_uuid: uid
        }
    });

    return deletedUser;
}



