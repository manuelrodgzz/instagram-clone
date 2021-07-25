import IStory from './story';
import IPost from './post';

export default interface IUser {
    name: string
    user: string
    img: string
    stories?: IStory[]
    posts?: IPost[]
}