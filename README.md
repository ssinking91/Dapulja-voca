<br />

### ✨ [인사이터] 프론트엔드 엔지니어 과제 - 신항민

---

<br />

### 💫  프로젝트 소개

- React를 활용해 간단한 단어장 어플리케이션을 구현합니다. 소스코드 내에 주석처리된 TODO를 완료해 어플리케이션을 완성합니다.

<br />

### 🛠 주요기능

1. 단어 목록을 볼 수 있습니다.
2. 목록에 있는 단어를 활용해 3지 선다형 뜻 찾기 문제를 풀 수 있습니다.

<br />

### 👀  요구사항

1. 퀴즈 결과 보기 및 저장 기능 추가
2. 사용성 좋은 UI/UX
3. 재사용 가능한 코드 설계
4. 목적이 명료하게 드러나는 commit 단위 및 메세지

<br />

### 🔨  실행방법 - 1

1. 📝 단어 목록 보기 탭에 가서 공부합니다.
2. 💡 퀴즈 보기 탭에 들어가 퀴즈를 푼 후 결과를 확인합니다.

   <br />

### 🔧  실행방법 - 2

```jsx
cd dapulja-voca

npm install

npm start
```

<br />

👨🏻‍💻 &nbsp; 하고싶었던 기능

- **Math.random()**

```javaScript
const initialData: State = {
  isCompleted: false,
  correctCount: 0,
  inCorrectCount: 0,
  currentIndex: 0,
  quizList: quizListArr(),
  quizResults: []
};
```

> **_quizList_** 부분은 중복이 되는 부분이 많아 새로운 배열을 반환하는 함수로 만들고 싶었다.

<br/>

- ./utils/data.ts

```javaScript
const quizListText: string[] = [
  'apple',
  'brick',
  'completion',
  'obstacle',
  'horn',
  'dough',
  'leap',
  'pearl',
  'tourism',
  'persisent'
]
const quizListAnswer: string[] = [
  'n. 사과',
  'n. 벽돌',
  'n. 완성, 성취',
  'n. 장애물',
  'n. 뿔, 경적',
  'n. 밀가루 반죽',
  'v. 뛰다, 급증하다.',
  'n. 진주, 진주색',
  'n. 관광, 관광 사업',
  'a. 지속적인, 끈질긴'
]
export { quizListText, quizListAnswer }
```

> quizList와 관련된 데이터를 따로 utils에 빼놓았다.

 <br />

```javaScript
const quizListArr = () => {
  return quizListText.map((text, idx) => {
    return {
      index: 0,
      text: text,
      answer: quizListAnswer[idx],
      selections: randomSelections(quizListAnswer[idx])
    }
  })
};
```

> 그리고 map함수를 사용하여 객체배열이 반환 되도록 만들었다. 하지만 selections를 랜덤하게 나오도록 하고 싶어 randomSelections() 함수를 만들었다.

 <br />

```javaScript
const randomSelections = (selection: string) => {
  const randomArr = quizListAnswer.filter((str) => str !== selection)

  const shuffle = [selection]

  for (let i = 0; i < 2; i++) {
    shuffle.push(randomArr.splice(Math.floor(Math.random() * randomArr.length), 1)[0])
  }

  return shuffle.sort()
}
```

> selection: string를 함수의 인수로 받아 filter 함수로 새로운 배열로 반환 후, 반환된 배열을 기준으로 splice() 사용하여 랜덤 배열(shuffle)을 만들었다.
>
> 생각한 대로 잘되서 기분이 좋다.😁

 <br />
