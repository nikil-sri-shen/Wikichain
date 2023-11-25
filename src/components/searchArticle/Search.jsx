import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import web3 from "../../web3";
import decwiki from "../../decwiki";

function Search() {
  const [title, setTitle] = useState("");
  const [account, setAccount] = useState("");
  const [query, setQuery] = useState("");
  const [isQueried, setIsQuried] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [vote, setVote] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  useEffect(() => {
    const checkUserRegistration = async () => {
      const account = await web3.eth.getAccounts();
      setAccount(account);
      try {
        // Assuming `wiki` is your contract instance
        // console.log(account);
        const user = await decwiki.methods.users(account[0]).call();

        // Check if the user is registered based on your contract logic
        const userIsRegistered = user && user.isRegistered;
        // Update state accordingly
        setIsUserRegistered(userIsRegistered);
      } catch (error) {
        // Handle errors, e.g., log them or show an error message
        console.error("Error checking user registration:", error);
      }
    };

    // Call the function to check user registration
    checkUserRegistration();
  }, [account]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const account = await web3.eth.getAccounts();
    setAccount(account);

    try {
      const user = await decwiki.methods.users(account[0]).call();
      if (user.isRegistered) {
        // Call the queryArticle method with the entered title
        const transaction = await decwiki.methods.queryArticle(title).call();
        setAuthor(transaction[0]);
        setTitle(transaction[1]);
        setContent(transaction[2]);
        setVote(transaction[3]);
        setIsVerified(transaction[4]);
        setQuery(transaction);
        setIsQuried(true);
        setErrorMessage("");
      } else {
        setIsUserRegistered(!user.isRegistered);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      if (error.message.includes("reverted")) {
        setIsQuried(false);
        setQuery("");
        setErrorMessage("⚠️ Sorry, Article not found...!");
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleVote = async () => {
    try {
      // Call the voteArticle method
      await decwiki.methods
        .voteArticle(title)
        .send({ from: account[0], gas: 3000000 });

      const transaction = await decwiki.methods.queryArticle(title).call();
      setAuthor(transaction[0]);
      setTitle(transaction[1]);
      setContent(transaction[2]);
      setVote(transaction[3]);
      setIsVerified(transaction[4]);
      setQuery(transaction);
      setIsQuried(true);
      setErrorMessage("");
      console.log(author);
      console.log(query);

      // Update local state to reflect that the user has voted

      // You can perform additional actions after a successful vote if needed
      console.log("Vote successful!");
    } catch (error) {
      // Handle errors, such as transaction rejection or failure
      console.error("Error voting:", error.message);
    }
    console.log("Voted...");
  };

  const handleVerification = async () => {
    try {
      // Call the verifyArticle method
      await decwiki.methods
        .verifyArticle(title)
        .send({ from: account[0], gas: 3000000 });

      // Update local state to reflect that the article has been verified
      const transaction = await decwiki.methods.queryArticle(title).call();
      setAuthor(transaction[0]);
      setTitle(transaction[1]);
      setContent(transaction[2]);
      setVote(transaction[3]);
      setIsVerified(transaction[4]);
      setQuery(transaction);
      setIsQuried(true);
      setErrorMessage("");
      console.log(author);
      console.log(query);

      // You can perform additional actions after a successful verification if needed
      console.log("Verification successful!");
    } catch (error) {
      // Handle errors, such as transaction rejection or failure
      console.error("Error verifying article:", error.message);
    }
    console.log("Verified...");
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="text-center p-20 hover:shadow-4xl">
        {isUserRegistered ? (
          <div>
            <p className="text-5xl">{errorMsg}</p>
            <br />
            <label className="text-3xl text-black">
              Title
              <br></br>
              <br></br>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black rounded-md"
              />
            </label>
            <br></br>
            <button
              type="submit"
              className="m-5 bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded"
            >
              <span className="flex">
                <FaSearch size={24} className="mr-2" />
                Search
              </span>
            </button>
            {isQueried ? (
              <div>
                <div className="bg-white text-black border-t-2 border-b-2 border-x-2 border-black">
                  <span className="text-5xl text-orange-500">{title}</span>
                  <br />
                  <span className="text-sm">DecWiki.org</span>
                  <hr className="bg-black border-t-2 border-black"></hr>
                  <div className="text-3xl m-6">{content}</div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="flex bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={handleVote}
                  >
                    <FaThumbsUp size={30}></FaThumbsUp>
                    <span className="ml-4 text-xl">{vote}</span>
                  </button>
                  {isVerified ? (
                    <p className="flex m-6 ml-4">
                      <FaCheckCircle
                        size={24}
                        style={{ color: "green" }}
                      ></FaCheckCircle>
                      Verified
                    </p>
                  ) : (
                    <p className="m-6 ml-4">
                      <span className="flex text-lg">
                        <FaTimesCircle
                          size={24}
                          style={{ color: "red" }}
                          className="mr-2"
                        ></FaTimesCircle>
                        Not verified
                      </span>
                      <button
                        className="m-5 bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded"
                        onClick={handleVerification}
                      >
                        Verify
                      </button>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-red-700 text-5xl">
              ⚠️ You are not a registered User!!!
            </p>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}
      </div>
    </form>
  );
}

export default Search;
