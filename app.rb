#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'data_mapper'
require 'pry'


DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/page.db")

class Page
  #TODO Add a 'savename' field. Every keystroke can be saved as a new page, but when
  # the submit button is hit it 'saves'. Madison could then view ALL of her
  # history if she needs to, or just the 'saved' ones.

  include DataMapper::Resource
  property :id,         Serial
  property :html,       Text
  property :css,        Text
  property :created_at, DateTime
end

DataMapper.finalize

Page.auto_upgrade!

class App < Sinatra::Base

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
end
