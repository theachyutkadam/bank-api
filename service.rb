require 'sinatra'

get "/health-check" do
  status 200
   "Welcome to my sinatra test"
end
