
// Home.js

import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { SessionContext } from "../sessionProvider";
import { authRepositories } from "../repositories/auth";
import { postRepository } from "../repositories/post";
import { SideMenu } from "../components/SideMenu";
import { Post } from "../components/Post";
import { Pagination } from "../components/Pagination";

const POSTS_PER_RANGE = 5; // ページ取得の上限


function Home(){
  const { currentUser, setCurrentUser } = useContext(SessionContext);
  // console.log(currentUser);
  const [ content, setContent ] = useState("");
  const [ posts, setPosts ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ editingPostId, setEditingPostId ] = useState(null);

  const onChangeSetContent = (e) => {
    setContent(e.target.value);
  }

  // ✅ 投稿を作成
  const onSubmitCreatePost = async (e) => {
    e.preventDefault();

    try {
      const post = await postRepository.create(content, currentUser.id);
      // console.log(post);
      // { id: 1, created_at: '2026-01-03T14:09:55.525926+00:00', content: 'hellor', user_id: '05a6c3f3-fa3d-49f2-9738-cccbbb221ad9'}
    
      const postForView = { 
        ...post, 
        userId: currentUser.id, 
        userName: currentUser.name 
      }

      setPosts(prev => [ postForView, ...prev ]); // リストを更新

      setContent("");

    } catch(e) {
      console.error(e.message);
    }
  }

  // ✅ 投稿を取得する処理
  const fetchPosts = async (_page) => {
    try{
      const posts = await postRepository.find(_page, POSTS_PER_RANGE);
      setPosts(posts);

    } catch(e) {
      console.error(e);
      alert(e.message || "投稿の取得に失敗しました。");
    }
  }

  // ✅ 次のページに進む
  const moveToNext = async () => {
    const nextPage = page + 1;
    await fetchPosts(nextPage);

    setPage(nextPage);
  }

  // ✅ 前のページに戻る
  const moveToPrev = async () => {
    const prevPage = page - 1;
    if(prevPage < 1) return;

    await fetchPosts(prevPage);
    setPage(prevPage);
  }

  // ✅ 削除
  const onClickDeletePost = async (postId) => {
    try {
      await postRepository.delete(postId);

      // ステートの中身を更新
      // 👉 削除したポスト以外を取得 
      setPosts(prev => {
        // console.log(prev)
        return prev.filter(post => post.id !== postId);
      });

    } catch(e) {
      console.error(e);
      alert(e.message || "削除に失敗しました。");
    }

    await postRepository.delete(postId);
  }

  // ✅ 更新
  // 更新したい投稿のId、新しいcontent
  const onSubmitUpdatePost = async (_postId, _newContent) => {
    try {
      const updated = await postRepository.update(_postId, _newContent);

      // 指定した_postIdと合致するpostのみcontentを更新
      setPosts(prev => {
        prev.map(post => {
          return post.id === _postId 
                        ? { ...post, content: updated.post }
                        : post
        })
      });

      setEditingPostId(null); // 編集したいidのステートをnullに

    } catch(e) {
      console.error(e);
      alert(e.message || "更新に失敗しました。");
    }
  }

  // ✅ ログアウト
  const onClickSignOut = async () => {
    try {
      await authRepositories.signout();
    
      setCurrentUser(null); // 現在ログインしているユーザーをnullに
    } catch(e) {
      console.error(e);
      alert("ログアウトに失敗しました。")
    }
  }

  useEffect(() => {
    fetchPosts(page);
  }, [])

  // ログイン/登録していないなら、ログインページにリダイレクト
  // if(currentUser === null) return <Navigate replace to="/signin" />
  if(!currentUser) return <Navigate replace to="signin" />

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#34D399] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SNS APP</h1>
          <button 
            className="text-white hover:text-red-600"
            onClick={ onClickSignOut }
          >ログアウト</button>
        </div>
      </header>

      <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">

            <form 
              className="bg-white p-4 rounded-lg shadow-md"
              onSubmit={ onSubmitCreatePost }
            >
              <textarea
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                placeholder="What's on your mind?"
                onChange={ onChangeSetContent }
                value={ content }
              />
              <button 
                type="submit"
                className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={ content === "" }
              >
                Post
              </button>
            </form>

            {/* リスト */}
            <div className="mt-4">
              {
                posts && posts.map((post) => {
                  // console.log(post)
                  return (
                    <Post 
                      key={ post.id } 
                      post={ post }
                      onClickDeletePost={ onClickDeletePost }
                      onSubmitUpdatePost={ onSubmitUpdatePost }
                      editingPostId={ editingPostId }
                      setEditingPostId={ setEditingPostId }
                    />
                  )
                }) 
              }
            </div>
            
            {/* ページネーション */}
            <Pagination 
              moveToPrev={ page > 1 ? moveToPrev : null }
              moveToNext={ posts.length >= POSTS_PER_RANGE ? moveToNext : null }
            />
          </div>

          {/* サイドメニュー */}
          <SideMenu />

        </div>
      </div>
    </div>
  )
}

export default Home;
