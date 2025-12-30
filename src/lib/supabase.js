
// Supabaseの初期化

import { createClient } from '@supabase/supabase-js'


export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // プロジェクトのurl
  import.meta.env.VITE_SUPABASE_API_KEY // apiキー
);
