export default function generateTweets(limit: number) {
  return new Array(limit).fill(0).map((_, index) => {
    const repetitions = Math.floor(Math.random() * 3) + 1;

    return {
      key: index.toString(),
      text: 'Lorem ipsum dolor amet '.repeat(repetitions),
      author: 'React Native',
      tag: 'reactnative',
    };
  });
}
