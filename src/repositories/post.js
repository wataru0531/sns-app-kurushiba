

// ✅ 投稿関連の処理

import { supabase } from "../lib/supabase";




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
    
    if(error) throw new Error(error.message);
    return data[0];
  },



}