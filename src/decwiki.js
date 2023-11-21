import web3 from "./web3";

const address = "0x382E00A7420e9427322bEb6E26743D14F088D20E";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    inputs: [],
    name: "articleCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x414e28b0",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "articlesByTitle",
    outputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "content", type: "string" },
      { internalType: "address", name: "author", type: "address" },
      { internalType: "uint256", name: "votes", type: "uint256" },
      { internalType: "bool", name: "isVerified", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x58812930",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x8da5cb5b",
  },
  {
    inputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "string", name: "content", type: "string" },
    ],
    name: "publishArticle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x95961f05",
  },
  {
    inputs: [{ internalType: "string", name: "title", type: "string" }],
    name: "queryArticle",
    outputs: [
      { internalType: "address", name: "author", type: "address" },
      { internalType: "string", name: "retrievedTitle", type: "string" },
      { internalType: "string", name: "content", type: "string" },
      { internalType: "uint256", name: "votes", type: "uint256" },
      { internalType: "bool", name: "isVerified", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xea7e7d9c",
  },
  {
    inputs: [{ internalType: "string", name: "username", type: "string" }],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x704f1b94",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "users",
    outputs: [
      { internalType: "string", name: "username", type: "string" },
      { internalType: "bool", name: "isRegistered", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xa87430ba",
  },
  {
    inputs: [{ internalType: "string", name: "title", type: "string" }],
    name: "verifyArticle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x2b40c794",
  },
  {
    inputs: [{ internalType: "string", name: "title", type: "string" }],
    name: "voteArticle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x834d61ec",
  },
];

export default new web3.eth.Contract(abi, address);
