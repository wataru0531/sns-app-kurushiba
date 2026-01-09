
import { useContext, useState } from "react";
import { SessionContext } from "../sessionProvider";


export const Post = ({ 
  post: { id, userId, userName, content },
  // post,
  isEditing,
  editingContent,
  setEditingContent, // onChange...
  onClickEdit,

  onSubmitUpdatePost,
  onClickDeletePost,

  editingPostId,
  setEditingPostId
}) => {
  // console.log(post)
  const { currentUser } = useContext(SessionContext);

  // ログイン中のユーザーとpostのidが同じならtrue → 編集、削除ボタン表示
  const isOwner = currentUser.id === userId; 

  // console.log(editingPostId); // null
  // const isEditing = editingPostId === id;
  // console.log(isEditing); // 

  // const [ editContent, setEditingContent ] = useState(content);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{ userName }</h3>

      {
        isEditing ? (
          <>
            <textarea
              className="w-full border p-2 rounded"
              value={ editingContent }
              onChange={ (e) => setEditingContent(e.target.value) }
            />
            <div className="mt-2 flex gap-2">
              <button 
                className="text-green-500 hover:underline cursor-pointer focus:outline-none"
                onClick={ () => onSubmitUpdatePost(id) }
              >保存</button>
              <button 
                className="text-gray-500 hover:underline cursor-pointer focus:outline-none"
                onClick={ () => onClickEdit(null) }
              >キャンセル</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700">{ content }</p>

            {
              isOwner && (
                <div className="flex gap-3 mt-2">
                  <button 
                    className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
                    onClick={ () => onClickEdit({ id, content }) }
                  >編集</button>

                  <button 
                    className="text-red-500 hover:underline cursor-pointer focus:outline-none"
                    onClick={ () => onClickDeletePost(id) }
                  >削除</button>
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}



