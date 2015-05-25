#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'data_mapper'
require 'pry'

require_relative 'models/init'

class MyApp < Sinatra::Base

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
