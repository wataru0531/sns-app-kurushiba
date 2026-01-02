
// Home.js

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { SessionContext } from "../sessionProvider";
import { authRepositories } from "../repositories/auth";


function Home(){
  const { currentUser } = useContext(SessionContext);

  const signout = async () => {
    await authRepositories.signout();
  }

  // ログイン/登録していないなら、ログインページにリダイレクト
  if(currentUser === null) return <Navigate replace to="/signin" />

  return (
    <div>
      <h1>Home</h1>

      <div className="mt-10">
        <button 
          className="w-full max-w-[200px] px-2.5 py-2.5 bg-red-600 text-white text-center rounded hover:bg-red-700 transition cursor-pointer"
          onClick={ signout }
        >signout</button>
      </div>
    </div>
  )
}

export default Home;