import { Post } from './Post'

export interface Comment {
  id: string
  createdAt: Date
  updatedAt: Date
  body: string
  post?: Post
}
