require 'byebug'

file_list = Dir.entries(".").select{ |file| file =~ /js/ }
file_list.each do |filename|
  file = File.readlines(filename).map(&:chomp)
  file.each do |line|
    if line =~ /png/
      debugger
    end
  end
end
