Installation steps
==================

```
sudo apt-get install imagemagick
sudo apt-get install ruby
curl -L https://get.rvm.io | bash -s stable
source $HOME/.rvm/scripts/rvm
rvm install ruby-2.4.0
gem install bundler
gem install rake
gem install locomotivecms_wagon
bundle install
wagon serve
```

