source 'https://rubygems.org'

gem 'locomotivecms_wagon', github: 'locomotivecms/wagon', require: false
gem 'locomotivecms_steam', github: 'locomotivecms/steam', require: false, ref: 'e23477ecbd0b752498bb2258ff14d41511016251'

group :misc do
  gem 'shop_invader', github: 'akretion/shopinvader', branch: 'refactor-odoo-10'
end

gem 'guard-livereload', '~> 2.5.1'

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
