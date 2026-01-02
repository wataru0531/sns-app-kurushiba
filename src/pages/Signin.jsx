
// Signin → ログインページ

import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { authRepositories } from "../repositories/auth";
import { SessionContext } from "../sessionProvider";

function Signin(){ 
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const { currentUser, setCurrentUser } = useContext(SessionContext)

  const onChangeSetEmail = (event) => {
    // console.log(event.target.value)
    setEmail(event.target.value);
  }

  const onChangeSetPassword = (event) => {
    // console.log(event.target.value)
    setPassword(event.target.value);
  }

  const signin = async () => {
    const user = await authRepositories.signin(email, password);
    // console.log(user); 
    // { id: 'e15c2c6d-eabf-4b69-a147-0975b5f91374', aud: 'authenticated', role: 'authenticated', email: 'obito0531@gmail.com', email_confirmed_at: '2026-01-02T09:38:39.988757Z', …}
    setCurrentUser(user);
  }

  // console.log(currentUser)
  // Home画面に遷移
  // replace = true → 履歴を置き換える。戻るボタンで戻れないようにする
  if(currentUser != null) return <Navigate replace to="/" /> // Home画面に遷移

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">SNS APP</h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-5">
              <label className="block tet-sm font-medium text-gray-700" htmlFor="email">
                メールアドレス
              </label>
              <div className="mt-1">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="メールアドレス" 
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm-text-sm"
                  // onChange={(e) => onChangeSetEmail(e)}
                  onChange={ onChangeSetEmail }
                />
              </div>
            </div>

            <div className="mb-5">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                パスワード
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="パスワード"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => onChangeSetPassword(e)}
                />
              </div>
            </div>

            <div>
              <button 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={ signin }
                disabled={ email === "" || password=== ""}
              >
                ログイン
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              登録は<Link className="underline" to={"/signup"}>こちら</Link>から
            </div>

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Signin;