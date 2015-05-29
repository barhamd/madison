require 'rubygems'
require 'bundler'
require 'sinatra/flash'

Bundler.require

require File.expand_path '../app.rb', __FILE__
run MyApp
