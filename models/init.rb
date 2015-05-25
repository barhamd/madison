DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/page.db")

require_relative 'pages'

DataMapper.finalize

DataMapper.auto_upgrade!
