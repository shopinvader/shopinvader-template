Installation steps for Ubuntu
=============================

```
# prerequisites
sudo apt-get install imagemagick
sudo apt-get install ruby
ruby --version

# this part only if your system ruby shows < 2.1.0
curl -L https://get.rvm.io | bash -s stable
source $HOME/.rvm/scripts/rvm
rvm install ruby-2.4.0
gem install bundler
gem install rake
gem install locomotivecms_wagon
bundle install

# this part only if you can/want to use your system ruby
sudo gem install bundler
sudo gem install rake
sudo gem install locomotivecms_wagon
sudo bundle install

# finalize
wagon serve
cp config/site.yml.demo config/site.yml
```

