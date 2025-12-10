import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://luxcyklnmkzihsouftmx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1eGN5a2xubWt6aWhzb3VmdG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMzAwNDQsImV4cCI6MjA4MDkwNjA0NH0._e9V-tJR5EVvyWO3lWVnuM-LaktG4ixDLvN1vn0dygw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
