import { AuthUserItem } from '../models/AuthUserItem'
import { LoginUserRequest } from '../requests/LoginUserRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { UsersAccess } from '../dataLayer/usersAcess'
import { RegisterUserRequest } from '../requests/RegisterUserRequest'
import { generateJWT } from '../helpers/jwtHelpper'
import { UserItem } from '../models/UserItem'

const logger = createLogger('User-Business-Logic') 
const usersAccess = new UsersAccess()

export async function login(loginUser: LoginUserRequest): Promise<AuthUserItem>{
    logger.info(`login user data ${JSON.stringify(loginUser)}`);

    const user: UserItem = await usersAccess.getUser(loginUser.email);

    if(user == null){
        throw new Error(`User ${loginUser.email} not exist`);
    }
    logger.info(`Found user ${JSON.stringify(user)}`);
    const valid = await comparePasswords(loginUser.password, user.password);
    if(!valid){
        throw new Error(`User ${loginUser.email} invalid`);
    }

    const token = generateJWT(user);
    const authUser: AuthUserItem = {
        token,
        user
    }
    return authUser;
}

export async function register(registerUser: RegisterUserRequest): Promise<AuthUserItem>{
    logger.info(`register user data ${JSON.stringify(registerUser)}`);

    const user: UserItem = await usersAccess.getUser(registerUser.email);
    if(user != null){
        throw new Error(`User ${registerUser.email} is exist`);
    }

    const token = generateJWT(user);
    const userId = uuid.v4();
    const email = registerUser.email;
    const passwordHash = await generatePassword(registerUser.password);

    const newUserItem: UserItem = {
        userId: userId,
        email: email,
        password: passwordHash,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    logger.info(`Build new user ${JSON.stringify(newUserItem)}`);
    await usersAccess.createUser(newUserItem);

    const authUser: AuthUserItem = {
        token,
        user: newUserItem
    }
    return authUser;
}


export async function generatePassword(plainTextPassword: string): Promise<string> {
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // return await bcrypt.hash(plainTextPassword, salt);
    logger.info(`xx user data ${plainTextPassword}`);

    return 'xxx';
}

export async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    logger.info(`xx user data ${plainTextPassword}, ${hash}`);
    return true;
    //return await bcrypt.compare(plainTextPassword, hash);
}