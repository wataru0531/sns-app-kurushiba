
// auth.js
// 認証周りのapi

// → apiを叩く処理を集約。


import { supabase } from "../lib/supabase"


export const authRepositories = {

  // ✅ サインアップ ユーザー登録の処理
  async signup(_name, _email, _password){
    // data → 作成したユーザーの状態が入ってくる。
    const { data, error } = await supabase.auth.signUp({
      email: _email,
      password: _password,
      options: { data: { _name } }
    });

    if(error !== null) throw new Error(error.message);

    return { 
      ...data.user, 
      userName: data.user.user_metadata._name 
    };
  },

  // ✅ サインイン(ログイン)
  async signin(_email, _password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: _email,
      password: _password,
    });

    if(error) throw new Error(error.message);

    return {
      ...data.user,
      userName: data.user.user_metadata._name
    }
  },

  // ✅ 現在ログイン中のユーザーのセッション情報を取得
  async getCurrentUser(){
    const { data, error } = await supabase.auth.getSession();
    if(error != null) throw new Error(error.message);
    if(data.session == null) return;
    // console.log(data);
    // {session: { access_token: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjJhZmI1NWJkLWIzNGUtNG…PbDFUS0PoQ12mWLbQG-5ZJWSvBhyxxIQafz3wtLpearjGMG0A', token, ... }

    return {
      ...data.session.user,
      userName: data.session.user.user_metadata._name,
    }
  },

  // ✅ サインアウト → 
  async signout(){
    const  { error } = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
  }

}




