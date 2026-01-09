import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function handler() {
  const { data } = await supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
