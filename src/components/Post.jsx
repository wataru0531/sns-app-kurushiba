
import { useContext } from "react";
import { SessionContext } from "../sessionProvider";

export const Post = ({ 
  // post: { id, userId, userName, content },
  post,
  onClickEdit, // 編集開始 / キャンセルの処理
  isEditing,
  editingContent,
  setEditingContent, // onChange...

  onSubmitUpdatePost,
  onClickDeletePost,
}) => {
  // console.log(post.content)
  // console.log(isEditing);
  // console.log(editingContent);
  const { currentUser } = useContext(SessionContext);

  // ✅ ログイン中のユーザーとpostのidが同じならtrue → 編集、削除ボタン表示
  const isOwner = currentUser.id === post.userId; 

  // ✅ 編集 → 保存 の時に内容が同じなら保存ボタンをおせないようにする
  // → 空でない、同じ内容ではない
  const isChanged = editingContent.trim() !== "" &&
                    editingContent !== post.content;

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{ post.userName }</h3>

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
                className="text-green-500 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={ () => onSubmitUpdatePost(post.id) }
                disabled={ !isChanged }
              >保存</button>
              <button 
                className="text-gray-500 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={ () => onClickEdit(null) }
                // disabled="false"
              >キャンセル</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700">{ post.content }</p>
            {
              isOwner && (
                <div className="flex gap-3 mt-2">
                  <button 
                    className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
                    onClick={ () => onClickEdit(post) }
                  >編集</button>

                  <button 
                    className="text-red-500 hover:underline cursor-pointer focus:outline-none"
                    onClick={ () => onClickDeletePost(post.id) }
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
