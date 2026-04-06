import { Entity } from '../../core/entities/entity'
import { Slug } from './value-objects/slug'

interface questionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<questionProps> {}
