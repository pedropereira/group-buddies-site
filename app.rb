require 'pony'
require 'sass'
require 'sinatra'

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


set :sass, :style => :compressed


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
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/index/structure.css', '/stylesheets/index/typography.css', '/stylesheets/font-awesome.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/jquery.touchdown.min.js', '/javascripts/application.js', '/javascripts/index.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  erb :index
end


post '/newsletter' do
  email_regex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/

  if params[:email] =~ email_regex and !email_exists?('newsletter.txt', params[:email])
    add_to_newsletter('newsletter.txt', params[:email])
  end

  redirect to('/') unless request.xhr?
end


post '/contact' do
  Pony.mail :to => 'contact@groupbuddies.com',
            :from => params[:email],
            :subject => '[groupbuddies.com] Message from ' + params[:name],
            :body => params[:message]

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
