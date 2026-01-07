
// auth.js
// 認証周りのapi

// → apiを叩く処理を集約。


import { supabase } from "../lib/supabase"


export const authRepositories = {
  // 共通のエラーハンドラ
  handleAuthError(_error, _fallbackMessage) {
    if(!_error) return;
    throw new Error(_error.message || _fallbackMessage);
  },

  // ✅ ユーザー情報を正規化。→ 必要なデータのみ取得
  // → Supabaseから返ってくるuser構造が変わってもここだけ直せばいい
  normalizeUser(_user) {
    if(!_user) return null;
    // console.log(_user);

    return {
      id: _user.id,
      email: _user.email,
      userName: _user.user_metadata?._name ?? "",
      createdAt: _user.created_at,
    }
  },

  // ✅ サインアップ ユーザー登録の処理
  async signup(_name, _email, _password){
    // data → 作成したユーザーの状態が入ってくる。
    const { data, error } = await supabase.auth.signUp({
      email: _email,
      password: _password,
      options: { // ⭐️ ユーザー作成以外にSupabaseに伝えたいことを記述
        data: { _name },
        emailRedirectTo: "http://localhost:3000", // ユーザー登録後に遷移する画面
                                                  // → メール確認の完了後
      }
    });

    authRepositories.handleAuthError(error, "Failed to sign up");

    return; // 終わらすだけ
  },

  // ✅ サインイン(ログイン)
  async signin(_email, _password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: _email,
      password: _password,
    });

    authRepositories.handleAuthError(error, "Failed to sign in");

    if(!data?.user) {
      throw new Error("User not found after sign up");
    }

    return  authRepositories.normalizeUser(data.user);
  },

  // ✅ 現在ログイン中のユーザーのセッション情報を取得
  async getCurrentUser(){
    const { data, error } = await supabase.auth.getSession();

    authRepositories.handleAuthError(error, "Failed to get session");

    if(data.session == null) return;
    // console.log(data);
    // {session: { access_token: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjJhZmI1NWJkLWIzNGUtNG…PbDFUS0PoQ12mWLbQG-5ZJWSvBhyxxIQafz3wtLpearjGMG0A', token, ... }
    
    const user = data?.session?.user ?? null;

    return authRepositories.normalizeUser(user);

  },

  // ✅ サインアウト
  async signout(){
    const  { error } = await supabase.auth.signOut();

    if(error && error.message !== "Auth session missing!") {
      throw new Error(error.message);
    }

    return true;
  }
}




