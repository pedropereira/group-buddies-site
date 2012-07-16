require 'pony'
require 'sass'
require 'sinatra'

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
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/index/structure.css', '/stylesheets/index/typography.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/application.js', '/javascripts/index.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  erb :index
end


post '/add_to_newsletter' do
  add_to_newsletter('newsletter.txt', params[:email])

  redirect '/'
end


post '/contact' do
  Pony.mail :to => 'contact@groupbuddies.com',
            :from => params[:email],
            :subject => '[groupbuddies.com] Message from ' + params[:name],
            :body => params[:message]

  redirect '/'
end


get '/team' do
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/team/structure.css', '/stylesheets/team/typography.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/application.js', '/javascripts/team.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  @member = params[:member]

  erb :team
end


get '/portfolio' do
  @stylesheets = ['/stylesheets/reset.css', '/stylesheets/portfolio/structure.css', '/stylesheets/portfolio/typography.css']
  @javascripts = ['/javascripts/jquery.js', '/javascripts/jquery-ui.min.js', '/javascripts/application.js', '/javascripts/preloadCssImages.jQuery_v5.js']

  erb :portfolio
end