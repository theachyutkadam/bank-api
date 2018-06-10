require 'yaml'

class Initializer
  def self.init_all
    initializers = Dir.glob(File.join(File.dirname(__FILE__), "*"))

    initializers.each do |i|
      require i
      file = File.basename(i, '.rb')
      class_name = file.split("_").collect(&:capitalize).join
      klass = Object.const_get(class_name)
      klass.send(:init) if klass.respond_to?("init")
    end
  end
end
