import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repository/answer-repository'
import { QuestionsRepository } from '../repository/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async () => {},
}

test('create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

    const {question} = await createQuestion.execute({
        authorId: '123',
        title: "duvida se esta funcionando",
        content: "primeiro post test",
    })

    expect(question.id).toBeTruthy()
})
