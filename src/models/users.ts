import { prisma } from '../server';
import { Users } from '@prisma/client'
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

//Delete user from database
export async function deleteUser(uid: number) {
    const deletedUser = await prisma.users.delete({
        where: {
            firebase_uuid: uid
        }
    });

    return deletedUser;
}



