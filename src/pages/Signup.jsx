
// Signup → 登録

import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import { authRepositories } from "../repositories/auth";
import { SessionContext } from "../sessionProvider";


function Signup(){
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const { currentUser } = useContext(SessionContext)

  const onChangeSetName = (e) => {
    // console.log(e.target.value)
    setName(e.target.value);
  }

  const onChangeSetEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeSetPassword = (e) => {
    setPassword(e.target.value);
  }

  // ✅ ユーザー登録する処理
  const onSubmitSignup = async (e) => {
    e.preventDefault();
    
    try {
      await authRepositories.signup(name, email, password);

      alert("登録が完了しました。");

    } catch(e) { // 👉 apiで投げられたエラーが渡ってくる
      console.error(e);
      alert(e.message || "登録中にエラーが発生しました。");
    }
  }

  // console.log(currentUser)
  // ✅ 登録したらHome画面に戻る
  // if(currentUser != "") return <Navigate replace to="/" />
  if(currentUser) return <Navigate replace to="/" />

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">SNS-APP</h2>
        <div className="mt-8 w-full max-w-md">


        <form 
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          onSubmit={ onSubmitSignup }
        >
          <div className="space-y-6">

            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium text-gray-700"
              >
                氏名
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="ユーザー名"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => onChangeSetName(e)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block tex-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <div className="mt-1">
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="メールアドレス"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus-ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => onChangeSetEmail(e)}
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <div className="mt-">
                <input 
                  type="password"
                  id="password"
                  placeholder="パスワード"
                  required
                  name="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => onChangeSetPassword(e)}  
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm tex-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={ name === "" || email === "" || password === "" }
              >
                登録
              </button>
            </div>

          </div>
        </form>
      </div>
      </div>
      
    </div>
  )
}

export default Signup;