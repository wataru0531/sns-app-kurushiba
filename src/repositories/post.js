

// ✅ 投稿関連の処理

import { supabase } from "../lib/supabase";



// ✅ 投稿
export const postRepository = {

  // 👉 
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
    
    if(error) throw new Error(error.message);
    
    return data[0];
  },

  async find(){
    const { data, error } = await supabase
      .from("posts_view")
      .select("*") // 全て
      .order("created_at", { ascending: false }); // 新しい順で取得

    if(error) throw new Error(error.message);

    // console.log(data);
    // (2) [{ id: 2, content: 'こんにちは', created_at: '2026-01-05T07:39:20.838663+00:00', user_metadata: {…}, user_id: '05a6c3f3-fa3d-49f2-9738-cccbbb221ad9'}, {…}]

    return data.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.user_metadata._name // ✅ _nameがあってか確認
      }
    })
  }
}