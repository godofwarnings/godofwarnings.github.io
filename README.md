# Installation instructions

For Manjaro-Arch

```bash
sudo pacman -Syu
sudo pacman -S ruby base-devel

# in the project root directory

gem install bundler rake
ruby -e 'puts Gem.user_dir + "/bin"'\ # <-- take its output
export PATH="$HOME/.local/share/gem/ruby/3.4.0/bin:$PATH" # something like this
source ~/.zshrc
gem install bundler rake
bundle install
```

Run the website with

```bash
bundle exec jekyll clean # clean the build cache
bundle exec jekyll serve --incremental --livereload
```
