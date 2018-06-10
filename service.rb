
require 'active_record'
require 'sinatra'

configure do
  require_relative File.join('config', 'initializers', 'initializer')
  Initializer.init_all
end


class User < ActiveRecord::Base

end

get "/health-check" do
	"OK"
end

get "/users" do
	users = User.all
	{users: users}.to_json
end

post "/user" do
	User.create(username: params[:username], password: params[:password], balance: params[:balance], account_no: "000#{User.count}")
	status 201
	{message: "User created"}.to_json
end

get "/user/:id" do
	user = User.find_by_id(params[:id])
	if user
		status 200
		{user: user}.to_json
	else
		status 404
		{user: "User not found"}.to_json
	end
end

put "/user/:id" do
	user = User.find_by_id(params[:id])
	if user
		status 200
		user.update(params)
		{user: user}.to_json
	else
		status 404
		{user: "User not found"}.to_json
	end
end

delete "/user/:id" do
	user = User.find_by_id(params[:id])
	if user
		status 200
		user.destroy
	else
		status 404
		{user: "User not found"}.to_json
	end
end