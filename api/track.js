import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image_id } = req.body;

    if (!image_id) {
      return res.status(400).json({ error: 'No image_id provided' });
    }

    const { error } = await supabase.rpc('increment_image_view', {
      image_id_input: image_id
    });

    if (error) throw error;

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
