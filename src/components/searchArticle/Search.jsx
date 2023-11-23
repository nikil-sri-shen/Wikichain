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
        console.log(transaction[0]);
        console.log(transaction[1]);
        console.log(transaction[2]);
        console.log(transaction[3]);
        console.log(transaction[4]);
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
        setErrorMessage("⚠️ Article not found...!");
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="text-center p-20">
        {isUserRegistered ? (
          <div>
            <p>{errorMsg}</p>
            <label className="text-3xl">
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
                  <span className="text-5xl text-orange-500">{query[1]}</span>
                  <br />
                  DecWiki.org
                  <hr className="bg-black border-t-2 border-black"></hr>
                  <div className="text-3xl m-6">{query[2]}</div>
                  <div className="flex justify-between">
                    <div className="flex m-16">
                      <button>
                        <FaThumbsUp
                          size={30}
                          className="fill-blue-500 hover:fill-blue-800"
                        ></FaThumbsUp>
                      </button>
                      <span className="ml-4 text-xl">{query[3]}</span>
                    </div>
                    <div>
                      {query[4] ? (
                        <p className="flex m-6">
                          <FaCheckCircle
                            size={24}
                            style={{ color: "green" }}
                          ></FaCheckCircle>
                          Verified
                        </p>
                      ) : (
                        <p className="m-6">
                          <span className="flex text-lg">
                            <FaTimesCircle
                              size={24}
                              style={{ color: "red" }}
                              className="mr-2"
                            ></FaTimesCircle>
                            Not verified
                          </span>

                          <button className="m-5 bg-black hover:bg-orange-500 text-white hover:text-black font-bold py-2 px-4 rounded">
                            Verify
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
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
