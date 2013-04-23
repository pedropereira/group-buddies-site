require 'pony'
require 'sass'
require 'sinatra'
require 'mixpanel'
require 'gibbon'

require './helpers/helpers.rb'
require './config/initializers/load_keys.rb'

use Mixpanel::Middleware, KEYS["mixpanel"], :insert_js_last => true


# require_relative does not exist in ruby 1.8.7
# This is a fallback -- http://stackoverflow.com/a/4718414/951432
unless Kernel.respond_to?(:require_relative)
  module Kernel
    def require_relative(path)
      require File.join(File.dirname(caller[0]), path.to_str)
    end
  end
end

require_relative 'helpers/helpers'

configure do
  set :sass, :style => :compressed

  set :gb, Gibbon.new(KEYS["mailchimp"])
  set :list_id, settings.gb.lists({:filters => { :list_name => "gbnews" }})["data"].first["id"]
end



before do
  @mixpanel = Mixpanel::Tracker.new(KEYS["mixpanel"], request.env)
end

get '/stylesheets/:filename.css' do
  content_type 'text/css', :charset => 'utf-8'
  filename = "#{params[:filename]}"
  render :sass, filename.to_sym, :views => './views/stylesheets'
end


get '/stylesheets/:folder/:filename.css' do
  content_type 'text/css', :charset => 'utf-8'
  filename = "#{params[:filename]}"
  render :sass, filename.to_sym, :views => "./views/stylesheets/#{params[:folder]}"
end


get '/' do
  @mixpanel.track("Home Page View")
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/index/structure.css', '/stylesheets/index/typography.css', '/stylesheets/font-awesome.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/jquery.touchdown.min.js', '/javascripts/application.js', '/javascripts/index.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  erb :index
end

post '/contact' do
  Pony.mail :to => 'contact@groupbuddies.com',
            :from => params[:email],
            :reply_to => params[:email],
            :subject => '[groupbuddies.com] Message from ' + params[:name],
            :body => params[:message],
            :via => :smtp,
            :via_options => {
              :address              => 'smtp.gmail.com',
              :port                 => '587',
              :enable_starttls_auto => true,
              :user_name            => 'noreply@groupbuddies.com',
              :password             => 'noreplygbsuperpass',
              :authentication       => :plain # :plain, :login, :cram_md5, no auth by default
            }

  redirect to('/') unless request.xhr?
end


get '/team/:member' do
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/team/structure.css', '/stylesheets/team/typography.css', '/stylesheets/font-awesome.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/jquery.touchdown.min.js', '/javascripts/application.js', '/javascripts/team.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  @member = params[:member]

  erb :team
end


get '/portfolio/:name' do
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/portfolio/structure.css', '/stylesheets/portfolio/typography.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/jquery.touchdown.min.js', '/javascripts/application.js', '/javascripts/portfolio.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  @name = params[:name]

  erb :portfolio
end

post '/newsletter' do
  email_regex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/

  if params[:email] =~ email_regex and !email_exists?('newsletter.txt', params[:email])
    add_to_newsletter('newsletter.txt', params[:email])

    settings.gb.listSubscribe({ :id => settings.list_id,
                                :email_address => params[:email],
                                :merge_vars => {:fname => "GB", :lname => "User"},
                                :double_optin => false,
                                :send_welcome => true })
    200
  else
    500
  end

end
