import { prisma } from "../server";
import { FirebaseUser } from "../../globals";

//Add new firebase signup to database
export async function addNewUser(user: FirebaseUser) {
  const newUser = await prisma.users.create({
    data: {
      firebase_uuid: user.uid,
      username: user.username,
      user_email: user.user_email,
    },
  });

  return newUser;
}

// Get user by firebase uid
export async function getUserByFirebaseUUID(uid: string) {
  const user = await prisma.users.findUnique({
    where: {
      firebase_uuid: uid,
    },
  });
  return user;
}

export async function getUserByFirebaseUUIDNoEmail(uid: string) {
  const user = await prisma.users.findUnique({
    where: {
      firebase_uuid: uid,
    },
    select: {
      username: true,
      user_img: true,
    },
  });
  return user;
}

// Get user by username
export async function getUserByUsername(username: string) {
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      user_img: true,
    },
  });
  return user;
}

//Change username of user
export async function changeUsername(uid: string, newUsername: string) {
  // Check if the new username already exists
  const existingUser = await prisma.users.findFirst({
    where: {
      username: newUsername,
    },
  });

  if (existingUser) {
    throw new Error('Username already exists');
  }


// Update the username if it doesn't exist already
  const updatedUser = await prisma.users.update({
    where: {
      firebase_uuid: uid,
    },
    data: {
      username: newUsername,
    },
  });
  return updatedUser;
}

// Update the user profile image
export async function changeUserImage(uid: string, newImage: string) {
  console.log(uid, newImage)
  const updatedUser = await prisma.users.update({
    where: {
      firebase_uuid: uid,
    },
    data: {
      user_img: newImage,
    },
  });
  return updatedUser;
}

//Delete user from database
export async function deleteUser(uid: string) {
  const deletedUser = await prisma.users.delete({
    where: {
      firebase_uuid: uid,
    },
  });

  return deletedUser;
}
