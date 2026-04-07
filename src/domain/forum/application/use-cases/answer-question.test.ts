import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryQuestionsRepository } from "@/../test/repositories/in-memory-questions-repository"
import { CreateQuestionUseCase } from './create-question'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository 
let sut: AnswerQuestionUseCase

describe('Create answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an anwer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'conteudo da resposta'
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})


