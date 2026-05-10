import type { Grammar } from '../types';

export const grammarData: Record<string, Grammar[]> = {
  'en-a1': [
    {
      id: 'en-a1-1',
      rule: 'Be 动词的基本用法',
      structure: '主语 + be动词 + 表语',
      examples: [
        { text: 'I am a student.', translation: '我是一名学生。' },
        { text: 'She is very kind.', translation: '她非常善良。' },
        { text: 'They are happy.', translation: '他们很开心。' },
      ],
      exercises: [
        {
          id: 'ex-1',
          question: '选择正确的 be 动词: ___ is a book on the table.',
          options: ['I', 'He', 'It', 'We'],
          correctAnswer: 2,
          explanation: '"It" 用于指代事物。"A book" 是单数，所以用 "is"。',
        },
        {
          id: 'ex-2',
          question: '填空: The children ___ in the park.',
          options: ['is', 'am', 'are', 'be'],
          correctAnswer: 2,
          explanation: '"Children" 是复数名词，所以 be 动词用 "are"。',
        },
        {
          id: 'ex-3',
          question: '找出正确的句子:',
          options: [
            'He am tall.',
            'She is tall.',
            'They is happy.',
            'I are a teacher.',
          ],
          correctAnswer: 1,
          explanation: '"She" 是第三人称单数，应该搭配 "is"。',
        },
      ],
    },
    {
      id: 'en-a1-2',
      rule: '一般现在时',
      structure: '主语 + 动词原形/动词s/es',
      examples: [
        { text: 'I eat breakfast every day.', translation: '我每天吃早餐。' },
        { text: 'She works in a bank.', translation: '她在银行工作。' },
        { text: 'They play football on weekends.', translation: '他们周末踢足球。' },
      ],
      exercises: [
        {
          id: 'ex-1',
          question: '选词填空: He ___ English every day. (study)',
          options: ['studys', 'studies', 'studying', 'studied'],
          correctAnswer: 1,
          explanation: '第三人称单数时，动词后加 s 或 es。',
        },
        {
          id: 'ex-2',
          question: '找出正确的句子:',
          options: [
            'She go to school.',
            'She goes to school.',
            'She going to school.',
            'She goed to school.',
          ],
          correctAnswer: 1,
          explanation: '"She" 是第三人称单数，动词 go 要变成 goes。',
        },
      ],
    },
  ],
  'ja-a1': [
    {
      id: 'ja-a1-1',
      rule: '名词肯定句和否定句',
      structure: '名词 + 肯定/名词 + じゃありません/ではないです',
      examples: [
        { text: '私は学生です。', translation: '我是学生。' },
        { text: '彼は先生ではありません。', translation: '他不是老师。' },
        { text: 'これは猫です。', translation: '这是猫。' },
      ],
      exercises: [
        {
          id: 'ex-1',
          question: '填空: 私は___ではありません。(日本)',
          options: ['日本', '日本人', '日本語', '日本の'],
          correctAnswer: 1,
          explanation: '"日本人"意思是"日本人"，用于描述身份。',
        },
      ],
    },
  ],
  'ko-a1': [
    {
      id: 'ko-a1-1',
      rule: '입니다/아닙니다 的用法',
      structure: '主语 + 입니다/아닙니다',
      examples: [
        { text: '저는 학생입니다.', translation: '我是学生。' },
        { text: '그것은 책이 아닙니다.', translation: '那不是书。' },
        { text: '여기는 학교입니다.', translation: '这里是学校。' },
      ],
      exercises: [
        {
          id: 'ex-1',
          question: '填空: 저는 ___입니다. (学生)',
          options: ['학생', '학생이', '학생은', '학생의'],
          correctAnswer: 1,
          explanation: '"학생이"是"학생"的主格形式，用于"~입니다"句型。',
        },
      ],
    },
  ],
};
