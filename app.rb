require 'sinatra'
require 'sass'

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
  @stylesheet_folder = '/stylesheets/index'
  erb :index
end

get '/team/:member' do
  @member = params[:member]
  @stylesheet_folder = '/stylesheets/team'

  erb :team
end

get '/portfolio/:name' do
  @name = params[:name]
  @stylesheet_folder = '/stylesheets/portfolio'

  erb :portfolio
end