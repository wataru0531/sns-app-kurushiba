

import { createContext, useEffect, useState } from "react";
import { authRepositories } from "./repositories/auth";
import { supabase } from "./lib/supabase";

const SessionContext = createContext();

// ✅ 
const SessionProvider = (props) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  // 👉 現在ログイン中のユーザーのセッションデータを取得してセット
  useEffect(() => {
    // ✅ 再ログインの場合、またはメール確認OFFの時の処理
    supabase.auth.getSession().then(({ data }) => {
      // console.log(data);
      // {session: {access_token: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjJhZmI1NWJkLWIzNGUtNG…EWo3VVO4DT0SBOXLEPs-iX9QIdZzrSkj7IWxh1KKqtq3hXGOQ', token_type: 'bearer', expires_in: 3600, expires_at: 1767782899, refresh_token: '55gtcdtsx4ux', …}

      if(data.session?.user) {
        setCurrentUser(authRepositories.normalizeUser(data.session.user))
      }
      
      setIsLoading(false);
    });

    // ⭐️ 認証状態の変化を監視 → メール確認ONの時の処理
    // → ユーザーが変更するたびに発火する。常に生きるリスナーとなる
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if(session?.user) {
        setCurrentUser(authRepositories.normalizeUser(session.user));
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe(); 
      // → コンポーネントがアンマウントすると同時に、監視を解除
      //   → ここではトップのコンポーネントなので、ブラウザを閉じた時、つまりアプリ終了の後始末のために記述
    }
  }, []);

  if(isLoading) return <div>...Loading</div>

  return(
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      { props.children }
    </SessionContext.Provider>
  )
}

export { 
  SessionProvider, // mainコンポーネントで覆う
  SessionContext // 各コンポーネントで使う
}
