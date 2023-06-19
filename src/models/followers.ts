import {prisma} from "../server";

//Get all followers from user
export async function getFollowers(firebase_uuid : string) {
    const user = await prisma.users.findUnique({
        where: {
          firebase_uuid: firebase_uuid,
        },
        include: {
          followers: {
            include: {
              follower: true,
            },
          },
        },
      });

      if (!user) {
        return [];
      }
    
      // Extract usernames of followers
      const followerUsernames = user?.followers.map(followerRelation => followerRelation.follower.username);
    
      return followerUsernames;
    }
  


//Get all following from user
export async function getFollowing(firebase_uuid : string) {
    const user = await prisma.users.findUnique({
        where: {
          firebase_uuid: firebase_uuid,
        },
        include: {
          following: {
            include: {
              following: true,
            },
          },
        },
      });

      if (!user) {
        return [];
      }
    
      // Extract usernames of people user is following
      const followingUsernames = user?.following.map(followingRelation => followingRelation.following.username);
    
      return followingUsernames;
    }
  

//Check if user is following another user
export async function checkIfUserIsFollowing(userID: string, followerID: string) {
    const following = await prisma.followers.findMany({
        where: {
            follower_id: userID,
            following_id: followerID,
        },
        });
    return following;
}

// Get follower number from username
export async function getFollowerNumber(username: string) {
    const user = await prisma.users.findUnique({
        where: {
            username: username,
        },
        include: {
            followers: true,
        },
        });
    return user?.followers.length;
}

// Get following number from username
export async function getFollowingNumber(username: string) {
    const user = await prisma.users.findUnique({
        where: {
            username: username,
        },
        include: {
            following: true,
        },
        });
    return user?.following.length;
}

//Add follower
export async function addFollower(userID: string, followerID: string) {
    const newFollower = await prisma.followers.create({
      data: {
        follower_id: userID,
        following_id: followerID,
      },
    });
    return newFollower;
  }

//Delete follower
export async function deleteFollower(userID: string, followerID: string) {
    const deletedFollower = await prisma.followers.deleteMany({
      where: {
        follower_id: userID,
        following_id: followerID,
      },
    });
    return deletedFollower;
  }