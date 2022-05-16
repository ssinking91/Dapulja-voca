import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import axios from 'axios'

interface Word {
  text: string
  meaning: string
}

function WordView(word: Word) {
  return (
    <WordViewItem key={word.text}>
      {word.text} / {word.meaning}
    </WordViewItem>
  )
}

const WordViewItem = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 3.5% 0;
  border-radius: 5px;
  background-color: #fff;
  font-size: 18px;
  font-weight: 700;
  &:not(:hover) {
    background-color: #fff;
    color: #000;
    transition: all 0.05s ease;
  }
  &:hover {
    background-color: #ff8450;
    color: #fff;
    transition: all 0.05s ease;
  }
`

function WordList() {
  // TODO
  // 훅을 이용해서, 화면이 로드되면 아래 주소에서 단어를 들고와서 화면에 표시
  // 아래 샘플 단어를 대체해야 함.
  // https://solution-tmp.s3.ap-northeast-2.amazonaws.com/vocabs.json
  // warning!
  // 만약 어떠한 이유로 작동이 되지 않는다면, 그 문제를 우회해서
  // 전체 기능이 동작하도록 코드를 구현.

  const wordlist: Word[] = [
    { text: 'apple', meaning: 'n. 사과' },
    { text: 'brick', meaning: 'n. 벽돌' },
    { text: 'leap', meaning: 'v. 뛰다, 급증하다' }
  ]

  const [ProdData, setProdData] = useState<Word[]>(wordlist)
  const [isLoading, setIsLoading] = useState(false)

  const fetchProdData = async () => {
    setIsLoading(true)
    try {
      const { data, status, statusText } = await axios.get(`/vocabs.json`)

      if (status >= 400) {
        alert(`잘못된 요청입니다.🤢 statusText: ${statusText}`)
      } else if (status >= 500) {
        alert(`서버 에러입니다.🤢 statusText: ${statusText}`)
      }

      setProdData(data)
      setIsLoading(false)
    } catch (e: any) {
      alert(`에러가 발생했습니다.🤢 잠시후 다시 실행해 주세요. `)
      console.error(e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProdData()
  }, [])

  return (
    <>
      <WordSection>{isLoading ? <Spinner /> : ProdData.map((word) => WordView(word))}</WordSection>
    </>
  )
}

const WordSection = styled.section`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5% auto;
  gap: 10px;
`

export default WordList
