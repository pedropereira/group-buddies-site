helpers do
  include Rack::Utils

  alias_method :h, :escape

  def add_to_newsletter(filename, email)
    File.open(filename, 'a') do |f|
      f.puts email
    end
  end

  def link_to_stylesheet(filename)
    "<link rel=\"stylesheet\" type=\"text/css\" href=#{filename}>"
  end

  def link_to_javascript(filename)
    "<script type=\"text/javascript\" src=#{filename} charset=\"utf-8\"></script>"
  end
end