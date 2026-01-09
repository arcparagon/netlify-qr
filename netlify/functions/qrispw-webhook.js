import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);
    console.log('WEBHOOK', data);

    if (data.event !== 'payment.paid') {
      return { statusCode: 200, body: 'IGNORED' };
    }

    await supabase.from('donations').insert({
      transaction_id: data.transaction_id,
      name: data.customer_name,
      amount: data.amount
    });

    return { statusCode: 200, body: 'OK' };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: 'ERROR' };
  }
}
