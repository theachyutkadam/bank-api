require 'active_record' unless defined?(ActiveRecord)

class ActiveRecordInit
  def self.init
    env = ENV["RACK_ENV"] || 'development'
    config = YAML::load_file(File.join('config', 'database.yml'))
    ActiveRecord::Base.establish_connection(config[env])
    ActiveRecord::Base.default_timezone = :utc

    ActiveRecord::Base.clear_all_connections!
    if env == "production"
      ActiveRecord::Base.logger = ::Logger.new(nil)
    else
      ActiveRecord::Base.logger = Logger.new($stdout)
    end
  end
end
