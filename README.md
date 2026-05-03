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

Use this to generate image for post cards and post page.

```prompt
I have an image that I need extended/outpainted to fit two specific aspect ratios for a blog. Do not crop the original image — keep it fully intact and extend/generate the surrounding area to fill the canvas. Output 1 — Card thumbnail (16:9) Extend the image to 16:9 aspect ratio, minimum 800×450px. Keep the original image centered. Generate realistic surrounding content that matches the edges, lighting, color palette, and style of the original. The extended area should feel like a natural continuation of the image, not a hard border or solid color fill. Output 2 — Hero banner (21:9) Extend the same original image to 21:9 aspect ratio, minimum 1200×514px. Same rules — original centered, extended sides generated to match seamlessly.
```