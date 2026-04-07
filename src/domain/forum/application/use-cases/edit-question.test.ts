import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/../test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = await makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.tovalue(),
      authorId: 'author-1',
      title: 'Pergunta test',
      content: 'Conteudo teste',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta test',
      content: 'Conteudo teste',
    })
  })

  it('not should be able to edit a question from another user', async () => {
    const newQuestion = await makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.tovalue(),
        authorId: 'author-2',
        title: 'Pergunta test',
        content: 'Conteudo teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
