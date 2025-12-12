import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	process.env.REACT_APP_SUPABASE_PROJECT_URL as string,
	process.env.REACT_APP_SUPABASE_API_KEY as string
)
