

// ✅ 投稿関連の処理

import { supabase } from "../lib/supabase";


// ✅ 投稿した内容を正規化 → フロント側で欲しいデータのみにする
const normalizePost = (_post) => {
  // console.log(_post)
  return {
    id: _post.id,
    content: _post.content,
    createdAt: _post.created_at,
    userId: _post.user_id,
    userName: _post.user_metadata?._name ?? "Unknown",
  }
}

const handleDbError = (_error, _fallback) => {
  if(!_error) return;
  throw new Error(_error.message || _fallback);
}


// ✅ 投稿
export const postRepository = {

  // ✅ 投稿を作成
  async create(_content, _userId){
    const { data, error } = await supabase
      .from("posts")
      .insert([{ 
        content: _content, 
        user_id: _userId, 
      }])
      .select();

      // console.log(data);
      // [{id: 2, created_at: '2026-01-05T07:39:20.838663+00:00', content: 'こんにちは', user_id: '05a6c3f3-fa3d-49f2-9738-cccbbb221ad9'}]
    
    handleDbError(error, "Failed to createPost");
    // console.log(data);
    // return data[0];
    return normalizePost(data[0]);
  },

  async find(_page, _limit){
    // isNaN() ... 数値に変換できない場合 → true
    //             数値なら → false
    // console.log(isNaN(_page)); // false
    _page = isNaN(_page) || _page < 1 ? 1 : _page;
    const start = _limit * (_page - 1);
    const end = start + _limit -1;
    // console.log(start, end); // 0, 4
                             // 5, 9 

    const { data, error } = await supabase
      .from("posts_view")
      .select("*") // 全て
      .range(start, end) // ⭐️ 指定した範囲のデータを取得できる
      .order("created_at", { ascending: false }); // 新しい順で取得

    handleDbError(error, "Failed to find posts");

    // console.log(data);
    // (2) [{ id: 2, content: 'こんにちは', created_at: '2026-01-05T07:39:20.838663+00:00', user_metadata: {…}, user_id: '05a6c3f3-fa3d-49f2-9738-cccbbb221ad9'}, {…}]

    return data.map((post) => {
      return normalizePost(post);
    })
  },

  // ✅ 削除
  async delete(_id) { // 削除するpostのid
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", _id); // 引数の_idと一致するpostを削除する

    handleDbError(error, "Failed to delete post");
    
    return true;
  },

  // ✅ 更新
  async update(_postId, _content) {
    const { data, error } = await supabase
      .from("posts")
      .update({ content: _content })
      .eq("id", _postId) // T0DO
      .select() // TODO
      .single(); // TODO

    handleDbError(error, "Failed to update post");
    return data;
  }

}