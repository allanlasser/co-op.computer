-- Custom SQL migration file, put you code below! --

CREATE INDEX IF NOT EXISTS "tool_name_search_index" ON "tools"
  USING gin (to_tsvector('english', "name"));
