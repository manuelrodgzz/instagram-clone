import IUser from './user';

export default interface IComment {
    user: IUser,
    text: string,
    date: Date
}