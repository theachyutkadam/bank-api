Dir.glob(File.join('lib', 'tasks', '*.rake'), &method(:load))

require 'rake/testtask'
require 'bundler'
require 'active_record_migrations'

ActiveRecordMigrations.configure do |config|
  config.database_configuration = YAML.load_file('config/database.yml')
end

ActiveRecordMigrations.load_tasks

ENV["RACK_ENV"] ||= "test"

Rake::TestTask.new do |t|
  t.libs.push "lib"
  t.test_files = FileList['test/test_*.rb']
  Bundler.setup(:default)
  t.verbose = true
end

task :default => :test
