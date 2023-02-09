import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

let {
	SUPABASE_PROJECT_URL : project,
	SUPABASE_ANNON_KEY : anonKey
} = process.env

export const supabase = createClient(project, anonKey)
