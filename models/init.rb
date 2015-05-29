DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/page.db")

require_relative 'pages'
require_relative 'users'

DataMapper.finalize

DataMapper.auto_upgrade!
