
require 'active_record'
require 'sinatra'

configure do
  require_relative File.join('config', 'initializers', 'initializer')
  Initializer.init_all
end


class User < ActiveRecord::Base

end
class Transaction < ActiveRecord::Base

end

before do
  puts params
  headers 'Access-Control-Allow-Origin' => "*"
end

get "/health-check" do
  "OK"
end

get "/transactions" do
  transactions = Transaction.all
  {transactions: transactions}.to_json
end

post "/transaction" do
  Transaction.create(particular: params[:particular], debit: params[:debit], credit: params[:credit], closing_balance: params[:closing_balance])
  status 201
  {message: "Transaction create"}.to_json
end

get "/transaction/:id" do
  transaction = Transaction.find_by_id(params[:id])
  if transaction
    status 201
    {transaction: transaction}.to_json
    {message: "Transaction find"}.to_json
  else
    status 404
    {transaction: "Transaction not found"}.to_json
  end
end

put "/transaction/:id" do
  transaction = Transaction.find_by_id(params[:id])
  if transaction
    status 201
    transaction.update(params)
    {message: "Transaction Update"}.to_json
  else
    status 404
    {transaction: "Transaction not found"}.to_json
  end
end

delete "/transaction/:id" do
  transaction = Transaction.find_by_id(params[:id])
  if transaction
    status 200
    transaction.destroy
    {message: "Transaction Delete"}.to_json
  else
    status 404
    {transaction: "Transaction not found"}.to_json
  end
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