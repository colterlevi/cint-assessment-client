import { test, expectTypeOf } from 'vitest'
import Quiz from '../components/Quiz'

test('my types work properly', () => {
    expectTypeOf(Quiz).toBeFunction()
})