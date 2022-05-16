// import { stat } from 'fs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import { quizListText, quizListAnswer } from '../utils/data'
import { useLocalStorage } from '../hooks/useLocalStorage'

// State
type Quiz = {
  index: number
  text: string // 문제
  answer: string // 정답
  selections: string[] // 보기 목록 (정답 포함), 2지 선다
}

type QuizResult = {
  quizIndex: number
  createdAt: Date
  answer: string // 정답
  selected: string // 선택한 답
  isCorrect: boolean // 정답여부
}

export type State = {
  isCompleted: boolean // computed
  correctCount: number // computed
  inCorrectCount: number // computed
  currentIndex: number // computed
  quizList: Quiz[]
  quizResults: QuizResult[]
}

// Action

// Select 동작방식
// 선지를 선택하면, 새로운 퀴즈결과가 생기고,
// 다음 문제로 넘어가야 한다.
type Select = {
  type: 'SELECT'
  payload: {
    quizIndex: number
    selected: string
  }
}

type Action = Select

function quizSessionReducer(state: State, action: Action) {
  // TODO
  // 선택한 선지에 따라
  // state 값이 변경되어야 함.
  // 예를 들어, 퀴즈 결과가 생성되고
  // 맞은 혹은 틀린 개수가 업데이트 되고,
  // 다음 퀴즈로 넘어가야 함.

  let newState = { ...state }

  switch (action.type) {
    case 'SELECT':
      // 정답이라면
      if (newState.quizList[state.currentIndex].answer === action.payload.selected) {
        newState = {
          ...newState,
          correctCount: newState.correctCount + 1,
          currentIndex: newState.currentIndex + 1
        }
        // 마지막 문제라면
        return newState.quizList.length !== newState.currentIndex
          ? newState
          : {
              ...newState,
              isCompleted: true
            }
      }
      // 정답이 아니라면
      newState = {
        ...newState,
        inCorrectCount: newState.inCorrectCount + 1,
        currentIndex: newState.currentIndex + 1
      }
      // 마지막 문제라면
      return newState.quizList.length !== newState.currentIndex
        ? newState
        : {
            ...newState,
            isCompleted: true
          }
    default:
      throw new Error('Unhandled action')
    // return newState
  }
}

// QuizSessionView
function QuizSessionView(state: State, _onClick: (selected: string) => void) {
  function QuizView(quiz: Quiz) {
    return (
      <QuizArticle>
        <header>⭐ {quiz.text}</header>
        {quiz.selections.map((sel, idx) => {
          return (
            <button key={sel} onClick={() => _onClick(sel)}>
              {`${idx + 1}.  ${sel}`}
            </button>
          )
        })}
      </QuizArticle>
    )
  }

  const currentQuiz = state.quizList[state.currentIndex]

  return (
    <QuizSection>
      <div>🥇 완료 여부: {state.isCompleted ? '완료' : '미완료'}</div>
      <div>😁 맞은 개수 : {state.correctCount}</div>
      <div>🤢 틀린 개수 : {state.inCorrectCount}</div>
      {state.isCompleted ? (
        <Link to='/' className='link'>
          🌈 홈으로
        </Link>
      ) : (
        QuizView(currentQuiz)
      )}
    </QuizSection>
  )
}

const QuizArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 5% auto;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  gap: 20px;
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  > button {
    width: 100%;
    padding: 5%;
    font-size: 18px;
    font-weight: 700;
    &:not(:hover) {
      background-color: #fff;
      color: #000;
      transition: all 0.1s ease;
    }
    &:hover {
      background-color: #ff8450;
      color: #fff;
      transition: all 0.1s ease;
    }
  }
`

const QuizSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  min-width: 320px;
  padding: 40px;
  margin: 5% auto;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  gap: 25px;
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  .link {
    padding: 5%;
    &:not(:hover) {
      color: #000;
      transition: all 0.1s ease;
    }
    &:hover {
      color: #ff8450;
      transition: all 0.1s ease;
    }
  }
`

// QuizSession
function QuizSession() {
  const [initalLoaded, setInitalLoaded] = useState(false)
  const [state, setState] = useState<State | null>(null)

  const initState: () => Promise<State> = async () => {
    // 임시로 1초간 타임 아웃.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO
    // initialData를 State 타입으로 변경 후 리턴한다.
    // quizList[].selections 을 만드는 조건은
    // 해당 단어의 뜻 하나와 다른 단어의 뜻 둘을 포함하여
    // 3지 선다형 뜻 찾기 문제 보기로 변환한다.
    // 아래 데이터는 예시 데이터이므로 삭제.

    const randomSelections = (selection: string) => {
      const randomArr = quizListAnswer.filter((str) => str !== selection)

      const shuffle = [selection]

      for (let i = 0; i < 2; i++) {
        shuffle.push(randomArr.splice(Math.floor(Math.random() * randomArr.length), 1)[0])
      }

      return shuffle.sort()
    }

    const quizListArr = () => {
      return quizListText.map((text, idx) => {
        return {
          index: idx,
          text: text,
          answer: quizListAnswer[idx],
          selections: randomSelections(quizListAnswer[idx])
        }
      })
    }

    const initialData: State = {
      isCompleted: false,
      correctCount: 0,
      inCorrectCount: 0,
      currentIndex: 0,
      quizList: quizListArr(),
      quizResults: []
    }

    return initialData
  }

  useEffect(() => {
    ;(async () => {
      // 초기 데이터 불러오기
      if (!initalLoaded) {
        const initalState = await initState()
        setState(initalState)
        setInitalLoaded(true)
      }
    })()
  }, [initalLoaded])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedQuizItem, setStoredQuizItem] = useLocalStorage<State[] | []>('quiz', [])

  const quizSelected = (selected: string) => {
    if (state == null) return

    const newState = quizSessionReducer(state, {
      type: 'SELECT',
      payload: {
        quizIndex: state.currentIndex,
        selected: selected
      }
    })

    setState(newState)
    setStoredQuizItem([newState])
  }

  return <div>{state ? QuizSessionView(state, quizSelected) : <Spinner />}</div>
}

export default QuizSession
