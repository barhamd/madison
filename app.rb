#!/usr/bin/env ruby

require_relative 'models/init'

class MyApp < Sinatra::Base
  enable :session
  register Sinatra::Flash

  use Warden::Manager do |config|
    config.serialize_into_session{ |user| user.id }
    config.serialize_from_session{ |id| User.get(id) }

    config.scope_defaults :default,
      strategies: [:password],
      action: 'auth/unauthenticated'

    config.failure_app = self
  end

  Warden::Manager.before_failure do |env, opts|
    env['REQUEST_METHOD'] = 'POST'
  end

  Warden::Strategies.add(:password) do
    def valid?
      params['user']['username'] && params['user']['password']
    end

    def authenticate!
      user = User.first(username: params['user']['username'])

      if user.nil?
        fail!("The username you entered does not exist.")
      elsif user.authenticate(params['user']['password'])
        success!(user)
      else
        fail!("Could not log in")
      end
    end
  end

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
