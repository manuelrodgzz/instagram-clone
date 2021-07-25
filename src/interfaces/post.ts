import IComment from './comment';

export default interface IPost {
    picture: string
    likes: number
    date: Date
    comments: IComment[]
    description: string
    location?: string
}
