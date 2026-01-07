
import { useContext } from "react";
import { SessionContext } from "../sessionProvider";


export const Post = ({ post: { id, userId, userName, content }, onClickDeletePost }) => {
  // console.log(post)
  const { currentUser } = useContext(SessionContext);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{ userName }</h3>
      <p className="text-gray-700">{ content }</p>
      
      {/* 自分が投稿した内容にだけ削除ボタンを実装 */}
      { currentUser.id ===  userId && (
        <button 
          className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
          onClick={ () => onClickDeletePost(id) }
        >
          削除
        </button>
      )}
    </div>
  )
}



