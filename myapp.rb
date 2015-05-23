#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'data_mapper'
require 'pry'


DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/page.db")

class Page
  include DataMapper::Resource
  property :id,         Serial
  property :html,       Text
  property :css,        Text
  property :created_at, DateTime
end

DataMapper.finalize

Page.auto_upgrade!

get '/' do
  @html = Page.last.html
  erb :index
end

get '/edit' do
  @page = Page.last
  erb :edit
end

post '/' do
  @page = Page.new(html: params[:html], created_at: Time.now)
  if @page.save
    redirect to '/'
  else
    redirect to '/'
  end
end
