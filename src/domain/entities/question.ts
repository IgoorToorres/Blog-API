import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Entity } from '../../core/entities/entity'
import { Slug } from './value-objects/slug'
import { Optional } from '@/core/types/optional'

interface questionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<questionProps> {
  static create(
    props: Optional<questionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
