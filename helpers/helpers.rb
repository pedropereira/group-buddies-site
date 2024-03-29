helpers do
  include Rack::Utils

  alias_method :h, :escape

  def add_to_newsletter(filename, email)
    File.open(filename, 'a') do |f|
      f.puts email
    end
  end

  def base_url
    @base_url ||= "#{request.env['rack.url_scheme']}://#{request.env['HTTP_HOST']}"
  end

  def email_exists?(filename, email)
    File.readlines(filename).grep(/#{email}/).any?
  end

  def link_to_stylesheet(filename)
    "<link rel=\"stylesheet\" type=\"text/css\" href=#{base_url}#{filename}>"
  end

  def link_to_javascript(filename)
    "<script type=\"text/javascript\" src=#{base_url}#{filename} charset=\"utf-8\"></script>"
  end
end