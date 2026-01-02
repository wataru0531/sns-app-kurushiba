

import { createContext, useEffect, useState } from "react";
import { authRepositories } from "./repositories/auth";

const SessionContext = createContext();

// ✅ 
const SessionProvider = (props) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  // 👉 現在ログイン中のユーザーのセッションデータを取得してセット
  const setSession = async () => {
    const currentUser = await authRepositories.getCurrentUser();
    // console.log(currentUser);

    setCurrentUser(currentUser);

    setIsLoading(false);
  }

  useEffect(() => {
    setSession();
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