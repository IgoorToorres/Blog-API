import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repository/answer-repository'

interface FetchRecentAnswersUseCaseRequest {
  page: number
  questionId: string
}
interface FetchRecentAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchRecentAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchRecentAnswersUseCaseRequest): Promise<FetchRecentAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
