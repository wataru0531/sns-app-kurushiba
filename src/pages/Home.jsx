
// Home.js

// TODO 
// フォームでクリックできるようにする

import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { SessionContext } from "../sessionProvider";
import { authRepositories } from "../repositories/auth";
import { postRepository } from "../repositories/post";
import { SideMenu } from "../components/SideMenu";


function Home(){
  const { currentUser } = useContext(SessionContext);
  // console.log(currentUser);
  const [ content, setContent ] = useState("");

  // ログイン/登録していないなら、ログインページにリダイレクト
  // if(currentUser === null) return <Navigate replace to="/signin" />
  if(!currentUser) return <Navigate replace to="signin" />

  const onChangeSetContent = (e) => {
    setContent(e.target.value);
  }

  const onClickCreatePost = async () => {
    const post = await postRepository.create(content, currentUser.id);
    // console.log(post);
    // {id: 1, created_at: '2026-01-03T14:09:55.525926+00:00', content: 'hellor', user_id: '05a6c3f3-fa3d-49f2-9738-cccbbb221ad9'}
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#34D399] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SNS APP</h1>
          <button className="text-white hover:text-red-600">ログアウト</button>
        </div>
      </header>

      <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <textarea
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                placeholder="What's on your mind?"
                onChange={ onChangeSetContent }
                value={ content }
              />
              <button 
                className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={ onClickCreatePost }
                disabled={ content === "" }
              >
                Post
              </button>
            </div>

            <div className="mt-4"></div>
          </div>

          {/* サイドメニュー */}
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

export default Home;