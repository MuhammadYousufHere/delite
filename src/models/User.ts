import { Post } from './Post'

export interface User {
  id: number
  username: string
  email: string
  password: string
  bio: string | null
  image: any | null
  posts: Post[]
  followedBy: User[]
  following: User[]
  comments: Comment[]
  demo: boolean
}
