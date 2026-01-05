

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

      // console.log(data);
      // [{id: 2, created_at: '2026-01-05T07:39:20.838663+00:00', content: 'こんにちは', user_id: '05a6c3f3-fa3d-49f2-9738-cccbbb221ad9'}]
    
    if(error) throw new Error(error.message);
    
    return data[0];
  },



}