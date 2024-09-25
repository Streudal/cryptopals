export type ChallengeSetList = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  challenges: ChallegeList[];
}

export type ChallegeList = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  points: number;
}

/**
 * Challenge set list for challenges list screen and side menu for challenges list within the set.
 */
export const challengeSets: ChallengeSetList[] = [
  {
    id: 1,
    title: "Set 1",
    subTitle: "Basics",
    description: "",
    challenges: [
      {
        id: 1,
        title: "Challenge 1",
        subTitle: "Convert hex to base64",
        description: "",
        points: 1
      },
      {
        id: 2,
        title: "Challenge 2",
        subTitle: "Fixed XOR",
        description: "",
        points: 1
      },
      {
        id: 3,
        title: "Challenge 3",
        subTitle: "Single-byte XOR cipher",
        description: "",
        points: 1
      },
      {
        id: 4,
        title: "Challenge 4",
        subTitle: "Detect single-character XOR",
        description: "",
        points: 1
      },
      {
        id: 5,
        title: "Challenge 5",
        subTitle: "Implement repeating-key XOR",
        description: "",
        points: 1
      },
      {
        id: 6,
        title: "Challenge 6",
        subTitle: "Break repeating-key XOR",
        description: "",
        points: 1
      },
      {
        id: 7,
        title: "Challenge 7",
        subTitle: "AES in ECB mode",
        description: "",
        points: 1
      },
      {
        id: 8,
        title: "Challenge 8",
        subTitle: "Detect AES in ECB mode",
        description: "",
        points: 1
      },
    ]
  },
  {
    id: 2,
    title: "Set 2",
    subTitle: "Block Crypto",
    description: "",
    challenges: []
  },
  {
    id: 3,
    title: "Set 3",
    subTitle: "Block & Stream Crypto",
    description: "",
    challenges: []
  },
  {
    id: 4,
    title: "Set 4",
    subTitle: "Stream Crypto & Randomness",
    description: "",
    challenges: []
  },
  {
    id: 5,
    title: "Set 5",
    subTitle: "Diffie-Helloman & Friends",
    description: "",
    challenges: []
  },
  {
    id: 6,
    title: "Set 6",
    subTitle: "RSA & DSA",
    description: "",
    challenges: []
  },
  {
    id: 7,
    title: "Set 7",
    subTitle: "Hashes",
    description: "",
    challenges: []
  },
  {
    id: 8,
    title: "Set 8",
    subTitle: "Abstract Algebra",
    description: "",
    challenges: []
  },
];
