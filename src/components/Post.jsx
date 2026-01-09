
import { useContext, useState } from "react";
import { SessionContext } from "../sessionProvider";


export const Post = ({ 
  post: { id, userId, userName, content }, 
  onClickDeletePost,
  onSubmitUpdatePost,
  editingPostId,
  setEditingPostId
}) => {
  // console.log(post)
  const { currentUser } = useContext(SessionContext);

  const isOwner = currentUser.id === userId;
  const isEditing = editingPostId === id;

  const [ editContent, setEditingContent ] = useState(content);

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{ userName }</h3>
      {/* <p className="text-gray-700">{ content }</p> */}

      {
        isEditing ? (
          <>
            <textarea
              className="w-full border p-2 rounded"
              value={ editContent }
              onChange={ (e) => setEditingContent(e.target.value) }
            />
            <div className="mt-2 flex gap-2">
              <button 
                className="text-green-500 hover:underline cursor-pointer focus:outline-none"
                onClick={ () => onSubmitUpdatePost(id, editContent) }
              >保存</button>
              <button 
                className="text-gray-500 hover:underline cursor-pointer focus:outline-none"
                onClick={ () => setEditingPostId(null) }
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
                    onClick={ () => setEditingPostId(id) }
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



