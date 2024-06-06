import { test, expectTypeOf } from 'vitest'
import Quiz from '../components/Quiz'
import Home from '../components/Home'
import Leaderboard from '../components/Leaderboard'

test('my types work properly', () => {
    expectTypeOf(Quiz).toBeFunction()
    expectTypeOf(Home).toBeFunction()
    expectTypeOf(Leaderboard).toBeFunction()
})