import { QuestionsRepository } from '../repository/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface GetQuestionBySlugRequest {
  slug: string
}
interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlug {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question,
    }
  }
}
