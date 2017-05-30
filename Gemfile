source 'https://rubygems.org'

gem 'locomotivecms_wagon', git: 'git://github.com/locomotivecms/wagon.git', require: false
gem 'locomotivecms', git: 'git://github.com/locomotivecms/engine.git', require: false
gem 'custom_fields', git: 'git://github.com/locomotivecms/custom_fields.git'
gem 'locomotivecms_steam', git: 'git://github.com/locomotivecms/steam.git', require: false

group :misc do
  #gem 'shop_invader', path: 'shopinvader'
  gem 'shop_invader', github: 'akretion/shopinvader', ref: 'afca3850b91403518cbec168bbfea37db55ba32d', branch: 'add-erp-proxy'
end

# gem 'locomotivecms_wagon', '~> 2.3.0.rc1'

# gem 'guard-livereload', '~> 2.5.1'

group :development do
  # Mac OS X
  gem 'rb-fsevent', '~> 0.9.1', require: 'rb-fsevent' if RUBY_PLATFORM.include?('darwin')

  # Unix
  gem 'therubyracer', require: 'v8', platforms: :ruby unless RUBY_PLATFORM.include?('darwin')

  gem 'rb-inotify', '~> 0.9', require: 'rb-inotify' if RUBY_PLATFORM.include?('linux')

  # Windows
  gem 'wdm', '~> 0.1.1', require: 'wdm' if RUBY_PLATFORM =~ /mswin|mingw/i
end

group :misc do
  # Add your extra gems here
  # gem 'susy', require: 'susy'
  # gem 'bourbon', require: 'bourbon'
end
