// DATA
const userDb = [
  {
      userName: "Frank",
      email: "Frank@gmail.com",
      friends: [],
      
  },
  {
      userName: "James",
      email: "James@gmail.com",
      friends: [],
  },
  {
      userName: "Anna",
      email: "Anna@gmail.com",
      friends: [],
  },

];

const thoughtDb = [
  {
      thoughtText: "I wonder how to make pancakes?",
      userName: "Frank"
  },
  {
      thoughtText: "Is the moon made out of cheese?",
      userName: "Anna"
  },
  {
      thoughtText: "How old is my dog?",
      userName: "James"
  },
];


const reactionDb = [
  {
      reactionBody: "To be honest... idk",
      userName: "James"
  },
  {
      reactionBody: "Who knows.",
      userName: "Frank"
  },
  {
      reactionBody: "I can't answer that.",
      userName: "Anna"
  },
];



module.exports = { userDb, thoughtDb, reactionDb }
