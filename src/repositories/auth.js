
// auth.js
// 認証周りのapi

// → apiを叩く処理を集約。


import { supabase } from "../lib/supabase"


export const authRepositories = {

  // ✅ ユーザー登録の処理
  async signup(_name, _email, _password){
    // data → 作成したユーザーの状態が入ってくる。
    const { data, error } = await supabase.auth.signUp({
      email: _email,
      password: _password,
      options: { data: { _name } }
    });

    if(error !== null) throw new Error(error.message);

    return { ...data.user, userName: data.user.user_metadata._name };
  }

  // ✅ 



}




